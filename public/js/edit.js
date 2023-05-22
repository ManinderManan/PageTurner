const blogEditForm = document.querySelector('#blogEditForm');
const blogTitle = document.getElementById('blogTitle');
const blogBody = document.getElementById('blogBody');
const deletePost = document.getElementById('deletePost');
const path = window.location.pathname;
const split = path.split('/');
    
const id = split[split.length - 1];


blogEditForm.addEventListener('submit', async (event)=>{
    event.preventDefault();
    var title = blogTitle.value.trim();
    var text = blogBody.value.trim();
    const response = await fetch ('/api/post/'+ id, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({title, text}),
  });
  if(response.ok){
        document.location.replace('/');
  }
  console.log(response); 
});