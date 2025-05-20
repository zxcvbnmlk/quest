const express = require('express')
const app = express();
const bodyParser = require('body-parser');
const http = require('http');
const index = http.Server(app);
let apiRoutes = express.Router();


apiRoutes.use((req, res, next) => { //allow cross-origin requests

    res.header("Access-Control-Allow-Methods",  "*");

    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Content-Type", "text/html; charset=utf-8");
    next();
});

// Parsers
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false}));

app.use('/api', apiRoutes);



// Send all other requests to the Angular app
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'dist/index.html'));
});



apiRoutes.post('/auth', (req, res) => {
    const random = Math.floor(Math.random() * 111111111111111111111111111111);
    res.send({
        username: req.body.username,
        token: random
    });
})

const io = require("socket.io")(index, {
    cors: {
        origin: "http://localhost:5173",
        methods: ["GET", "POST"],
        allowedHeaders: ["my-custom-header"],
        credentials: true
    }
});
const port = process.env.PORT || 3000;
const msgs = [];
let users = [];


io.on('connection', (socket) => {
    socket.join("room1");
    socket.on('message', (message) => {
        const msg = {
            token: socket.handshake.query.token,
            username: socket.handshake.query.username,
            text: message,
            date: (new Date).toLocaleTimeString()
        }
        io.emit('message', msg);
        msgs.push(msg)
    });


    users = [];
    for (let [id, socket] of io.of("/").sockets) {
        if (!users.find(item => item.username === socket.handshake.query.username
        )) {
            users.push({
                userID: id,
                username: socket.handshake.query.username,
                token: socket.handshake.query.token
            });
        }
    }
    io.emit("messageAll", msgs);
    io.emit("users", users);


    socket.on('disconnect', () => {
        users = users.filter(item => item.token !== socket.handshake.query.token);
        io.emit("users", users);
    });

});

index.listen(port, () => {
    console.log(`started on port: ${port}`);
});


