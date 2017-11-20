var socket = io();
var people = [];

/** Dom stuff
 */

function addPeople(room){
    var peopleNode = document.querySelector('#people');
    peopleNode.innerHTML = '';
    for (var i in room){
        var li = document.createElement('li');
        li.innerHTML = room[i] + ' is connected.';
        peopleNode.appendChild(li);
    }
}

/** Sockets stuff
 */
socket.on('chat message', function(msg, id) {
    var li = document.createElement('li');
    li.innerHTML = id + ': ' + msg;
    messages.appendChild(li);
});

socket.on('join', function(room) {
    addPeople(room);
});

/** Event listeners
 */
if (document.querySelector('form')) {
    var form = document.querySelector('form');
    var input = document.querySelector('#m');
    var messages = document.querySelector('#messages');
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        console.log('Submit:', input.value);
        if (input.value) {
            socket.emit('chat message', input.value);
            input.value = '';
        }
        return false;
    });
}
