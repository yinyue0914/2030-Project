document.getElementById('blog-form').addEventListener('submit', async (e) => {
  e.preventDefault();

  const title = e.target.title.value;
  const content = e.target.content.value;

  const response = await fetch('/api/blogs', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ title, content })
  });

  const data = await response.json();
  alert(data.message);
});
