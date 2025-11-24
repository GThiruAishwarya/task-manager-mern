const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Joi = require('joi');
const User = require('../models/User');
require('dotenv').config();


const registerSchema = Joi.object({ name: Joi.string().min(2).required(), email: Joi.string().email().required(), password: Joi.string().min(6).required(), role: Joi.string().valid('user','admin').optional() });
const loginSchema = Joi.object({ email: Joi.string().email().required(), password: Joi.string().required() });


// POST /api/register
router.post('/register', async (req,res) => {
try {
const { error } = registerSchema.validate(req.body);
if (error) return res.status(400).json({ message: error.details[0].message });
const { name, email, password, role } = req.body;
let user = await User.findOne({ email });
if (user) return res.status(400).json({ message: 'User already exists' });
const salt = await bcrypt.genSalt(10);
const hashed = await bcrypt.hash(password, salt);
user = new User({ name, email, password: hashed, role: role || 'user' });
await user.save();
const payload = { id: user._id };
const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN || '7d' });
res.json({ token, user: { id: user._id, name: user.name, email: user.email, role: user.role } });
} catch (err) {
console.error(err); res.status(500).json({ message: 'Server error' });
}
});


// POST /api/login
router.post('/login', async (req,res) => {
try {
const { error } = loginSchema.validate(req.body);
if (error) return res.status(400).json({ message: error.details[0].message });
const { email, password } = req.body;
const user = await User.findOne({ email });
if (!user) return res.status(400).json({ message: 'Invalid credentials' });
const isMatch = await bcrypt.compare(password, user.password);
if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });
const payload = { id: user._id };
const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN || '7d' });
res.json({ token, user: { id: user._id, name: user.name, email: user.email, role: user.role } });
} catch (err) {
console.error(err); res.status(500).json({ message: 'Server error' });
}
});


module.exports = router;
