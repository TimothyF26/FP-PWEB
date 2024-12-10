const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const port = 5500;

// Parsing JSON request bodies
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Endpoint untuk melakukan registrasi pengguna
app.post('/register', (req, res) => {
  const { email, username, password, confirmPassword } = req.body;

  // Validasi password dan confirm password
  if (password !== confirmPassword) {
    return res.status(400).send('Password dan Confirm Password tidak cocok.');
  }

  // Simpan pengguna ke database (implementasi terserah kamu)
  res.status(200).send('Registrasi berhasil.');
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});