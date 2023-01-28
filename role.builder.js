var roleBuilder = {

	/** @param {Creep} creep **/
	run: function (creep) {

		if (creep.memory.building && creep.store[RESOURCE_ENERGY] == 0) {
			creep.memory.building = false;
			creep.say('🔄 harvest');
		}
		if (!creep.memory.building && creep.store.getFreeCapacity() == 0) {
			creep.memory.building = true;
			creep.say('🚧 build');
		}



		if (creep.room == Game.rooms['E18N25'] && creep.pos.isEqualTo(15, 49)) {
			creep.moveTo(Game.rooms['E18N25'].controller);
		}

		if (creep.memory.building) {
			/*var targets = new Array(Memory.names.length);
			for (var i = 0; i < Memory.names.length; i++) {
				targets[i] = Game.rooms[Memory.names[i]].find(FIND_CONSTRUCTION_SITES);
			}
			for (var i = 0; i < Memory.names.length; i++) {
				if (targets[i].length) {
					if (creep.room != Game.rooms[Memory.names[i]]) {
						creep.moveTo(new RoomPosition(25, 25, Memory.names[i]));
					}
					if (creep.build(targets[i][0]) == ERR_NOT_IN_RANGE) {
						creep.moveTo(targets[i][0], { visualizePathStyle: { stroke: '#ffffff' } });
					}

				}
			}*/

			var target=creep.pos.findClosestByRange(FIND_CONSTRUCTION_SITES)
				if (creep.build(target) == ERR_NOT_IN_RANGE) {
					creep.moveTo(target, { visualizePathStyle: { stroke: '#ffffff' } });
				}
		}
		else {
			if (creep.room == Game.rooms['E18N24']) {
				if (creep.withdraw(storage, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
					creep.moveTo(storage, { visualizePathStyle: { stroke: '#ffffff' } });
				}
			}

			else{
				var source = creep.pos.findClosestByPath(FIND_SOURCES)
				if(creep.harvest(source)==ERR_NOT_IN_RANGE){
					creep.moveTo(source)
				}
			}
		}

	}
};

module.exports = roleBuilder;