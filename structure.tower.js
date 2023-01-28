var structureTower = {
    run: function (tower) {
        var closestDamagedStructure = tower.pos.findClosestByRange(FIND_STRUCTURES, {
            //筛选：（建筑） => 建筑.血量 < 建筑.最大血量*0.8
            filter: (structure) => (structure.hits < structure.hitsMax) &&
                ((structure.structureType == STRUCTURE_ROAD) ||
                    (structure.structureType == STRUCTURE_CONTAINER))
        });
        //赋值 最近的敌人 = 塔.坐标.线性最近（所有不属于你的 creep）
        var closestHostile = tower.pos.findClosestByRange(FIND_HOSTILE_CREEPS);

        if (closestHostile) //最近敌人 为真
        {
            tower.attack(closestHostile); //塔.攻击.（最近敌人）
        }
        else if (closestDamagedStructure) //如果 最近受损建筑 为真
        {
            tower.repair(closestDamagedStructure); //塔.治疗.最近的受损建筑
        }

    }
};
module.exports = structureTower;