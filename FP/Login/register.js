document.getElementById('register-form').addEventListener('submit', function (event) {
  event.preventDefault(); // Mencegah refresh halaman secara default

  const username = document.getElementById('username').value.trim();
  const email = document.getElementById('email').value.trim();
  const password = document.getElementById('password').value.trim();
  const confirmPassword = document.getElementById('confirm-password').value.trim();
  const errorMessage = document.getElementById('error-message');

  let isValid = true; // Flag untuk validasi

  // Reset validasi sebelumnya
  document.querySelectorAll('.input-group').forEach(group => group.classList.remove('invalid'));
  if (errorMessage) {
    errorMessage.classList.add('hidden');
    errorMessage.textContent = '';
  }

  // Validasi username
  if (!username) {
    document.getElementById('username').parentElement.classList.add('invalid');
    isValid = false;
  }

  // Validasi email
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    document.getElementById('email').parentElement.classList.add('invalid');
    isValid = false;
  }

  // Validasi password
  if (!password || password.length < 8) {
    document.getElementById('password').parentElement.classList.add('invalid');
    isValid = false;
  }

  // Validasi confirm password
  if (confirmPassword !== password) {
    document.getElementById('confirm-password').parentElement.classList.add('invalid');
    isValid = false;
  }

  // Ambil daftar pengguna dari localStorage
  const users = JSON.parse(localStorage.getItem('users')) || [];

  // Periksa apakah email atau username sudah digunakan
  const isEmailUsed = users.some(user => user.email === email);
  const isUsernameUsed = users.some(user => user.username === username);

  if (isEmailUsed) {
    document.getElementById('email').parentElement.classList.add('invalid');
    errorMessage.textContent = 'Email is already in use.';
    errorMessage.classList.remove('hidden');
    isValid = false;
  }

  if (isUsernameUsed) {
    document.getElementById('username').parentElement.classList.add('invalid');
    errorMessage.textContent = 'Username is already in use.';
    errorMessage.classList.remove('hidden');
    isValid = false;
  }

  // Tampilkan pesan error jika tidak valid
  if (!isValid) {
    return;
  }

  // Simpan pengguna baru ke localStorage jika valid
  users.push({ username, email, password });
  localStorage.setItem('users', JSON.stringify(users));

  // Tampilkan notifikasi sukses dan redirect ke login page
  alert('Account created successfully! Redirecting to login page...');
  window.location.href = './login.html';
});