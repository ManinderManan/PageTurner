const blogSubmit = document.getElementById('bookForm');
const blogTitle = document.getElementById('bookTitle');
const blogBody = document.getElementById('bookBody');


blogSubmit.addEventListener('submit', async (event)=>{
    event.preventDefault();
    var title = bookTitle.value.trim();
    var text = bookBody.value.trim();
    const response = await fetch ('/api/post', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({title, text}),
  });
  console.log(response);
    
    
});