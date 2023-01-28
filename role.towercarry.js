roleTowerCarry={
    run:function(creep){
        if (creep.memory.carrying && creep.store[RESOURCE_ENERGY] == 0) {
            creep.memory.carrying = false;
            creep.say('🔄 harvest');
        }

        if (!creep.memory.carrying && creep.store.getFreeCapacity() == 0) {
            creep.memory.carrying = true;
            creep.say('🚀transport ')
        }

        if (!creep.memory.carrying) {
            if (creep.tr(targets[creep.memory.num], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                creep.moveTo(targets[creep.memory.num], { visualizePathStyle: { stroke: '#ffffff' } });
            }
        }
    }
}