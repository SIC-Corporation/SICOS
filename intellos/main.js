// main.js

const passwordKey = 'intellos_password';
const lockscreenEl = document.getElementById('lockscreen');
const inputEl = document.getElementById('passwordInput');
const messageEl = document.getElementById('message');
const setupEl = document.getElementById('setup');
const setupInputEl = document.getElementById('setupPassword');
const setupBtn = document.getElementById('setupBtn');

function isPasswordSet() {
  return localStorage.getItem(passwordKey) !== null;
}

function setPassword(pw) {
  localStorage.setItem(passwordKey, pw);
}

function checkPassword(pw) {
  return localStorage.getItem(passwordKey) === pw;
}

function showSetup() {
  lockscreenEl.style.display = 'none';
  setupEl.style.display = 'block';
}

function showLockscreen() {
  setupEl.style.display = 'none';
  lockscreenEl.style.display = 'block';
  inputEl.value = '';
  messageEl.textContent = '';
}

function handleSetup() {
  const pw = setupInputEl.value.trim();
  if (pw.length < 4) {
    alert('Password must be at least 4 characters');
    return;
  }
  setPassword(pw);
  alert('Password set successfully! Please log in now.');
  showLockscreen();
}

function handleLogin() {
  const pw = inputEl.value.trim();
  if (checkPassword(pw)) {
    messageEl.textContent = 'Access granted!';
    // TODO: Proceed to main OS UI here
  } else {
    messageEl.textContent = 'Wrong password. Try again.';
  }
}

window.onload = () => {
  if (!isPasswordSet()) {
    showSetup();
  } else {
    showLockscreen();
  }
};

setupBtn.addEventListener('click', handleSetup);
inputEl.addEventListener('keyup', (e) => {
  if (e.key === 'Enter') {
    handleLogin();
  }
});