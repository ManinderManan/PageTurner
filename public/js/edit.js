const blogEditForm = document.querySelector('#blogEditForm');
const postTitle = document.getElementById('postTitle');
const postBody = document.getElementById('postBody');
const deletePost = document.getElementById('deletePost');
const path = window.location.pathname;
const split = path.split('/');
    
const id = split[split.length - 1];


blogEditForm.addEventListener('click', async (event)=>{
    event.preventDefault();
    var title = blogTitle.value.trim();
    var text = blogBody.value.trim();
    const response = await fetch ('/api/edit/'+ id, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({title, text}),
  });
  if(response.ok){
        document.location.replace('/');
  }
  console.log(response); 
});