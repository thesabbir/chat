// Created by sabbir on 12/19/13.
var greetings = {
    by : 'sever',
    greet : 'Welcome to awesome chat App'
};
function emo(mes) {
    var rep = {
        ':)' : '<img src="/similes/smile.gif" alt=":)"/>',
        'B|' : '<img src="/similes/cool.gif" alt="B|"/>',
        ':D' : '<img src="/similes/big_smile.gif" alt=":D"/>',
        ':\'(' : '<img src="/similes/crying.gif" alt=":\'("/>',
        'lol' : '<img src="/similes/lol.gif" alt="lol"/>',
        'LOL' : '<img src="/similes/lol2.gif" alt="B|"/>',
        ':|': '<img src="/similes/neutral.gif" alt=":|"/>',
        ':(' : '<img src="/similes/sad.gif" alt=":("/>',
        ':v' : '<img src="/similes/kidding.gif" alt=":v"/>',
        ':p' : '<img src="/similes/tongue.gif" alt=":p"/>',
        ':o' : '<img src="/similes/surprised.gif" alt=":o"/>',
        ';)' : '<img src="/similes/wink.gif" alt=";)"/>',
        ':@' : '<img src="/similes/angry.gif" alt=":@"/>'
    };
    for (var key in rep) {
        mes = mes.replace(key, rep[key]);
    }
    return mes;
}
var online = [];

module.exports = function (server) {

    var io = require('socket.io').listen(server);
    io.sockets.on('connection', function (socket) {
        socket.emit('greetings', greetings);

        socket.on('new message', function (message) {
            var nm = emo(message.body);
            io.sockets.emit('message', {
                main : message.from + " : " + nm,
                from : message.from
            });
        });
        socket.on('join', function (user) {
            var mes = 'Welcome ' + user.name + ' ! <br />';
            var ou = 'Online Users : ';
            online.push(user.name);
            online.forEach(function(d){
                ou += d + ", ";
            })
            io.sockets.emit('joined', mes + ou);
        });
        socket.on('leave', function (user) {
            online.splice(online.indexOf(user), 1);
            io.sockets.emit('left',  user +' left..');
        });
        socket.on('disconnect', function () {
           console.log('Disconnected Client..');

        });
    });

};