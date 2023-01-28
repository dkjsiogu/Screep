var roleHarvester = {

    /** @param {Creep} creep **/
    run: function (creep) {
        if (creep.memory.harvesting && creep.store[RESOURCE_ENERGY] == 0) {
            creep.memory.harvesting = false;
            creep.say('🔄 harvest');
        }

        if (!creep.memory.harvesting && creep.store.getFreeCapacity() == 0) {
            creep.memory.harvesting = true;
            creep.say('🚀transport')
        }

        if (!creep.memory.harvesting) {
            if(link.store[RESOURCE_ENERGY] >0){
            if (creep.withdraw(link, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                creep.moveTo(link, { visualizePathStyle: { stroke: '#ffffff' } });
            }}
            else{
                if(creep.withdraw(storage,RESOURCE_ENERGY)==ERR_NOT_IN_RANGE){
                    creep.moveTo(storage, { visualizePathStyle: { stroke: '#ffffff' } });
                }
            }
            // var sources=creep.room.find(RESOURCE_ENERGY)
            // if(creep.harvest(sources[0])==ERR_NOT_IN_RANGE){
            //     creep.moveTo(sources[0])
            // }
        }
        else {
            var targets = creep.room.find(FIND_STRUCTURES, {
                filter: (structure) => {
                    return (structure.structureType == STRUCTURE_TOWER ||
                        structure.structureType == STRUCTURE_EXTENSION) &&
                        structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0 //&&
                        //structure.pos.y > 35
                }
            });
            if (targets.length > 0) {
                if (creep.transfer(targets[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(targets[0], { visualizePathStyle: { stroke: '#ffffff' } });
                }
            }

            else {
                if (creep.transfer(scContainer, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(scContainer, { visualizePathStyle: { stroke: '#ffffff' } });
                }
            }
        }
    }
};

module.exports = roleHarvester;