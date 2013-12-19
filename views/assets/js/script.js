$(document).ready(function() {
    var msg = $('.status');
    var box = $('#box');
    var sound = $('#alert')[0];
var socket = io.connect('/');
var username = prompt('Your name :');
    if(username != '') {
        socket.emit('join', { name : username})
    }
function cmsg() {
    msg.css('color', 'green');
    msg.html('Connected !');
    msg.fadeOut(500);
}
function showbox(message) {
    box.append(message + '<br />');
    box.animate({ scrollTop: box.prop("scrollHeight") - box.height() + 100 }, 250);
}
socket.on('greetings', function(message) {
    cmsg();
   $('.greetings').html(message.greet);

});
socket.on('left', function(message) {
    showbox(message)
});
socket.on('joined', function(join) {

    showbox(join);
});

    socket.on('message', function(msg) {
        showbox(msg.main);
        if(msg.from !== username) {
        sound.play();}
});
    function sendmessage(e) {
        e.preventDefault();
        var text = $('.msg').val();
        if(text == '') {
            return false;
        }
        $('.msg').val('');
        var message = {
            body : text,
            from : username,
            by : 'user'
        };
        socket.emit('new message', message);
    }
$(document).keypress(function(e) {
        if(e.which == 13) {
           sendmessage(e);
        }
    });
$('.send').click(function(e) {
sendmessage(e)

});


$(window).unload(function() {
    socket.emit('leave', username);
})

socket.on('disconnect', function() {
    msg.css('color', 'red');
    msg.html('Disconnected !');
    msg.fadeIn(500);
});
});