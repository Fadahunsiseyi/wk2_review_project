console.log('object')
const firstName = document.getElementById('firstName').value
const email = document.getElementById('email').value
const password = document.getElementById('password').value
const formContainer = document.querySelector('.formContainer')

var myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");

var raw = JSON.stringify({
  "first_name": firstName,
  "password": password,
  "email": email
});

var requestOptions = {
  method: 'POST',
  headers: myHeaders,
  body: raw,
  redirect: 'follow'
};

fetch("https://localhost:5000/signup", requestOptions)
  .then(response => response.text())
  .then(result => console.log(result))
  .catch(error => console.log('error', error));