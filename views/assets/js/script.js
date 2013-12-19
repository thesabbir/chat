$(document).ready(function() {
    var msg = $('.status');
var socket = io.connect('/');
var username = prompt('Your name :');
    if(username != '') {
        socket.emit('join', { message : username + ' Welcome !'})
    }
function cmsg() {
    msg.css('color', 'green');
    msg.html('Connected !');
    msg.fadeOut(500);
}
socket.on('greetings', function(message) {
    cmsg();
   $('.greetings').html(message.greet);

});
socket.on('left', function(message) {

    msg.html(message.message);
    msg.fadeIn();
    msg.fadeOut(1000);
});
socket.on('joined', function(message) {

    msg.html(message.message);
    msg.fadeIn();
    msg.fadeOut(100);
});

    socket.on('message', function(msg) {
    $('#box').append(msg.user + " : " + msg.body + '<br /> <br />');
});

$('.send').click(function(e) {
    e.preventDefault();
    var text = $('.msg').val();
    if(text == '') {
     return false;
    }
    $('.msg').val('');
    var message = {
        body : text,
        user : username,
        from : 'user'
    };
    socket.emit('new message', message);

});




socket.on('disconnect', function() {
    msg.css('color', 'red');
    msg.html('Disconnected !');
    msg.fadeIn(500);
});
});