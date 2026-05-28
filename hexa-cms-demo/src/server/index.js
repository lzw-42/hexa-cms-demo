const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: 'http://localhost:3000',
        methods: ['GET', 'POST']
    }
});

app.use(cors());
app.use(express.json());

mongoose.connect('mongodb://127.0.0.1:27017/hexa-cms')
    .then(() => console.log('MongoDB 已连接'))
    .catch(err => console.error('MongoDB 连接失败:', err));

app.set('io', io);

io.on('connection', (socket) => {
    console.log('新客户端已连接:', socket.id);
    socket.on('disconnect', () => {
        console.log('客户端已断开:', socket.id);
    });
});

const postsRouter = require('./routes/posts');
app.use('/api/posts', postsRouter);

const PORT = 5000;
server.listen(PORT, () => {
    console.log(`后端服务器运行在 http://localhost:${PORT}`);
});
