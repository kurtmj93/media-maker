const userLoginForm = async function(event) {
  event.preventDefault();

  const usernameEl = document.querySelector('#login-username');
  const passwordEl = document.querySelector('#login-password');

  const response = await fetch('/api/users/login', {
    method: 'POST',
    body: JSON.stringify({
      username: usernameEl.value,
      password: passwordEl.value,
    }),
    headers: { 'Content-Type': 'application/json' },
  });

  if (response.ok) {
    document.location.reload();
  } else {
    alert('Your username or password may be incorrect.');
  }
};

document
  .querySelector('#login-form')
  .addEventListener('submit', userLoginForm);
