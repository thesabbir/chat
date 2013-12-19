// Created by sabbir on 12/19/13.
var greetings = {
    by : 'sever',
    greet : 'Welcome to awesome chat App'
};
module.exports = function (server) {
    var online = [];
    var io = require('socket.io').listen(server);
    io.sockets.on('connection', function (socket) {
        socket.emit('greetings', greetings);

        socket.on('new message', function (message) {
            io.sockets.emit('message', {
                main : message.from + " : " + message.body + '<br />',
                from : message.from,
                on : new Date()
            });
        });
        socket.on('join', function (user) {
            online.push(user);
            console.log(online);
            io.sockets.emit('joined', 'Welcome ' + user.name + ' !');
            console.log(user)
        });
        socket.on('leave', function (user) {
            io.sockets.emit('left',  user +' left..');
        });
        socket.on('disconnect', function () {
           console.log('Disconnected Client..');

        });
    });

};