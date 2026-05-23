// Storage keys
const STORAGE_KEY_ENTRIES = 'keepup_entries';
const STORAGE_KEY_AUTO_UPDATE = 'keepup_auto_update';

// DOM elements
const addCurrentBtn = document.getElementById('addCurrentBtn');
const updateCurrentBtn = document.getElementById('updateCurrentBtn');
const trackingList = document.getElementById('trackingList');
const exportBtn = document.getElementById('exportBtn');
const importBtn = document.getElementById('importBtn');
const importFile = document.getElementById('importFile');
const statusMessage = document.getElementById('statusMessage');

// Template functions for safe DOM creation
function createElementWithText(tag, text, className = '') {
  const el = document.createElement(tag);
  if (className) el.className = className;
  el.textContent = text;
  return el;
}

// Initialize popup
document.addEventListener('DOMContentLoaded', () => {
  loadAndRenderEntries();
  setupEventListeners();
});

// Event Listeners
function setupEventListeners() {
  addCurrentBtn.addEventListener('click', handleAddCurrent);
  updateCurrentBtn.addEventListener('click', handleUpdateCurrent);
  exportBtn.addEventListener('click', handleExport);
  importBtn.addEventListener('click', () => importFile.click());
  importFile.addEventListener('change', handleImport);
}

// Add current page as new tracking entry
async function handleAddCurrent() {
  const tab = await getCurrentTab();
  if (!tab) {
    showStatus('Unable to access current tab', 'error');
    return;
  }

  const entries = await getEntries();

  const newEntry = {
    id: generateId(),
    title: tab.title || 'Untitled',
    url: tab.url,
    domain: extractDomain(tab.url),
    dateAdded: getCurrentTimestamp(),
    history: [
      {
        timestamp: getCurrentTimestamp(),
        url: tab.url
      }
    ]
  };

  entries.push(newEntry);
  await saveEntries(entries);
  loadAndRenderEntries();
  showStatus(`Added: ${newEntry.title}`, 'success');
}

// Update current tracking entry with active tab URL
async function handleUpdateCurrent() {
  const tab = await getCurrentTab();
  if (!tab) {
    showStatus('Unable to access current tab', 'error');
    return;
  }

  const entries = await getEntries();
  if (entries.length === 0) {
    showStatus('No tracking entries to update. Add one first.', 'error');
    return;
  }

  // Find matching entry based on domain
  const matchingEntry = entries.find(entry => isSameDomain(entry.domain, extractDomain(tab.url)));

  if (!matchingEntry) {
    showStatus('No tracking entry for this domain. Add a new entry first.', 'error');
    return;
  }

  // Update the entry
  matchingEntry.url = tab.url;
  matchingEntry.title = tab.title || 'Untitled';
  matchingEntry.lastUpdated = getCurrentTimestamp();

  matchingEntry.history.push({
    timestamp: getCurrentTimestamp(),
    url: tab.url
  });

  await saveEntries(entries);
  loadAndRenderEntries();
  showStatus('Updated tracking entry', 'success');
}

// Load and render all tracking entries
async function loadAndRenderEntries() {
  const entries = await getEntries();

  if (entries.length === 0) {
    trackingList.innerHTML = '';
    const emptyState = document.createElement('div');
    emptyState.className = 'empty-state';
    const p1 = createElementWithText('p', 'No tracking entries yet.');
    const p2 = createElementWithText('p', 'Start by clicking "Add Current" to track a page.', 'hint');
    emptyState.appendChild(p1);
    emptyState.appendChild(p2);
    trackingList.appendChild(emptyState);
    return;
  }

  trackingList.innerHTML = '';

  // Get current tab and check if it matches any entry
  const tab = await getCurrentTab();
  const currentDomain = tab ? extractDomain(tab.url) : null;
  let currentPageEntryIndex = -1;

  // Find if current page is in entries
  if (currentDomain) {
    currentPageEntryIndex = entries.findIndex(entry => isSameDomain(entry.domain, currentDomain));
  }

  // Reorder: if current page found, render it first with a separator
  if (currentPageEntryIndex !== -1) {
    const currentPageEntry = entries[currentPageEntryIndex];
    const entryElement = createEntryElement(currentPageEntry, currentPageEntryIndex, entries, true);
    trackingList.appendChild(entryElement);

    // Add separator
    const separator = document.createElement('div');
    separator.className = 'current-page-separator';
    trackingList.appendChild(separator);

    // Render all other entries
    entries.forEach((entry, index) => {
      if (index !== currentPageEntryIndex) {
        const entryElement = createEntryElement(entry, index, entries, false);
        trackingList.appendChild(entryElement);
      }
    });
  } else {
    // No current page match, render all normally
    entries.forEach((entry, index) => {
      const entryElement = createEntryElement(entry, index, entries, false);
      trackingList.appendChild(entryElement);
    });
  }
}

// Create entry element DOM using safe methods
function createEntryElement(entry, index, allEntries, isCurrentPage = false) {
  const container = document.createElement('div');
  container.className = isCurrentPage ? 'tracking-item tracking-item-current' : 'tracking-item';

  // Get favicon URL from domain
  const faviconUrl = `https://www.google.com/s2/favicons?domain=${extractDomain(entry.url)}&sz=32`;

  // Truncate title if too long
  const displayTitle = entry.title.length > 30 ? entry.title.substring(0, 27) + '...' : entry.title;

  // Truncate URL if too long
  const displayUrl = entry.url.length > 50 ? entry.url.substring(0, 47) + '...' : entry.url;

  // Build header section
  const headerSection = document.createElement('div');
  headerSection.className = 'tracking-item-header-section';

  const mainDiv = document.createElement('div');
  mainDiv.className = 'tracking-item-main';

  const faviconDiv = document.createElement('div');
  faviconDiv.className = 'tracking-item-favicon';
  const faviconImg = document.createElement('img');
  faviconImg.src = faviconUrl;
  faviconImg.alt = 'favicon';
  faviconImg.className = 'favicon';
  faviconImg.onerror = () => { faviconImg.style.display = 'none'; };
  faviconDiv.appendChild(faviconImg);

  const contentDiv = document.createElement('div');
  contentDiv.className = 'tracking-item-content';

  const titleHeaderDiv = document.createElement('div');
  titleHeaderDiv.className = 'tracking-item-header';
  const titleLink = document.createElement('a');
  titleLink.href = entry.url;
  titleLink.className = 'tracking-item-title';
  titleLink.textContent = displayTitle;
  titleLink.title = entry.title;
  titleLink.target = '_blank';
  titleHeaderDiv.appendChild(titleLink);

  if (entry.autoTrackingEnabled) {
    const autoBadge = document.createElement('span');
    autoBadge.className = 'tracking-item-auto-badge';
    autoBadge.textContent = '●';
    titleHeaderDiv.appendChild(autoBadge);
  }

  const urlLink = document.createElement('a');
  urlLink.href = entry.url;
  urlLink.className = 'tracking-item-url';
  urlLink.textContent = displayUrl;
  urlLink.title = entry.url;
  urlLink.target = '_blank';

  contentDiv.appendChild(titleHeaderDiv);
  contentDiv.appendChild(urlLink);
  mainDiv.appendChild(faviconDiv);
  mainDiv.appendChild(contentDiv);

  const controlsDiv = document.createElement('div');
  controlsDiv.className = 'tracking-item-controls';
  const editBtn = document.createElement('button');
  editBtn.className = 'btn-edit-title';
  editBtn.dataset.index = index;
  editBtn.title = 'Edit title';
  editBtn.textContent = '✏️';
  const expandBtn = document.createElement('button');
  expandBtn.className = 'btn-expand-toggle';
  expandBtn.title = 'Expand actions';
  expandBtn.dataset.index = index;
  expandBtn.textContent = '▼';
  controlsDiv.appendChild(editBtn);
  controlsDiv.appendChild(expandBtn);

  headerSection.appendChild(mainDiv);
  headerSection.appendChild(controlsDiv);
  container.appendChild(headerSection);

  // Build actions section
  const actionsDiv = document.createElement('div');
  actionsDiv.className = 'tracking-item-actions';
  actionsDiv.style.display = 'none';
  const autoToggleBtn = document.createElement('button');
  autoToggleBtn.className = `btn btn-icon btn-auto-toggle ${entry.autoTrackingEnabled ? 'btn-auto-toggle-active' : 'btn-auto-toggle-inactive'}`;
  autoToggleBtn.dataset.index = index;
  autoToggleBtn.title = 'Toggle auto-update';
  autoToggleBtn.textContent = '🔄';
  const updateBtn = document.createElement('button');
  updateBtn.className = 'btn btn-icon btn-update';
  updateBtn.dataset.index = index;
  updateBtn.title = 'Update now';
  updateBtn.textContent = '🔖 Update now';
  const historyBtn = document.createElement('button');
  historyBtn.className = 'btn btn-icon btn-history';
  historyBtn.dataset.index = index;
  historyBtn.title = 'View history';
  historyBtn.textContent = '⏳ Bookmark History';
  const deleteBtn = document.createElement('button');
  deleteBtn.className = 'btn btn-icon btn-delete';
  deleteBtn.dataset.index = index;
  deleteBtn.title = 'Delete';
  deleteBtn.textContent = '🗑️ Delete Bookmark';
  actionsDiv.appendChild(autoToggleBtn);
  actionsDiv.appendChild(updateBtn);
  actionsDiv.appendChild(historyBtn);
  actionsDiv.appendChild(deleteBtn);
  container.appendChild(actionsDiv);

  // Expand/collapse toggle button
  expandBtn.addEventListener('click', () => {
    const isHidden = actionsDiv.style.display === 'none';
    actionsDiv.style.display = isHidden ? 'flex' : 'none';
    expandBtn.classList.toggle('expanded', isHidden);
    expandBtn.textContent = isHidden ? '▲' : '▼';
  });

  // Edit title button
  editBtn.addEventListener('click', () => openRenameModal(entry, index));

  // Auto-update toggle button
  autoToggleBtn.addEventListener('click', async () => {
    const entries = await getEntries();
    const entryToUpdate = entries[index];
    entryToUpdate.autoTrackingEnabled = !entryToUpdate.autoTrackingEnabled;
    await saveEntries(entries);
    loadAndRenderEntries();
  });

  // Update button
  updateBtn.addEventListener('click', async () => {
    const tab = await getCurrentTab();
    if (!tab) {
      showStatus('Unable to access current tab', 'error');
      return;
    }
    const entries = await getEntries();
    const entryToUpdate = entries[index];
    if (entryToUpdate) {
      entryToUpdate.url = tab.url;
      entryToUpdate.title = tab.title || 'Untitled';
      entryToUpdate.lastUpdated = getCurrentTimestamp();
      entryToUpdate.history.push({
        timestamp: getCurrentTimestamp(),
        url: tab.url
      });
      await saveEntries(entries);
      loadAndRenderEntries();
      showStatus('Updated', 'success');
    }
  });

  // History button
  historyBtn.addEventListener('click', () => openHistoryModal(entry));

  // Delete button
  deleteBtn.addEventListener('click', async () => {
    if (confirm(`Delete "${entry.title}"?`)) {
      const entries = await getEntries();
      entries.splice(index, 1);
      await saveEntries(entries);
      loadAndRenderEntries();
      showStatus('Deleted', 'success');
    }
  });

  return container;
}

// Open history modal for an entry
function openHistoryModal(entry) {
  const modal = document.createElement('div');
  modal.className = 'modal show';
  modal.id = 'historyModal';

  const modalContent = document.createElement('div');
  modalContent.className = 'modal-content';

  const modalHeader = document.createElement('div');
  modalHeader.className = 'modal-header';
  const headerTitle = createElementWithText('h2', 'Update History');
  const closeBtn = createElementWithText('button', '×', 'modal-close');
  modalHeader.appendChild(headerTitle);
  modalHeader.appendChild(closeBtn);

  const modalBody = document.createElement('div');
  modalBody.className = 'modal-body';

  // Add initial entry
  const initialEntry = document.createElement('div');
  initialEntry.className = 'history-entry';
  const initialTimestamp = createElementWithText('div', 'Added on', 'history-entry-timestamp');
  const initialUrl = createElementWithText('div', entry.dateAdded, 'history-entry-url');
  initialEntry.appendChild(initialTimestamp);
  initialEntry.appendChild(initialUrl);
  modalBody.appendChild(initialEntry);

  // Add history entries
  entry.history.forEach((record) => {
    const historyEntry = document.createElement('div');
    historyEntry.className = 'history-entry';
    const timestamp = createElementWithText('div', record.timestamp, 'history-entry-timestamp');
    const url = createElementWithText('div', record.url, 'history-entry-url');
    historyEntry.appendChild(timestamp);
    historyEntry.appendChild(url);
    modalBody.appendChild(historyEntry);
  });

  modalContent.appendChild(modalHeader);
  modalContent.appendChild(modalBody);
  modal.appendChild(modalContent);
  document.body.appendChild(modal);

  closeBtn.addEventListener('click', () => {
    modal.remove();
  });

  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      modal.remove();
    }
  });
}

// Export data as JSON
async function handleExport() {
  const entries = await getEntries();

  if (entries.length === 0) {
    showStatus('No data to export', 'error');
    return;
  }

  const exportData = {
    version: '1.0.0',
    exportedAt: getCurrentTimestamp(),
    entries: entries
  };

  const dataStr = JSON.stringify(exportData, null, 2);
  const blob = new Blob([dataStr], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `keepup-backup-${Date.now()}.json`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);

  showStatus('Data exported successfully', 'success');
}

// Import data from JSON
async function handleImport(event) {
  const file = event.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = async (e) => {
    try {
      const importedData = JSON.parse(e.target.result);

      // Validate structure
      if (!importedData.entries || !Array.isArray(importedData.entries)) {
        throw new Error('Invalid file format');
      }

      // Validate entries
      importedData.entries.forEach((entry, i) => {
        if (!entry.id || !entry.title || !entry.url || !entry.domain || !entry.history) {
          throw new Error(`Invalid entry at index ${i}`);
        }
        if (!Array.isArray(entry.history)) {
          throw new Error(`Invalid history in entry ${i}`);
        }
      });

      // Ask for confirmation if replacing existing data
      if (confirm('This will replace all existing tracking entries. Continue?')) {
        await saveEntries(importedData.entries);
        loadAndRenderEntries();
        showStatus('Data imported successfully', 'success');
      }
    } catch (error) {
      showStatus(`Import failed: ${error.message}`, 'error');
    }
  };

  reader.readAsText(file);
  importFile.value = '';
}

// Open rename modal for an entry
function openRenameModal(entry, index) {
  const modal = document.createElement('div');
  modal.className = 'modal show';
  modal.id = 'renameModal';

  const modalContent = document.createElement('div');
  modalContent.className = 'modal-content';

  const modalHeader = document.createElement('div');
  modalHeader.className = 'modal-header';
  const headerTitle = createElementWithText('h2', 'Rename Bookmark');
  const closeBtn = createElementWithText('button', '×', 'modal-close');
  modalHeader.appendChild(headerTitle);
  modalHeader.appendChild(closeBtn);

  const modalBody = document.createElement('div');
  modalBody.className = 'modal-body';
  const input = document.createElement('input');
  input.type = 'text';
  input.id = 'renameInput';
  input.className = 'rename-input';
  input.value = entry.title;
  input.placeholder = 'Enter new name';
  modalBody.appendChild(input);

  const modalFooter = document.createElement('div');
  modalFooter.className = 'modal-footer';
  const saveBtn = createElementWithText('button', 'Save', 'btn btn-primary');
  saveBtn.id = 'renameSave';
  const cancelBtn = createElementWithText('button', 'Cancel', 'btn btn-secondary');
  cancelBtn.id = 'renameCancel';
  modalFooter.appendChild(saveBtn);
  modalFooter.appendChild(cancelBtn);

  modalContent.appendChild(modalHeader);
  modalContent.appendChild(modalBody);
  modalContent.appendChild(modalFooter);
  modal.appendChild(modalContent);
  document.body.appendChild(modal);

  const closeModal = () => {
    modal.remove();
  };

  const saveNewName = async () => {
    const newName = input.value.trim();
    if (!newName) {
      showStatus('Name cannot be empty', 'error');
      return;
    }

    const entries = await getEntries();
    entries[index].title = newName;
    await saveEntries(entries);
    loadAndRenderEntries();
    closeModal();
    showStatus('Renamed successfully', 'success');
  };

  input.focus();
  input.select();
  input.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') saveNewName();
  });
  saveBtn.addEventListener('click', saveNewName);
  cancelBtn.addEventListener('click', closeModal);
  closeBtn.addEventListener('click', closeModal);
  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
  });
}

// Helper Functions

async function getCurrentTab() {
  const tabs = await browser.tabs.query({ active: true, currentWindow: true });
  return tabs.length > 0 ? tabs[0] : null;
}

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

function generateId() {
  return `entry_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
}

function showStatus(message, type = 'info') {
  statusMessage.textContent = message;
  statusMessage.className = `status-message show ${type}`;

  setTimeout(() => {
    statusMessage.classList.remove('show');
  }, 3000);
}
