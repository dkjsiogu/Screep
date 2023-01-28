var roleSoilder = {
    run: function (creep) {
        var targets = new Array(Memory.names.length);
        for (var i = 0; i < Memory.names.length; i++) {
            targets[i] = Game.rooms[Memory.names[i]].find(FIND_HOSTILE_STRUCTURES);
        }
        
        for (var i = 0; i < Memory.names.length; i++) {
            if (targets[i].length>0) {
                if(creep.room!=Game.rooms[Memory.names[i]]){
                    creep.moveTo(new RoomPosition(25,25,Memory.names[i]));
                }
                if (creep.attack(targets[i][0]) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(targets[i][0], { visualizePathStyle: { stroke: '#ffffff' } });
                }
            }
        }
        
        /*target=Game.getObjectById('63a314fd37504f97aa3444de')
        if (creep.attack(target) == ERR_NOT_IN_RANGE) {
            creep.moveTo(target, { visualizePathStyle: { stroke: '#ffffff' } });
        }*/
    }
}

module.exports = roleSoilder;