const backBtn = document.getElementById('back-btn');
const forwardBtn = document.getElementById('forward-btn');
const goBtn = document.getElementById('go-btn');
const urlBar = document.getElementById('url-bar');
const browserFrame = document.getElementById('browser-frame');

backBtn.onclick = () => {
  browserFrame.contentWindow.history.back();
};

forwardBtn.onclick = () => {
  browserFrame.contentWindow.history.forward();
};

goBtn.onclick = () => {
  let url = urlBar.value.trim();
  if (!url) return;

  // Add http if missing
  if (!/^https?:\/\//i.test(url)) {
    url = 'https://' + url;
  }

  browserFrame.src = url;
};

urlBar.addEventListener('keyup', (e) => {
  if (e.key === 'Enter') {
    goBtn.onclick();
  }
});

// Update URL bar on iframe load
browserFrame.addEventListener('load', () => {
  try {
    urlBar.value = browserFrame.contentWindow.location.href;
  } catch {
    // Cross-origin restriction; keep the typed url
  }
});
