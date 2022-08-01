const loginButton = document.querySelector('#login-button')
const signupButton = document.querySelector('#signup-button')

const loginFormHandler = async (event) => {
    event.preventDefault(); 

    //collect values from login form 
    const username = document.querySelector('#username-login').value.trim(); //username?
    const password = document.querySelector('#password-login').value.trim();

    if (username && password) { //username?
        const response = await fetch('/api/users/login', { //references api > index > userRoutes
            method: 'POST',
            body: JSON.stringify({ username: username, password: password }),
            headers: {'Content-Type': 'application/json'}
        });

        if (response.ok) {
            // If successful, redirect the browser to the profile page
            document.location.replace('/profile');
          } else {
            alert(response.statusText);
          }
    }
}

const signupFormHandler = async (event) => {
  event.preventDefault();

  const username = document.querySelector('#username-signup').value.trim();
  // const email = document.querySelector('#email-signup').value.trim();
  const password = document.querySelector('#password-signup').value.trim();

  if(username && password) { //email
    const response = await fetch('/api/users', { //references api > index > userRoutes
      method: 'POST',
      body: JSON.stringify({ username:username, password: password}), //email
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      document.location.replace('/profile');
    } else {
      alert(response.statusText)
    }
  }
};

loginButton.addEventListener('click', loginFormHandler);
signupButton.addEventListener('click', signupFormHandler);

// document
//   .querySelector('.login-form')
//   .addEventListener('submit', loginFormHandler);

// document
//   .querySelector('.signup-form')
//   .addEventListener('submit', signupFormHandler);