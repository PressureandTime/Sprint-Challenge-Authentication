const axios = require('axios');
const bcrypt = require('bcryptjs');
const express = require('express');
const { generateToken } = require('../auth/authenticate');
const { authenticate } = require('../auth/authenticate');

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

function getJokes(req, res) {
  const requestOptions = {
    headers: { accept: 'application/json' },
  };

  axios
    .get('https://icanhazdadjoke.com/search', requestOptions)
    .then(response => {
      res.status(200).json(response.data.results);
    })
    .catch(err => {
      res.status(500).json({ message: 'Error Fetching Jokes', error: err });
    });
}

router.get('/api/jokes', authenticate, getJokes);

module.exports = router;
