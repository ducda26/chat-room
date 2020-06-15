const chatForm = document.getElementById('chat-form') // 4
const chatMessages = document.querySelector('.chat-messages') // 6

const socket = io(); // (3)

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
  div.innerHTML = `<p class="meta"> Anh Đức <span> 4:16pm</span></p>
  <p class="text">
    ${message}
  </p>`;
  document.querySelector('.chat-messages').appendChild(div);
}