require('dotenv').config();
const express = require('express');
const path = require('path');
const connectDB = require('./db');    // singleton db module
const authController = require('../controllers/authController');
const blogController = require('../controllers/blogController');

const app = express();
const PORT = 3000;

// middleware
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use(express.static(path.join(__dirname, '../views')));

app.post('/api/blogs', blogController.createBlog);
app.get('/api/blogs', blogController.getAllBlogs);
app.put('/api/blogs/:id', blogController.updateBlog);
app.delete('/api/blogs/:id', blogController.deleteBlog);

app.post('/api/register', authController.register);
app.post('/api/login', authController.login);

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../views/index.html'));
});

// no longer a 2600 copy, this is singlton requirement
connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`server running at http://localhost:${PORT}`);
    });
  })
  .catch(error => {
    console.error('connection eror:', error);
  });