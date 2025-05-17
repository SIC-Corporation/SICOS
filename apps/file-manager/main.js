const appContent = document.getElementById('app-content');

const mockFileSystem = {
  'Home': {
    'Documents': {
      'Resume.docx': 'file',
      'Project': {
        'report.pdf': 'file',
        'data.csv': 'file'
      }
    },
    'Pictures': {
      'photo1.jpg': 'file',
      'photo2.png': 'file'
    },
    'todo.txt': 'file'
  }
};

let currentPath = ['Home'];

function getCurrentFolder() {
  return currentPath.reduce((folder, part) => folder[part], mockFileSystem);
}

function renderFolder() {
  const folder = getCurrentFolder();
  appContent.innerHTML = '';

  // Back button if not root
  if (currentPath.length > 1) {
    const backBtn = document.createElement('button');
    backBtn.textContent = '⬅️ Back';
    backBtn.onclick = () => {
      currentPath.pop();
      renderFolder();
    };
    appContent.appendChild(backBtn);
  }

  // Show folder contents
  const list = document.createElement('ul');
  for (const name in folder) {
    const itemType = folder[name];
    const li = document.createElement('li');
    li.textContent = name;
    li.style.cursor = 'pointer';
    li.style.color = (itemType === 'file') ? '#ccc' : '#8ef';

    li.onclick = () => {
      if (itemType === 'file') {
        alert(`Opening file: ${name} (Not implemented yet)`);
      } else {
        currentPath.push(name);
        renderFolder();
      }
    };

    list.appendChild(li);
  }
  appContent.appendChild(list);
}

// Initial render
renderFolder();
