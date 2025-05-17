const statusText = document.getElementById('status-text');
const scanBtn = document.getElementById('scan-btn');
const scheduledScanCheckbox = document.getElementById('scheduled-scan');
const realtimeProtectionCheckbox = document.getElementById('realtime-protection');
const logsList = document.getElementById('logs-list');

let logs = JSON.parse(localStorage.getItem('sicLogs')) || [];
let scheduledScanInterval;

function addLog(message) {
  const time = new Date().toLocaleTimeString();
  logs.unshift(`[${time}] ${message}`);
  if (logs.length > 50) logs.pop(); // keep logs to last 50
  localStorage.setItem('sicLogs', JSON.stringify(logs));
  renderLogs();
}

function renderLogs() {
  logsList.innerHTML = logs.map(log => `<li>${log}</li>`).join('');
}

function runManualScan() {
  addLog('Manual scan started...');
  // simulate scanning delay
  setTimeout(() => {
    addLog('Scan complete. No threats found.');
  }, 2000);
}

function startScheduledScans() {
  if (scheduledScanInterval) clearInterval(scheduledScanInterval);
  scheduledScanInterval = setInterval(() => {
    addLog('Scheduled scan running...');
    // simulate scan
    setTimeout(() => addLog('Scheduled scan complete. No threats found.'), 2000);
  }, 60000); // every 60 seconds for demo
}

function stopScheduledScans() {
  clearInterval(scheduledScanInterval);
}

scanBtn.addEventListener('click', runManualScan);

scheduledScanCheckbox.addEventListener('change', (e) => {
  if (e.target.checked) {
    addLog('Scheduled scans enabled.');
    startScheduledScans();
  } else {
    addLog('Scheduled scans disabled.');
    stopScheduledScans();
  }
});

realtimeProtectionCheckbox.addEventListener('change', (e) => {
  if (e.target.checked) {
    addLog('Real-time protection enabled.');
    statusText.textContent = 'Active';
  } else {
    addLog('Real-time protection disabled.');
    statusText.textContent = 'Inactive';
  }
});

// initialize logs display
renderLogs();

// start scheduled scans if enabled (default off)
if (scheduledScanCheckbox.checked) {
  startScheduledScans();
}
