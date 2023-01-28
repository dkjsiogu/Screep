const { get } = require("lodash");

var roleCarry = {
    run: function (creep) {
        if (creep.memory.carrying && creep.store[RESOURCE_ENERGY] == 0) {
            creep.memory.carrying = false;
            creep.say('🔄 harvest');
        }

        if (!creep.memory.carrying && creep.store.getFreeCapacity() == 0) {
            creep.memory.carrying = true;
            creep.say('🚀transport ')
        }
        var targets = Game.rooms[creep.memory.nRoom].find(FIND_STRUCTURES,
            {
                filter: (structure) =>
                    (structure.structureType == STRUCTURE_CONTAINER)
            });
        if (!creep.memory.carrying) {
            if (creep.withdraw(targets[creep.memory.num], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                creep.moveTo(targets[creep.memory.num], { visualizePathStyle: { stroke: '#ffffff' } });
            }
        }
        else {
            var tower = Game.getObjectById('639e40c9056d458e29c16427')
            if (tower.store.getFreeCapacity(RESOURCE_ENERGY) > 0) {

                if (creep.transfer(tower, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(tower);
                }
            }
            else {
                if (creep.transfer(storage, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(storage);
                }
            }
        }
    }
}

module.exports = roleCarry;