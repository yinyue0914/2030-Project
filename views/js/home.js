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
        body: JSON.stringify({ title, content })
      });
  
      const result = await response.json();
      alert(result.message);
      e.target.reset();
    } catch (err) {
      alert('Error creating blog post.');
      console.error(err);
    }
  });  