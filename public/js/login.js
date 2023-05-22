console.log('here'); // this logs
const loginBtn = document.querySelector("#loginBtn");
const loginFormHandler = async (event) => {
  console.log("hit function")
  event.preventDefault();

  const username = document.querySelector('#username-login').value.trim();
  const password = document.querySelector('#password-login').value.trim();
  console.log({username, password})

  if (username && password) {
    const response = await fetch('/api/users/login', {
      method: 'POST',
      body: JSON.stringify({ username, password }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      console.log({response})
      document.location.replace('/dashboard');
    } else {
      alert('Failed to log in');
    }
  } 
};

document
  .querySelector('#loginBtn')
  .addEventListener('click', loginFormHandler);
