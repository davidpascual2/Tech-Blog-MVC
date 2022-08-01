// const logout = document.querySelector('#signup-button')
console.log("hello!!")
const logout = async (event) => {
    event.preventDefault(); 
    console.log('clicked')
    const response = await fetch('/api/users/logout', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
    });
    console.log("hello 2")
    if (response.ok) {
      document.location.replace('/');
    } else {
      alert(response.statusText);
    }
  };

//   logout.addEventListener('click', logout)
  document.querySelector('#logout').addEventListener('click', logout);