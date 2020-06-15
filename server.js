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
    console.log('New WS Connection...');
});

const PORT = 3000 || process.env.PORT;

server.listen(PORT, () => { //đổi app thành server
console.log(`Server running on port ${PORT}`);
});