// Simple plugin loader example

const pluginContainer = document.getElementById('plugin-container');

// Example: load a plugin dynamically (simulate)
function loadPlugin(name) {
  const pluginDiv = document.createElement('div');
  pluginDiv.textContent = `Plugin Loaded: ${name}`;
  pluginDiv.style.padding = '10px';
  pluginDiv.style.border = '1px solid #ccc';
  pluginDiv.style.margin = '5px 0';
  pluginContainer.appendChild(pluginDiv);
}

// Load some example plugins
loadPlugin('File Manager');
loadPlugin('App Store');
loadPlugin('Settings');
loadPlugin('Chrome Launcher');
