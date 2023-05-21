const bookSubmit = document.getElementById('bookForm');
const bookTitle = document.getElementById('book_title');

bookSubmit.addEventListener('submit', async (event)=>{
    event.preventDefault();
    var title = bookTitle.value.trim();
    const response = await fetch ('/api/post', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({title}),
  });
  console.log(response);
     
});