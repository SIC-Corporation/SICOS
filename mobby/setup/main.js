document.addEventListener('DOMContentLoaded', () => {
  const enableOptions = document.getElementsByName('enable');
  const adminSection = document.querySelector('.admin-section');
  const continueBtn = document.getElementById('continueBtn');

  // Show admin section only if "Yes" is selected
  enableOptions.forEach(option => {
    option.addEventListener('change', () => {
      if (option.value === 'yes') {
        adminSection.style.display = 'block';
      } else {
        adminSection.style.display = 'none';
      }
    });
  });

  continueBtn.addEventListener('click', () => {
    const enableChoice = document.querySelector('input[name="enable"]:checked');
    if (!enableChoice) {
      alert("Please select if you want to enable Mobby.");
      return;
    }

    if (enableChoice.value === 'yes') {
      const modeChoice = document.querySelector('input[name="mode"]:checked');
      if (!modeChoice) {
        alert("Please select a
