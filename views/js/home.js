const blogForm = document.getElementById('blog-form');
const blogSection = document.getElementById('blog-section');
const blogList = document.getElementById('blog-list');
const loginStatus = document.getElementById('login-status');
const logoutBtn = document.getElementById('logout-btn');
const token = localStorage.getItem('token');
const payload = token ? JSON.parse(atob(token.split('.')[1])) : null;

if(token) {
  loginStatus.textContent = `Logged in as: ${payload.username}(${payload.role})`;
  logoutBtn.classList.remove('d-none');
  if(payload.role === 'member' || payload.role === 'admin') {
    blogSection.style.display = 'block';
  } else {
    blogSection.style.display = 'none';
  }
}else {
  loginStatus.textContent = 'Not logged in';
  logoutBtn.classList.add('d-none');
  blogSection.style.display = 'none';     // hide if not correct user
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
    }catch(error) {
      alert('error creating blog');
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
        <p class="card-text">${blog.snippet}</p>
        <p class="card-text"><strong>Posted by:</strong> ${blog.author}</p>
        <p class="card-text"><small class="text-muted">${blog.date}</small></p>
        <p class="card-text"><small class="text-muted">Temp at post: ${blog.temperature ?? 'N/A'}°C</small></p>
      </div>
      `;

      // admin can delete
      if (payload && payload.role === 'admin') {
        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'Delete';
        deleteBtn.classList.add('btn', 'btn-danger', 'btn-sm');
        deleteBtn.addEventListener('click', async () => {
          const confirmed = confirm('Delete this blog post?');
          if (confirmed) {
            await fetch(`/api/blogs/${blog._id}`, {
              method: 'DELETE',
              headers: {'Authorization': `Bearer ${token}`}
            });
            loadBlogs();
          }
        });
        div.querySelector('.card-body').appendChild(deleteBtn);
      }

      // author can edit
      if(payload && payload.username === blog.author) {
        const editBtn = document.createElement('button');
        editBtn.textContent = 'Edit';
        editBtn.classList.add('btn', 'btn-secondary', 'btn-sm', 'ms-2');
        editBtn.addEventListener('click', () => {
          const newTitle = prompt('Edit title:', blog.title);
          const newContent = prompt('Edit content:', blog.snippet);

          if(newTitle && newContent) {
            fetch(`/api/blogs/${blog._id}`, {
              method: 'PUT',
              headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
              },
              body: JSON.stringify({title: newTitle, content: newContent})
            })
            .then(res => res.json())
            .then(data => {
              alert(data.message);
              loadBlogs();
            });
          }
        });
        div.querySelector('.card-body').appendChild(editBtn);
      }

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
  const role = e.target.role.value;

  try {
    const res = await fetch('/api/register', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({username, password, role})      // need to speicfy which role
    });
    const data = await res.json();
    alert(data.message);
    e.target.reset();
  } catch (error) {
    alert('registration failed');
    console.error(error);
  }
});

const loginForm = document.getElementById('login-form');
loginForm.addEventListener('submit', async (e)=> {
  e.preventDefault();
  const username = e.target.username.value;
  const password = e.target.password.value;
  try {
    const res = await fetch('/api/login', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({username, password})      // logind oesnt need role, ur alrdy the role
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
  } catch (error) {
    alert('Llgin error');
    console.error(error);
  }
});