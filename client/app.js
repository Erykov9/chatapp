const socket = io();
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
    nickName(userName);
    socket.emit('login', userName);

    loginForm.classList.remove('show');
    messagesSection.classList.add('show');
  }
};

const nickName = (name) => {
  return name;
}

const botMessage = (nick) => {
  const li = document.createElement('li');
  li.classList.add('message');
  li.classList.add('message--received');

  li.innerHTML = `<h3 class="message__author">Chat Bot</h3>
  <div class="message__content">
    ${nick}
  </div>`

  messagesList.appendChild(li);
}


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

  let messageContent = messageContentInput.value;

  if(messageContentInput.value === '') {
    alert('You must write a message');
  } else {
    addMessage(userName, messageContent);
    socket.emit('message', { nick: userName, message: messageContent });
    messageContentInput.value = '';
  }
}

addMessageForm.addEventListener('submit', (e) => {
  sendMessage(e);
});

loginForm.addEventListener('submit', (e) => {
  login(e);
});

socket.on('login', ( name ) => nickName(name));
socket.on('message', ({ nick, message }) => addMessage(nick, message));
socket.on('botmsg', ( nick ) => botMessage(nick));