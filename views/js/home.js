const blogForm = document.getElementById('blog-form');
const blogSection = document.getElementById('blog-section');
const blogList = document.getElementById('blog-list');
const loginStatus = document.getElementById('login-status');
const logoutBtn = document.getElementById('logout-btn');
const token = localStorage.getItem('token');

if(token) {
  const payload = JSON.parse(atob(token.split('.')[1]));
  loginStatus.textContent = `Logged in as: ${payload.username} (${payload.role})`;
  logoutBtn.classList.remove('d-none');
  if(payload.role === 'member' || payload.role === 'admin') {
    blogSection.style.display = 'block';
  } else {
    blogSection.style.display = 'none';
  }
}else {
  loginStatus.textContent = 'Not logged in';
  logoutBtn.classList.add('d-none');
  blogSection.style.display ='none';
}

logoutBtn.addEventListener('click', () => {
  localStorage.removeItem('token');
  location.reload();
});

if (blogForm) {
  blogForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const title = e.target.title.value;
    const content = e.target.content.value;
    try {
      const response = await fetch('/api/blogs', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({title, content})
      });
      const result = await response.json();
      alert(result.message);
      e.target.reset();
      loadBlogs();
    } catch (error) {
      alert('error creating blog.');
      console.error(error);
    }
  });
}

async function loadBlogs() {
  try {
    const res = await fetch('/api/blogs');
    const blogs = await res.json();
    blogList.innerHTML = '';
    blogs.forEach(blog => {
      const div = document.createElement('div');
      div.classList.add('card', 'mb-3');
      div.innerHTML = `
        <div class="card-body">
          <h5 class="card-title">${blog.title}</h5>
          <p class="card-text">${blog.content}</p>
          <p class="card-text"><strong>Posted by:</strong> ${blog.author}</p>
          <p class="card-text"><small class="text-muted">${new Date(blog.createdAt).toLocaleDateString()}</small></p>
        </div>
      `;
      blogList.appendChild(div);
    });
  } catch (err) {
    console.error('error loading blogs:', err);
  }
}

loadBlogs();

const registerForm = document.getElementById('register-form');
registerForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  const username = e.target.username.value;
  const password = e.target.password.value;
  try {
    const res = await fetch('/api/register', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({username, password})
    });
    const data = await res.json();
    alert(data.message);
    e.target.reset();
  }catch (error) {
    alert('registration failed');
    console.error(error);
  }
});

const loginForm = document.getElementById('login-form');
loginForm.addEventListener('submit', async(e) => {
  e.preventDefault();
  const username = e.target.username.value;
  const password = e.target.password.value;
  try {
    const res = await fetch('/api/login', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({username, password})
    });
    const data = await res.json();
    if(res.ok) {
      alert('Login successful!');
      localStorage.setItem('token', data.token);
      location.reload();
    }else {
      alert(data.message || 'login failed');
    }
    e.target.reset();
  }catch (error) {
    alert('login error');
    console.error(error);
  }
});