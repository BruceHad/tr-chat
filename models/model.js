var rooms = {};
var model = {};
model.joinRoom = function(room, id){
    // Add new connection to room
    
    if(room in rooms){
        rooms[room].push(id);
    }
    else {
        rooms[room] = [id,];
    }
};

model.getRoom = function(room){
    return rooms[room];
};

module.exports = model;