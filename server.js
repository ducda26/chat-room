// npm run dev
const path = require('path'); //(1) Dẫn đến thư mục font-end
const http = require('http'); //(2) Khởi tạo server
const express = require('express'); 
const socketio = require('socket.io'); //(3) Khởi tạo socket.io (kiểm tra phần chat.html và main.js)
const formatMessage = require ('./utils/messages');// (7)
const {
    userJoin,
    getCurrentUser
  } = require('./utils/users'); // (13)


const app = express();
const server = http.createServer(app); //(2) Khởi tạo server
const io = socketio(server);
// Set static folder
app.use(express.static(path.join(__dirname, 'public'))); //(1) Dẫn đến thư mục font-end

const botName = 'Chat Room Anh Duc'; // (8)

// Run when client connects
io.on('connection', socket => {
    //console.log('New WS Connection...'); chủ yếu để check
    socket.on('joinRoom', ({ username, room }) => { // (12)
        const user = userJoin(socket.id, username, room); //(14)

        socket.join(user.room); //(14))

        // Welcome current user
        socket.emit('message', formatMessage(botName, 'Welcome to ChatCord!')); // (8)
    //socket.emit('message', 'Welcome to ChatCord!') //(4) gửi thông điệp cho khách hàng
    
    // Broadcast when a user connects (4)
    socket.broadcast
    .to(user.room) // (15)
    .emit('message',
    formatMessage(botName, `${user.username} has joined the chat`)); //(15)
    // formatMessage(botName, 'A user has joined the chat')); //(9)
    });


    // Listen for chatMessage
    socket.on('chatMessage', msg => { //(5)
        // const user = getCurrentUser(socket.id);
       // console.log(msg);      
        io.emit('message', formatMessage('USER', msg)); //(9)
      });

     // Runs when client disconnects
     socket.on('disconnect', () => {
        io.emit('message', 
        formatMessage(botName, `${user.username} has left the chat`));  //(9)
        //formatMessage(botName, 'A user has left the chat'));  //(9)
    });
});

const PORT = 3000 || process.env.PORT;

server.listen(PORT, () => { //đổi app thành server
console.log(`Server running on port ${PORT}`);
});