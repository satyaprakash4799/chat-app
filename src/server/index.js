const app = require('express')();
const http = require('http').createServer(app);

const io = require('socket.io')(http, {
    cors: {
        origin: "http://localhost:3000",
        // methods: ["GET", "POST"],
        credentails: true
    },
    // transport: ['websocket']
});

app.get('/', function(req, res){
    res.send('hello world');
})

io.on('connection', function(socket){
    socket.on('chat message', function(msg){
        io.emit('chat message', msg)
    })
})

http.listen(3001, function(){
    console.log(`Listening on port 3001`);
})