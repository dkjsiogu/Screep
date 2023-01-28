roleMineral = {
    run: function (creep) {
        if (creep.memory.harvesting && creep.store[RESOURCE_OXYGEN] == 0) {
            creep.memory.harvesting = false;
            creep.say('🔄 harvest');
        }

        if (!creep.memory.harvesting && creep.store.getFreeCapacity(RESOURCE_OXYGEN) == 0) {
            creep.memory.harvesting = true;
            creep.say('🚀mineral')
        }

        if (creep.memory.harvesting) {
            if (creep.transfer(storage, RESOURCE_OXYGEN) == ERR_NOT_IN_RANGE) {
                creep.moveTo(storage)
            }
        }
        else {
            var extractor = Game.getObjectById('5bbcb37440062e4259e943eb')
            if (creep.harvest(extractor) == ERR_NOT_IN_RANGE) {
                creep.moveTo(extractor)
            }
        }
    }
}
module.exports = roleMineral;