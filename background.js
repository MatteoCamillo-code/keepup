// Storage keys
const STORAGE_KEY_ENTRIES = 'keepup_entries';
const STORAGE_KEY_AUTO_UPDATE = 'keepup_auto_update';
const STORAGE_KEY_LAST_URL = 'keepup_last_url';

// Listen for tab URL changes
browser.tabs.onUpdated.addListener(async (tabId, changeInfo, tab) => {
  // Only process when URL has changed and the change is complete
  if (changeInfo.url && changeInfo.status === 'complete') {
    await handleTabUrlChange(tabId, tab);
  }
});

// Listen for tab activation
browser.tabs.onActivated.addListener(async (activeInfo) => {
  const tab = await browser.tabs.get(activeInfo.tabId);
  await updateBadge(tab);
});

// Listen for window focus changes
browser.windows.onFocusChanged.addListener(async (windowId) => {
  if (windowId !== browser.windows.WINDOW_ID_NONE) {
    const tabs = await browser.tabs.query({ active: true, windowId: windowId });
    if (tabs.length > 0) {
      await updateBadge(tabs[0]);
    }
  }
});

// Handle tab URL changes for auto-update
async function handleTabUrlChange(tabId, tab) {
  if (!tab.url || !tab.url.startsWith('http')) {
    return;
  }

  const entries = await getEntries();
  if (entries.length === 0) {
    return;
  }

  const currentDomain = extractDomain(tab.url);

  // Find a matching entry for this domain
  for (let entry of entries) {
    if (isSameDomain(entry.domain, currentDomain)) {
      // Check if auto-update is enabled for this entry
      if (!entry.autoTrackingEnabled) {
        await updateBadge(tab);
        return;
      }

      const previousUrl = await getLastUrlForTab(tabId);

      // Check if this is a navigation within the same domain (not the initial load)
      if (previousUrl && previousUrl !== tab.url && isSameDomain(extractDomain(previousUrl), currentDomain)) {
        // This looks like navigation to a new page within the same domain
        // Update the entry with the new URL
        entry.url = tab.url;
        entry.title = tab.title || 'Untitled';
        entry.lastUpdated = getCurrentTimestamp();

        entry.history.push({
          timestamp: getCurrentTimestamp(),
          url: tab.url
        });

        await saveEntries(entries);

        // Log auto-update for debugging (optional - can be removed)
        console.log(`[KeepUp Auto-Update] ${entry.title} -> ${tab.url}`);
      }

      // Store current URL for next navigation detection
      await setLastUrlForTab(tabId, tab.url);
      break;
    }
  }

  await updateBadge(tab);
}

// Update the badge showing tracked status
async function updateBadge(tab) {
  if (!tab.url) return;

  const entries = await getEntries();
  const domain = extractDomain(tab.url);
  const hasTracking = entries.some(entry => isSameDomain(entry.domain, domain));

  if (hasTracking) {
    const matchingEntry = entries.find(entry => isSameDomain(entry.domain, domain));
    if (matchingEntry) {
      browser.action.setBadgeText({
        text: '✓',
        tabId: tab.id
      });
      browser.action.setBadgeBackgroundColor({
        color: '#10b981',
        tabId: tab.id
      });
      browser.action.setTitle({
        title: `KeepUp: Tracking "${matchingEntry.title}"`,
        tabId: tab.id
      });
    }
  } else {
    browser.action.setBadgeText({
      text: '',
      tabId: tab.id
    });
    browser.action.setTitle({
      title: 'KeepUp: Click to add tracking',
      tabId: tab.id
    });
  }
}

// Helper Functions

async function getEntries() {
  const result = await browser.storage.local.get(STORAGE_KEY_ENTRIES);
  return result[STORAGE_KEY_ENTRIES] || [];
}

async function saveEntries(entries) {
  await browser.storage.local.set({
    [STORAGE_KEY_ENTRIES]: entries
  });
}

function extractDomain(url) {
  try {
    const urlObj = new URL(url);
    return urlObj.hostname;
  } catch (e) {
    return '';
  }
}

function isSameDomain(domain1, domain2) {
  if (!domain1 || !domain2) return false;
  return domain1.toLowerCase() === domain2.toLowerCase();
}

function getCurrentTimestamp() {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  const hours = String(now.getHours()).padStart(2, '0');
  const minutes = String(now.getMinutes()).padStart(2, '0');
  const seconds = String(now.getSeconds()).padStart(2, '0');

  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}

// Track last URL per tab to detect navigation
async function getLastUrlForTab(tabId) {
  const result = await browser.storage.session.get(`${STORAGE_KEY_LAST_URL}_${tabId}`);
  return result[`${STORAGE_KEY_LAST_URL}_${tabId}`] || null;
}

async function setLastUrlForTab(tabId, url) {
  await browser.storage.session.set({
    [`${STORAGE_KEY_LAST_URL}_${tabId}`]: url
  });
}

// Initialize badges for all open tabs on startup
browser.tabs.query({}).then((tabs) => {
  tabs.forEach((tab) => {
    updateBadge(tab);
  });
});
