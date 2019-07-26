const bcrypt = require('bcryptjs');
const express = require('express');
const { generateToken } = require('../auth/authenticate');

const User = require('../database/models/userModel');

const router = express.Router();

router.post('/register', async (req, res) => {
  const user = await User.registerUser(req.body);
  return res.status(201).json({ user });
});

router.post('/login', (req, res) => {
  const { username, password } = req.body;

  User.findBy({ username })
    .then(user => {
      if (user && bcrypt.compareSync(password, user.password)) {
        const token = generateToken(user);
        res.status(200).json({
          message: `Welcome ${user.username}!`,
          token,
        });
      } else {
        res.status(401).json({ message: 'Invalid Credentials' });
      }
    })

    .catch(error => {
      console.log(error);
      res.status(500).json(error);
    });
});

module.exports = router;
