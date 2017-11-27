var socket = io();
var people = [];


/** Dom stuff
 */

function addPeople(room) {
    // console.log(room);
    var peopleNode = document.querySelector('#people');
    peopleNode.innerHTML = '';
    for (var i in room) {
        console.log('Room: ', i, room[i].name);
        var li = document.createElement('li');
        li.innerHTML = room[i].name + ' is connected.';
        peopleNode.appendChild(li);
    }
}

function updateUserName(name) {
    var req = new XMLHttpRequest();
    req.open('GET', '/updatename/' + name, true);
    req.addEventListener('load', function() {
        if (req.status < 400) {
            console.log(req.responseText);
        }
    });
    req.send();
}

/** Sockets stuff
 */
socket.on('chat message', function(msg, name) {
    var li = document.createElement('li');
    li.innerHTML = name + ': ' + msg;
    messages.appendChild(li);
});

socket.on('join', function(data) {
    addPeople(data.room); // creates list of people in the room
});

/** Event listeners
 */
if (document.querySelector('form')) {
    var form = document.querySelector('form');
    var input = document.querySelector('#m');
    var messages = document.querySelector('#messages');
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        if (input.value) {
            socket.emit('chat message', input.value);
            input.value = '';
        }
        return false;
    });
}

if (document.querySelector('#user-field')) {
    var field = document.querySelector('#user-field');
    var changeButton = document.querySelector('#update-user-button');
    var saveButton = document.querySelector('#save-name');
    changeButton.addEventListener('click', function(e) {
        e.preventDefault();
        field.readOnly = false;
        field.value = '...';
        field.select();
        field.focus();
        saveButton.classList.remove('hidden');
        this.classList.add('hidden');
    });
    saveButton.addEventListener('click', function(e) {
        e.preventDefault();
        updateUserName(field.value);
        field.readOnly = true;
        field.blur();
        changeButton.classList.remove('hidden');
        this.classList.add('hidden');
    });
}
