const themeListEl = document.getElementById('theme-list');
const uploadInput = document.getElementById('upload-theme');
const applyBtn = document.getElementById('apply-theme');

let themes = [
  { name: 'Dark Mode', cssVars: { '--bg-color': '#121212', '--text-color': '#eee' } },
  { name: 'Light Mode', cssVars: { '--bg-color': '#fff', '--text-color': '#111' } },
];

let selectedThemeIndex = null;

function renderThemes() {
  themeListEl.innerHTML = '';
  themes.forEach((theme, index) => {
    const li = document.createElement('li');
    li.textContent = theme.name;
    li.onclick = () => {
      selectedThemeIndex = index;
      highlightSelected();
    };
    themeListEl.appendChild(li);
  });
}

function highlightSelected() {
  Array.from(themeListEl.children).forEach((li, idx) => {
    li.style.backgroundColor = idx === selectedThemeIndex ? '#4caf50' : '#333';
  });
}

applyBtn.onclick = () => {
  if (selectedThemeIndex === null) {
    alert('Please select a theme first.');
    return;
  }
  applyTheme(themes[selectedThemeIndex]);
};

uploadInput.onchange = () => {
  const file = uploadInput.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = e => {
    try {
      let themeData = null;

      if (file.name.endsWith('.json')) {
        themeData = JSON.parse(e.target.result);
        if (!themeData.name || !themeData.cssVars) {
          alert('Invalid theme JSON format.');
          return;
        }
      } else if (file.name.endsWith('.css')) {
        // For CSS file, create a theme object with name = filename and css content as string
        themeData = { name: file.name, cssContent: e.target.result };
      } else {
        alert('Unsupported file type. Upload JSON or CSS files.');
        return;
      }

      themes.push(themeData);
      renderThemes();
      alert(`Theme "${themeData.name}" uploaded successfully!`);
    } catch (error) {
      alert('Failed to read theme file: ' + error.message);
    }
  };
  reader.readAsText(file);
};

function applyTheme(theme) {
  if (theme.cssVars) {
    // Apply CSS variables dynamically to document root
    Object.entries(theme.cssVars).forEach(([key, value]) => {
      document.documentElement.style.setProperty(key, value);
    });
  } else if (theme.cssContent) {
    // Inject CSS content as a style tag
    let styleTag = document.getElementById('dynamic-theme-style');
    if (!styleTag) {
      styleTag = document.createElement('style');
      styleTag.id = 'dynamic-theme-style';
      document.head.appendChild(styleTag);
    }
    styleTag.textContent = theme.cssContent;
  }
  alert(`Theme "${theme.name}" applied!`);
}

// Initial render
renderThemes();
