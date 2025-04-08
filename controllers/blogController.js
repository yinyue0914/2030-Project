const Blog = require('../models/blogModel');

const jwt = require('jsonwebtoken');

exports.createBlog = async(req, res) => {
  const {title, content} = req.body;
  const token = req.headers.authorization?.split(' ')[1];
  if(!token) {
      return res.status(401).json({message: 'nnauthorized'});
  }

  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  const newBlog = new Blog({
    title,
    content,
    author: decoded.username
  });
  
  await newBlog.save();
  console.log('Decoded token:', decoded);
  res.status(201).json({message: 'blog post created!', data: newBlog});};

exports.getAllBlogs = async (req, res) => {
  const blogs = await Blog.find().sort({createdAt: -1});
  res.status(200).json(blogs);
};