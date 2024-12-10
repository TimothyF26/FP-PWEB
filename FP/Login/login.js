document.getElementById('login-form').addEventListener('submit', function (event) {
  event.preventDefault(); // Mencegah refresh halaman secara default

  const email = document.getElementById('email').value.trim();
  const password = document.getElementById('password').value.trim();
  const errorMessage = document.getElementById('error-message');

  // Ambil daftar pengguna dari localStorage
  const users = JSON.parse(localStorage.getItem('users')) || [];

  // Cari pengguna berdasarkan email
  const validUser = users.find(user => user.email === email);

  if (validUser) {
    // Periksa apakah password cocok
    if (validUser.password === password) {
      // Simpan status login ke localStorage
      localStorage.setItem('isLoggedIn', true);

      // Redirect ke halaman utama (index.html)
      alert(`Welcome back, ${validUser.username}!`);
      window.location.href = '../index.html';
    } else {
      // Password salah
      errorMessage.textContent = 'Incorrect password.';
      errorMessage.style.display = 'block';
    }
  } else {
    // Email tidak ditemukan
    errorMessage.textContent = 'Email not found.';
    errorMessage.style.display = 'block';
  }
});