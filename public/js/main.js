const chatForm = document.getElementById('chat-form') // 4
const chatMessages = document.querySelector('.chat-messages') // 6
const roomName = document.getElementById('room-name'); // 21
const userList = document.getElementById('users'); //22

// Get username and room from URL (10)
const { username, room } = Qs.parse(location.search, {
  ignoreQueryPrefix: true
});

//console.log({ username, room });

const socket = io(); // (3)

// Join chatroom
socket.emit('joinRoom', { username, room }); // (11)

// Get room and users (19)
socket.on('roomUsers', ({ room, users }) => {
  outputRoomName(room);
  outputUsers(users);
});

//Message form server
socket.on('message', message => {
  console.log(message); // 4 khách hàng nhận thông điệp từ máy chủ
  outputMessage(message);

  // Scroll down (6)
  chatMessages.scrollTop = chatMessages.scrollHeight;
});

// Message submit (5)
chatForm.addEventListener('submit', e => {
  e.preventDefault();

  // Get message text
  const msg = e.target.elements.msg.value;

  // Emit message to server
  socket.emit('chatMessage', msg);

  // Clear input (6)
  e.target.elements.msg.value = '';
  e.target.elements.msg.focus();
});

//Output message to DOM
function outputMessage(message) {
  const div = document.createElement('div');
  div.classList.add('message');
  div.innerHTML = `<p class="meta"> ${message.username} <span>${message.time}</span></p>
  <p class="text">
    ${message.text} 
  </p>`;
  document.querySelector('.chat-messages').appendChild(div);
}

// Add room name to DOM (20)
function outputRoomName(room) {
  roomName.innerText = room; // 22
}

// Add users to DOM (20)
function outputUsers(users) {
  userList.innerHTML = ` 
    ${users.map(user => `<li>${user.username}</li>`).join('')}
  `; //22
}
