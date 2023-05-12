console.log('here');
const signUpBtn = document.querySelector("#signUpBtn");
const signUpFormHandler = async (event) => {
  event.preventDefault();

  const email = document.querySelector('#email-signUp').value.trim();
  const password = document.querySelector('#password-signUp').value.trim();

  if (email && password) {
    const response = await fetch('/api/signup', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      document.location.replace('/');
    } else {
      alert('Failed to log in');
    }
  }
};

document
  .querySelector('#signUpForm')
  .addEventListener('submit', signUpFormHandler);
