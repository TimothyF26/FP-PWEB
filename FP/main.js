// main.js

// Fungsi untuk menampilkan atau menyembunyikan popup
function togglePopup(show) {
  const overlay = document.getElementById('overlay');
  const popupBox = document.getElementById('popup-box');
  const body = document.querySelector('body');

  if (show) {
    overlay.style.display = 'block';
    popupBox.style.display = 'block';
    body.classList.add('blur');
  } else {
    overlay.style.display = 'none';
    popupBox.style.display = 'none';
    body.classList.remove('blur');
  }
}

// Fungsi untuk menambah routine baru
function addRoutine() {
  const routineInput = document.getElementById('routine-input');
  const routineName = routineInput.value.trim();

  if (routineName) {
    const routineList = document.getElementById('routine-list');
    
    // Membuat elemen section baru untuk routine
    const routineItem = document.createElement('div');
    routineItem.classList.add('routine-item');
    
    // Membuat checkbox dan judul routine
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    
    const routineTitle = document.createElement('h3');
    routineTitle.textContent = routineName;

    const timestamp = document.createElement('span');
    timestamp.classList.add('timestamp');
    
    // Menambahkan event listener pada checkbox untuk mencatat waktu saat di-ceklist
    checkbox.addEventListener('change', function() {
      if (checkbox.checked) {
        const currentTime = new Date();
        timestamp.textContent = `Checked at: ${currentTime.toLocaleTimeString()}`;
      } else {
        timestamp.textContent = '';
      }
    });
    
    // Menyusun elemen-elemen ke dalam section
    routineItem.appendChild(checkbox);
    routineItem.appendChild(routineTitle);
    routineItem.appendChild(timestamp);
    routineList.appendChild(routineItem);
    
    // Mengosongkan input dan menutup popup
    routineInput.value = '';
    togglePopup(false);
  }
}

// Event listeners untuk tombol "+" dan "Cancel"
document.getElementById('add-button').addEventListener('click', function() {
  togglePopup(true);
});

document.getElementById('cancel-button').addEventListener('click', function() {
  togglePopup(false);
});

document.getElementById('overlay').addEventListener('click', function() {
  togglePopup(false);
});

// Event listener untuk tombol "OK"
document.getElementById('ok-button').addEventListener('click', addRoutine);
