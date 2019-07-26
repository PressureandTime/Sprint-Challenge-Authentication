const bcrypt = require('bcryptjs');
const express = require('express');

const User = require('../database/models/userModel');

const router = express.Router();

router.post('/register', async (req, res) => {
  const user = await User.registerUser(req.body);
  return res.status(201).json({ user });
});





module.exports = router;
