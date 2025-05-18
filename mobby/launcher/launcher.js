// Simulate short delay before hiding splash screen
setTimeout(() => {
  window.close(); // Will work if Electron opens this window
}, 3000); // 3 seconds splash
