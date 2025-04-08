document.getElementById('blog-form').addEventListener('submit', async (e) => {
    e.preventDefault();
  
    const title = e.target.title.value;
    const content = e.target.content.value;
  
    try {
      const response = await fetch('/api/blogs', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({title, content})
      });
  
      const result = await response.json();
      alert(result.message);
      e.target.reset();
    } catch(error) {
      alert('Error creating blog post.');
      console.error(error);
    }
  });  

  // register
document.getElementById('register-form').addEventListener('submit', async (e) => {
  e.preventDefault();
  const form = e.target;
  const username = form.username.value;
  const password = form.password.value;
  const role = form.role.value;

  try{
      const res = await fetch('/api/register', {
          method: 'POST',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({username, password, role})
      });

      const data = await res.json();
      alert(data.message);
      form.reset();
  }catch(error) {
      alert('registration failed');
      console.error(error);
  }
});

// login
document.getElementById('login-form').addEventListener('submit', async(e) => {
  e.preventDefault();
  const form = e.target;
  const username = form.username.value;
  const password = form.password.value;

  const res = await fetch('/api/login', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({username, password})
  });

  const data = await res.json();

  if(res.ok) {
      alert('Login successful!');
      localStorage.setItem('token', data.token);
  } else {
      alert(data.message || 'Login failed');
  }

  form.reset();
});
