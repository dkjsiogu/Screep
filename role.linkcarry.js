const { transform } = require("lodash");

var roleLinkcarry = {
    run: function (creep) {
        if (creep.memory.linking && creep.store[RESOURCE_ENERGY] == 0) {
            creep.memory.linking = false;
            creep.say('🔄 harvest');
        }
        if (!creep.memory.linking && creep.store.getFreeCapacity() == 0) {
            creep.memory.linking = true;
            creep.say('🚀link')
        }
        if (creep.memory.linking) {

            if (spawnlink.store.getFreeCapacity(RESOURCE_ENERGY) > 0) {
                creep.transfer(spawnlink, RESOURCE_ENERGY)
            }

            else {
                if (spawn_1.store.getFreeCapacity(RESOURCE_ENERGY) > 0) {
                    creep.transfer(spawn_1, RESOURCE_ENERGY)
                }
                else {
                    if (creep.store.getFreeCapacity(RESOURCE_ENERGY) > 0) {
                        linking = false
                    }
                }

            }

        }
        else {
            var terminal=Game.getObjectById('63a93d7356dfce7813ceb0dc')
            if (terminal.store[RESOURCE_ENERGY] > 0) {
                creep.withdraw(terminal, RESOURCE_ENERGY)
            }
            else {
                creep.withdraw(storage, RESOURCE_ENERGY)
            }
        }
    }
};
module.exports = roleLinkcarry;