const User = require('../models/userModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.register = async (req, res) => {
  const {username, password, role} = req.body;
  console.log('register body:', req.body);

  if(!username || !password) {
    return res.status(400).json({message: 'Username and password required.'});
  }

  try {
    const existingUser = await User.findOne({username});
    if(existingUser) {
      return res.status(409).json({message: 'Username already taken.'});
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const roleToSet = (role === 'admin' || role === 'member') ? role : 'guest';
    const newUser = new User({ username, password: hashedPassword, role: roleToSet });        // default is guest, not logged in
    await newUser.save();

    res.status(201).json({message: 'registration successful!'});
  } catch(error) {
    console.error('Register error:', error);
    res.status(500).json({message: 'registration error'});
  }
};

exports.login = async (req, res) => {
  const {username, password} = req.body;

  try {
    const user = await User.findOne({username});
    if(!user) {
      return res.status(401).json({message: 'invalid credentials.'});
    }

    const match = await bcrypt.compare(password, user.password);
    if(!match) {
      return res.status(401).json({message: 'invalid creds'});
    }

    const token = jwt.sign(
      {userId: user._id, username: user.username, role: user.role},       // make token have username -> no more 'undefined' names
      process.env.JWT_SECRET,
      {expiresIn: '1h'}
    );        

    res.status(200).json({message: 'login successful!', token});
  } catch(error) {
    console.error('Login error:', error);
    res.status(500).json({ message:'login error'});
  }
};