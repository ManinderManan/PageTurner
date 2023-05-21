console.log('here');
const signUpBtn = document.querySelector("#signUpBtn");
const signUpFormHandler = async (event) => {
console.log("hit function")
  event.preventDefault();

  const username = document.querySelector('#username-signup').value.trim();
  const password = document.querySelector('#password-signUp').value.trim();
  console.log({username, password})

  if (username && password) {
    const response = await fetch('/api/users/signup', {
      method: 'POST',
      body: JSON.stringify({ username, password }),
      headers: { 'Content-Type': 'application/json' },
    });


    if (response.ok) {
      console.log({response})
      document.location.replace('/');
    } else {
      alert('Failed to log in');
    }
  }
};

document
  .querySelector('#signUpBtn')
  .addEventListener('click', signUpFormHandler);
