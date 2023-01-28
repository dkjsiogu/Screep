var roleRepair = {
    /** @param {Creep} creep **/
    run: function (creep) {
        tower = Game.getObjectById(tower_names[0])
        if (creep.memory.repairing && creep.store[RESOURCE_ENERGY] == 0) {
            creep.memory.repairing = false;
            creep.say('🔄 harvest');
        }

        if (!creep.memory.repairing && creep.store.getFreeCapacity() == 0) {
            creep.memory.repairing = true;
            creep.say('🚧 repair');
        }
        if (creep.room == Game.rooms['E18N25'] && creep.pos.isEqualTo(creep.pos.x, 49)) {
            creep.moveTo(Game.rooms['E18N25'].controller);
        }
        if (creep.room != Game.rooms['E18N25']) {
             creep.moveTo(new RoomPosition(25,25,'E18N25'));
        }
        else {
            if (creep.memory.repairing) {
                var target = Game.rooms['E18N25'].find(FIND_STRUCTURES, {
                    filter: (structure) => {
                        return (
                            ((structure.structureType == STRUCTURE_CONTAINER) ||
                                (structure.structureType == STRUCTURE_ROAD)
                            )
                            &&
                            (structure.hits < structure.hitsMax)
                        )
                    }
                });
                target.sort((a) => a.structureType == STRUCTURE_CONTAINER);
                if (target.length > 0) {
                    if (creep.repair(target[0]) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(target[0], { visualizePathStyle: { stroke: '#ffffff' } });
                    }

                    else {
                        creep.memory.repairing = false;
                    }
                }
            }

            else {
                var storage = Game.getObjectById('639e169d2f446ec4289e794b')
                var source = creep.pos.findClosestByPath(FIND_SOURCES)
                if (creep.harvest(source, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(source, { visualizePathStyle: { stroke: '#ffffff' } });
                }
            }
        }
    }
}
module.exports = roleRepair;