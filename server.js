var express = require('express');
var app = express();
var module = require('module_name');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var http = require('http').Server(app);
var io = require('socket.io')(http);
const { sendStatus } = require('express/lib/response');
var dbUrl = 'mongodb://thytran:' //create an mlab account

app.use(express.static(__dirname)); //tell express that we use static file
app.use(bodyParser.json());
app.use(bodyParser, urlencoded({ extended: false }))


var Message = mongoose.model('Message', { name: String, message: String }) //message model

var server = app.listen(3000, () => {
    console.log('server is running on port', server.address().port);
});

//Get method route: get message from database
app.get('/messages', (req, res) => {
    Message.find({}, (err, messages) => {
        res.send(messages)
    })
})

//Post method route: post new massages created by the user to database
app.post('/messages', (req, res) => {
    var massage = new Message(req.body);
    message.save((err) => {
        if (err)
            sendStatus(500);
        io.emit('message', req.body);
        res.sendStatus(200);
    })
})

//Create a connection
io.on('connection', () => {
    console.log('a user is connected')
})

mongoose.connect(dbUrl, { useMongoClient: true }, (err) => {
    console.log('mongodb connected', err);
})

var server = http.listen(3001, () => {
    console.log('server is running on port', server.address().port);
})