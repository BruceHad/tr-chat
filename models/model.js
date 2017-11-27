var model = {}; 

// Tables
var rooms = {}; // e.g. {roomId: [userId, ]
var users = {}; // e.g. {userId: {name:,}

model.getUser = function(userId) {
    // Get user details (or create them if user doesn't exist)
    if (!(userId in users)) users[userId] = { id: userId, name: userId };
    return users[userId];
};

model.updateUserName = function(userId, name){
    // console.log(userId, name, users[userId]);
    users[userId].name = name;
    console.log(users[userId]);
};

model.joinRoom = function(room, userId) {
    // Add new connection to room
    if (room in rooms) {
        rooms[room].push(model.getUser(userId));
    }
    else {
        rooms[room] = [model.getUser(userId), ];
    }
    console.log('Model rooms', rooms);
};

model.getRoom = function(room) {
    return rooms[room];
};

model.inRoom = function(roomId, userId) {
    if (!rooms[roomId]) return false;
    var room = rooms[roomId];
    for (var i in room){
        if(room[i].id  === userId) return true;
    }
    return false;
};

module.exports = model;
