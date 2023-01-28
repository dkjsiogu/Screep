
var roleRealHarvester = {

    run: function (creep) {
        var targets = creep.room.find(FIND_STRUCTURES, {
            filter: (structure) => (structure.structureType == STRUCTURE_CONTAINER)
        });
        if (!creep.pos.isEqualTo(targets[creep.memory.num].pos)) {
            creep.moveTo(targets[creep.memory.num]);
        }
        else {
            var target = creep.pos.findClosestByRange(FIND_SOURCES);
            creep.harvest(target);
        }
    }
};

module.exports = roleRealHarvester;