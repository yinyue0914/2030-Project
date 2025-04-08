const Blog = require('../models/blogModel');

exports.createBlog = async (req, res) => {
  const { title, content } = req.body;

  if (!title || !content) {
    return res.status(400).json({ message: 'Title & content required' });
  }

  const newBlog = new Blog({ title, content });
  await newBlog.save();
  res.status(201).json({ message: 'Blog post created!', data: newBlog });
};
