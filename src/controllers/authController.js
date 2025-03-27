const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../models/User');
import 'dotenv/config'

const login = async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: 'Username and password are required' });
  }

  try {
    const foundUser = await User.findOne({ username });
    if (!foundUser) return res.status(401).json({
      message : 'username or password incorrect'
    });
    const match = await bcrypt.compare(password, foundUser.password);
    if (match) {
      const accessToken = jwt.sign(
        {
          UserInfo: {
            username: foundUser.username,
            isAdmin: foundUser.isAdmin,
          },
        },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: '1h' }
      );
      res.json({ accessToken });
    } else {
      res.status(401).json({
        message : 'username or password incorrect'
      });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { login };