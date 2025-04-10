const Blog = require('../models/blogModel');
const jwt = require('jsonwebtoken');
const createBlogMapper = require('../server/factories/blogFactory');

exports.createBlog = async(req, res) => {
  const {title, content} = req.body;
  const token = req.headers.authorization?.split(' ')[1];
  if(!token) {
    return res.status(401).json({message: 'nnauthorized'});
  }

  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  // let temperature = null;
  // const weatherRes = await axios.get(
  //   `https://api.openweathermap.org/data/2.5/weather?q=Vancouver&units=metric&appid=${process.env.WEATHER_API}`
  // );
  // temperature = weatherRes.data.main.temp;
  const newBlog = new Blog({
    title,
    content,
    author: decoded.username,
  });
  // const newBlog = new Blog({
  //   title,
  //   content,
  //   author: decoded.username,
  //   temperature
  // });
  

  await newBlog.save();
  res.status(201).json({message: 'blog post created!', data: newBlog});
};

exports.getAllBlogs = async (req, res) => {
  const blogs = await Blog.find().sort({ createdAt: -1 });
  const mapped = blogs.map(blog => createBlogMapper('preview', blog));
  res.status(200).json(mapped);
};

exports.deleteBlog = async(req, res) => {
  const blogId = req.params.id;
  const token = req.headers.authorization?.split(' ')[1];

  if(!token) {
    return res.status(401).json({message: 'unauthorized'});
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // this part is needed even though delet button is hiddne form non-admins
    // only hidden, can stilla ccess it (somehow)
    if(decoded.role !== 'admin') {
      return res.status(403).json({message: 'for admin use only'});
    }

    const deleted = await Blog.findByIdAndDelete(blogId);
    if(!deleted) {
      return res.status(404).json({message: 'Blog not found'});
    }

    res.status(200).json({message: 'blog deleted'});
  }catch(error) {
    res.status(500).json({message: 'error deleting'});
  }
};

exports.updateBlog = async(req, res) => {
  const blogId = req.params.id;
  const {title, content} = req.body;
  const token =req.headers.authorization?.split(' ')[1];
  if(!token) {
    return res.status(401).json({message: 'unauthorized'});
  }

  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  const blog = await Blog.findById(blogId);
  if(!blog) {
    return res.status(404).json({message: 'blog not found'});
  }

  if(blog.author !== decoded.username) {
    return res.status(403).json({message: 'cant edit this post'});
  }

  blog.title = title;
  blog.content = content;
  await blog.save();
  res.status(200).json({message: 'blog updated'});
};