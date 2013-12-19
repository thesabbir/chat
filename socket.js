// Created by sabbir on 12/19/13.
var greetings = {
    from : 'sever',
    greet : 'Welcome to awesome chat App'
};
module.exports = function (server) {

    var io = require('socket.io').listen(server);
    io.sockets.on('connection', function (socket) {
        socket.emit('greetings', greetings);

        socket.on('new message', function (data) {
            io.sockets.emit('message', data);
        });
        socket.on('join', function (message) {
            io.sockets.emit('joined', message);
        });

        socket.on('disconnect', function () {
           console.log('Disconnected Client..');
            io.sockets.emit('left', { message : 'Some one left !'})
        });
    });

};