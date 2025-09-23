const db = require('../models/db');
const bcrypt = require('bcryptjs');

const registerUser = async (req, res) => {
  const { username, password, email, address } = req.body;

  if (!username || !password || password.length < 8 || !email) {
    return res.status(400).json({ error: 'Invalid input' });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    const sql = `
      INSERT INTO users (username, password, email, address)
      VALUES (?, ?, ?, ?)
    `;
    db.query(sql, [username, hashedPassword, email, address], (err, result) => {
      if (err) return res.status(500).json({ error: 'Failed to register user' });
      res.json({ message: 'User registered', id: result.insertId });
    });
  } catch (err) {
    res.status(500).json({ error: 'Encryption failed' });
  }
};

const loginUser = async (req, res) => {
  const { username, password } = req.body;

  console.log('Received data:', req.body);  

  try {
    const sql = 'SELECT * FROM users WHERE username = ?';
    db.query(sql, [username], async (err, results) => {
      if (err) return res.status(500).json({ error: 'Database error' });
      if (results.length === 0) return res.status(401).json({ error: 'User not found' });

      const user = results[0];

      console.log('Stored hashed password:', user.password);

      const isMatch = await bcrypt.compare(password, user.password);
      console.log('Password match:', isMatch);  

      if (!isMatch) return res.status(401).json({ error: 'Invalid credentials' });

      delete user.password;

      res.status(200).json({ user });
    });
  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ error: 'Login failed' });
  }
};

exports.registerUser = registerUser;
exports.loginUser = loginUser;
