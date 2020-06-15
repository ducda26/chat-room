// npm run dev
const path = require('path'); //(1) Dẫn đến thư mục font-end
const http = require('http'); //(2) Khởi tạo server
const express = require('express'); 
const socketio = require('socket.io'); //(3) Khởi tạo socket.io (kiểm tra phần chat.html và main.js)

const app = express();
const server = http.createServer(app); //(2) Khởi tạo server
const io = socketio(server);
// Set static folder
app.use(express.static(path.join(__dirname, 'public'))); //(1) Dẫn đến thư mục font-end

// Run when client connects
io.on('connection', socket => {
    //console.log('New WS Connection...'); chủ yếu để check
    
    // Welcome current user
    socket.emit('message', 'Welcome to ChatCord!') //(4) gửi thông điệp cho khách hàng
    
    // Broadcast when a user connects (4)
    socket.broadcast.emit('message','A user has joined the chat')

    // Runs when client disconnects
    socket.on('disconnect', () => {
        io.emit('message', 'A user has left the chat');
    });

    socket.on('chatMessage', msg => { //(5)
        // const user = getCurrentUser(socket.id);
        console.log(msg);      
        io.emit('message', msg);
      });
});

const PORT = 3000 || process.env.PORT;

server.listen(PORT, () => { //đổi app thành server
console.log(`Server running on port ${PORT}`);
});