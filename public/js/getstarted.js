const getStartedBtn = document.querySelector('.btn-get-started')
const getStartedHandler = document.getElementById('hero');


getStartedBtn.addEventListener('click', function () {
    console.log('here');
    getStartedHandler.style.display = 'none';
    window.location.replace('/signup');
});