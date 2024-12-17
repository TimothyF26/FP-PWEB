// main.js

// Ambil nama pengguna aktif dari localStorage
const activePerson = localStorage.getItem('activePerson');

// Jika tidak ada pengguna aktif, redirect kembali ke halaman person selection
if (!activePerson) {
  alert('No active person selected. Redirecting to Person Selection.');
  window.location.href = './Person/person.html';
}

// Ambil data global routines
const globalRoutinesKey = 'globalRoutines'; // Key untuk global routines
const globalRoutines = JSON.parse(localStorage.getItem(globalRoutinesKey)) || [];

// Ambil status tercentang untuk pengguna aktif
const personCheckedKey = `checked_${activePerson}`; // Key untuk checked status per person
const personChecked = JSON.parse(localStorage.getItem(personCheckedKey)) || {};

// Ambil timestamps untuk pengguna aktif
const personTimestampsKey = `timestamps_${activePerson}`; // Key untuk timestamps per person
const personTimestamps = JSON.parse(localStorage.getItem(personTimestampsKey)) || {};

// Render routines di halaman
function renderRoutines() {
  const routineList = document.getElementById('routine-list');
  routineList.innerHTML = ''; // Bersihkan list sebelum rendering

  globalRoutines.forEach((routineName) => {
    // Membuat elemen div untuk setiap routine
    const routineItem = document.createElement('div');
    routineItem.classList.add('routine-item');

    // Membuat checkbox
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.checked = personChecked[routineName] || false;

    // Membuat judul routine
    const routineTitle = document.createElement('h3');
    routineTitle.textContent = routineName;

    // Membuat elemen timestamp
    const timestamp = document.createElement('span');
    timestamp.classList.add('timestamp');
    timestamp.textContent = personTimestamps[routineName] || '';

    // Event listener untuk mencatat status checkbox dan waktu
    checkbox.addEventListener('change', function () {
      if (checkbox.checked) {
        const currentTime = new Date();
        personChecked[routineName] = true;
        personTimestamps[routineName] = `Checked at: ${currentTime.toLocaleTimeString()}`;
      } else {
        personChecked[routineName] = false;
        personTimestamps[routineName] = '';
      }
      savePersonData();
      renderRoutines();
    });

    // Menambahkan elemen ke dalam routineItem
    routineItem.appendChild(checkbox);
    routineItem.appendChild(routineTitle);
    routineItem.appendChild(timestamp);

    // Tambahkan routineItem ke dalam daftar
    routineList.appendChild(routineItem);
  });
}

// Simpan data global routines
function saveGlobalRoutines() {
  localStorage.setItem(globalRoutinesKey, JSON.stringify(globalRoutines));
}

// Simpan data person-specific (checked status dan timestamps)
function savePersonData() {
  localStorage.setItem(personCheckedKey, JSON.stringify(personChecked));
  localStorage.setItem(personTimestampsKey, JSON.stringify(personTimestamps));
}

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
    // Pastikan routine tidak duplikat
    if (!globalRoutines.includes(routineName)) {
      globalRoutines.push(routineName);
      saveGlobalRoutines(); // Simpan ke global routines
      renderRoutines(); // Render ulang routines
    } else {
      alert('Routine sudah ada.');
    }

    // Bersihkan input dan tutup popup
    routineInput.value = '';
    togglePopup(false);
  }
}

// Event listeners untuk tombol "+" dan "Cancel"
document.getElementById('add-button').addEventListener('click', function () {
  togglePopup(true);
});

document.getElementById('cancel-button').addEventListener('click', function () {
  togglePopup(false);
});

document.getElementById('overlay').addEventListener('click', function () {
  togglePopup(false);
});

// Event listener untuk tombol "OK"
document.getElementById('ok-button').addEventListener('click', addRoutine);

// Logout button untuk kembali ke landing page
document.getElementById('logout-button').addEventListener('click', function () {
  localStorage.removeItem('isLoggedIn'); // Hapus status login
  localStorage.removeItem('activePerson'); // Hapus pengguna aktif
  window.location.href = './Login/landing.html'; // Redirect ke landing page
});

// Panggil renderRoutines saat halaman dimuat
renderRoutines();