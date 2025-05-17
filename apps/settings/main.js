// Simple state simulation (later we can save to storage or config files)
const autoUpdatesCheckbox = document.getElementById('auto-updates');
const firewallCheckbox = document.getElementById('firewall-enable');
const logoutBtn = document.getElementById('logout-btn');

// Load saved settings if any (mock)
let settings = {
  autoUpdates: false,
  firewall: false,
};

function loadSettings() {
  // In real case, load from config or localStorage
  autoUpdatesCheckbox.checked = settings.autoUpdates;
  firewallCheckbox.checked = settings.firewall;
}

function saveSettings() {
  settings.autoUpdates = autoUpdatesCheckbox.checked;
  settings.firewall = firewallCheckbox.checked;
  alert('Settings saved!');
}

autoUpdatesCheckbox.onchange = saveSettings;
firewallCheckbox.onchange = saveSettings;

logoutBtn.onclick = () => {
  alert('Logging out... (mock)');
  // Here you can redirect to login or reset user session
};

loadSettings();
