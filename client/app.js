const loginForm = document.querySelector('#welcome-form');
const messagesSection = document.querySelector('#messages-section');
const messagesList = document.querySelector('#messages-list');
const addMessageForm = document.querySelector('#add-messages-form');
const userNameInput =  document.querySelector('#username');
const messageContentInput = document.querySelector('#message-content');

let userName = '';

const login = (e) => {
  e.preventDefault();

  if(userNameInput.value === '') {
    alert('Field cannot be empty!');
  } else {
    userName = userNameInput.value;

    loginForm.classList.remove('show');
    messagesSection.classList.add('show');
  }
};

const addMessage = (nick, message) => {
  const li = document.createElement('li');
  li.classList.add('message');
  li.classList.add('message--received');

  if(nick === userName) {
    li.classList.add('message--self');
  }

  li.innerHTML = `<h3 class="message__author">${nick === userName ? 'You' : nick}</h3>
  <div class="message__content">
    ${message}
  </div>`

  messagesList.appendChild(li);
};

const sendMessage = (e) => {
  e.preventDefault();

  if(messageContentInput.value === '') {
    alert('You must write a message');
  } else {
    addMessage(userName, messageContentInput.value);
    messageContentInput.value = '';
  }
}

addMessageForm.addEventListener('submit', (e) => {
  sendMessage(e);
});

loginForm.addEventListener('submit', (e) => {
  login(e);
});