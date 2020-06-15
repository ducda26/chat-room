// npm run dev
const path = require('path'); //(1) Dẫn đến thư mục font-end
const http = require('http'); //(2) Khởi tạo server
const express = require('express'); 
const socketio = require('socket.io'); //(3) Khởi tạo socket.io (kiểm tra phần chat.html và main.js)
const formatMessage = require ('./utils/messages'); (7)

const app = express();
const server = http.createServer(app); //(2) Khởi tạo server
const io = socketio(server);
// Set static folder
app.use(express.static(path.join(__dirname, 'public'))); //(1) Dẫn đến thư mục font-end

const botName = 'Chat Room Anh Duc'; // (8)

// Run when client connects
io.on('connection', socket => {
    //console.log('New WS Connection...'); chủ yếu để check
    
    // Welcome current user
    socket.emit('message', formatMessage(botName, 'Welcome to ChatCord!')); // (8)
    //socket.emit('message', 'Welcome to ChatCord!') //(4) gửi thông điệp cho khách hàng
    
    // Broadcast when a user connects (4)
    socket.broadcast.emit('message',formatMessage(botName, 'A user has joined the chat')); //(9)

    // Runs when client disconnects
    socket.on('disconnect', () => {
        io.emit('message', formatMessage(botName, 'A user has left the chat'));  //(9)
    });

    socket.on('chatMessage', msg => { //(5)
        // const user = getCurrentUser(socket.id);
       // console.log(msg);      
        io.emit('message', formatMessage('USER', msg)); //(9)
      });
});

const PORT = 3000 || process.env.PORT;

server.listen(PORT, () => { //đổi app thành server
console.log(`Server running on port ${PORT}`);
});