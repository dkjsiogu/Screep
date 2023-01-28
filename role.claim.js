var roleClaim = {
    run: function (creep) {
        if (creep.room != Game.rooms['E18N25']) {
            creep.moveTo(new RoomPosition(25,25,'E18N25'));
        }

        else {
            if (creep.reserveController(creep.room.controller) == ERR_NOT_IN_RANGE) {
                creep.moveTo(creep.room.controller);
            }
        }
    }
}
module.exports = roleClaim;