require('dotenv').config();
const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const authController = require('../controllers/authController');
const blogController = require('../controllers/blogController');

const app = express();
const PORT = 3000;

mongoose.connect(process.env.MONGO, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('connected to mongo'))
.catch(e => console.error('connection eror:', e));

// middleware
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use(express.static(path.join(__dirname, '../views')));

app.post('/api/blogs', blogController.createBlog);
app.get('/api/blogs', blogController.getAllBlogs);

app.post('/api/register', authController.register);
app.post('/api/login', authController.login);

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../views/index.html'));
});

// this i copied from 2600, which is why theres nice msgs with emojis
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});