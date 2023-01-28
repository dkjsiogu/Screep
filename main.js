var roleHarvester = require('role.harvester');
var roleUpgrader = require('role.upgrader');
var roleBuilder = require('role.builder');
var roleRepair = require('role.repair');
var roleCarry = require('role.carry');
var roleRealHarvester = require('role.realharvester');
var roleClaim = require('role.claim');
var roleSoilder = require('role.soilder');
var roleLinkcarry = require('role.linkcarry')
var StructureTower = require('structure.tower')
var roleMineral = require('role.mineral')
const { restParam } = require('lodash');
Memory.Structures = {
    [STRUCTURE_TOWER]: 1,
    [STRUCTURE_SPAWN]: 2,
    [STRUCTURE_EXTENSION]: 3,
}
module.exports.loop = function () {
    //Memory.Rooms = { 'E18N24': { 'Bnums_Carry': [0, 0], 'Bnums_Rharvester': [0, 0] }/*'E18N23':{'Bnums_Carry':[1,1],'Bnums_Rharvester':[1,1]}*/ }
    var orders=Game.market.getAllOrders({type: ORDER_SELL, resourceType: RESOURCE_ENERGY});
    Memory.names = Object.getOwnPropertyNames(Memory.Rooms);
    var tower_names = ["6399c85f42482f6a745ded64", "639e40c9056d458e29c16427"];
    var storage = Game.getObjectById('639e169d2f446ec4289e794b')
    var spawnlink = Game.getObjectById('63a41e24afdebed0d9a1396c')
    var link = Game.getObjectById('63a446203c40345ca610ab20')
    var linkgrader=Game.getObjectById('63aaf0328e4bcf84b42909b8')
    var scContainer = Game.getObjectById('63a4508ecd98a81117b5e1bd')
    var spawn_1 = Game.getObjectById('638c45b87f0d513978d738ee')
    var terminal=Game.getObjectById('63a93d7356dfce7813ceb0d')
    var oxygen=Game.getObjectById('5bbcb37440062e4259e943eb')
    global.storage = storage
    global.tower_names = tower_names
    global.spawnlink = spawnlink
    global.link = link
    global.linkgrader=linkgrader
    global.scContainer = scContainer
    global.spawn_1 = spawn_1
    global.terminal=terminal
    // if(storage.store[RESOURCE_ENERGY]<300000){
    //     var a=orders.sort((a,b)=>a['price']-b['price'])
    //     Game.market.deal(orders[0]['id'],5000)
    // }
    if(linkgrader.store[RESOURCE_ENERGY]==0){
    spawnlink.transferEnergy(linkgrader)}
    else{
        spawnlink.transferEnergy(link)
    }
    if (Game.cpu.bucket == 10000) {
        Game.cpu.generatePixel();
    }

    for (let tower_name of tower_names) {
        var tower = Game.getObjectById(tower_name); //找到塔的ID
        if (tower) {
            StructureTower.run(tower);
        }

    }
    for (var name in Memory.creeps) {
        if (!Game.creeps[name]) {
            if (Memory.creeps[name].role == 'carry') {
                Memory.Rooms[Memory.creeps[name].nRoom].Bnums_Carry[Memory.creeps[name].num] = 1;
            }
            if (Memory.creeps[name].role == 'realharvester') {
                Memory.Rooms[Memory.creeps[name].nRoom].Bnums_Rharvester[Memory.creeps[name].num] = 1;
            }
            delete Memory.creeps[name];
            console.log('Clearing non-existing creep memory:', name);
        }
    }
    /*if(Game.creeps['1'].pull(Game.creeps['SpawnLinkCarry']) == ERR_NOT_IN_RANGE) {
        Game.creeps['1'].moveTo(Game.creeps['SpawnLinkCarry']);
    } 
    else {
        Game.creeps['SpawnLinkCarry'].move(Game.creeps['1']);
        if(Game.creeps['1'].pos.isNearTo(Game.creeps['SpawnLinkCarry'])) {
            Game.creeps['1'].moveTo(5,26);
            
        } else {
            Game.creeps['1'].move(Game.creeps['1'].pos.getDirectionTo(Game.creeps['SpawnLinkCarry']));
        }
    }*/

    var harvesters = _.filter(Game.creeps, (creep) => creep.memory.role == 'harvester');
    var upgraders = _.filter(Game.creeps, (creep) => creep.memory.role == 'upgrader');
    var builders = _.filter(Game.creeps, (creep) => creep.memory.role == 'builder');
    var repairs = _.filter(Game.creeps, (creep) => creep.memory.role == 'repair')
    var carrys = _.filter(Game.creeps, (creep) => creep.memory.role == 'carry')
    var Rharvesters = _.filter(Game.creeps, (creep) => creep.memory.role == 'realharvester')
    var claims = _.filter(Game.creeps, (creep) => creep.memory.role == 'claim')
    var soilders = _.filter(Game.creeps, (creep) => creep.memory.role == 'soilder')
    var minerals = _.filter(Game.creeps, (creep) => creep.memory.role == 'mineral')
    //console.log('Harvesters: ' + harvesters.length);
    //console.log('Upgraders:'+upgraders.length);
    //console.log('Builders:'+builders.length);
    //console.log('Repair:'+repairs.length);
    //console.log(carrys.length);
    if (harvesters.length < 2) {
        var newName = 'Harvester' + Game.time;
        if (Game.spawns['Spawn1'].spawnCreep([CARRY, CARRY, CARRY, CARRY, MOVE, MOVE], newName,
            { memory: { role: 'harvester', harvesting: false } }) == OK) {
            console.log('Spawning new harvester: ' + newName);
        }
    }


    if (upgraders.length < 2) {
        var newName = 'Upgraders' + Game.time;
        if (Game.spawns['Spawn1'].spawnCreep([WORK, CARRY, MOVE, WORK, CARRY, MOVE, WORK, CARRY, MOVE, WORK, CARRY, MOVE, WORK, CARRY, MOVE], newName,
            { memory: { role: 'upgrader', upgrading: false } }) == OK) {
            console.log('Spawning new upgrader: ' + newName);
        }
    }
    if (builders.length < 1) {
        var newName = 'Builders' + Game.time;
        if (Game.spawns['Spawn1'].spawnCreep([WORK, WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE], newName,
            { memory: { role: 'builder', building: false } }) == OK) {
            console.log('Spawning new builder: ' + newName);
        }
    }

    if (Memory.linkcarry == 1) {
        Memory.linkcarry = 0
        Game.spawns['Spawn1'].spawnCreep([CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY], 'SpawnLinkCarry',
            { memory: { role: 'linkcarry' } }, TOP_LEFT)
    }

    if (repairs.length < 0) {
        var newName = 'Repair' + Game.time;
        if (Game.spawns['Spawn1'].spawnCreep([WORK, WORK, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE], newName,
            { memory: { role: 'repair', repairing: false } }) == OK) {
            console.log('Spawing new repair:' + newName);
        }
    }

    if (carrys.length < 2) {
        var newName = 'Carry' + Game.time;
        for (let room of Memory.names) {
            for (var i = 0; i < 2; i++) {
                if (Memory.Rooms[room].Bnums_Carry[i] == 1) {
                    if (Game.spawns['Spawn1'].spawnCreep([CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE], newName,
                        { memory: { role: 'carry', carrying: false, num: i, nRoom: room } }) == OK) {
                        console.log('Spawning new carry:' + newName);
                        Memory.Rooms[room].Bnums_Carry[i] = 0;
                    }
                    break;
                }
            }
        }
    }

    if (Rharvesters.length < 2) {
        var newName = 'Rh' + Game.time;
        for (let room of Memory.names) {
            for (var i = 0; i < 2; i++) {
                if (Memory.Rooms[room].Bnums_Rharvester[i] == 1) {
                    if (Game.spawns['Spawn1'].spawnCreep([WORK, WORK, WORK, WORK, WORK, MOVE, MOVE, MOVE, MOVE, MOVE], newName,
                        { memory: { role: 'realharvester', num: i, nRoom: room } }) == OK) {
                        console.log('Spawning new :' + newName);
                        Memory.Rooms[room].Bnums_Rharvester[i] = 0;
                    }
                    break;
                }
            }
        }
    }

    if (minerals.length < 0&&oxygen.mineralAmount!=0) {
        var newName = 'mineral' + Game.time;
        if (Game.spawns['Spawn1'].spawnCreep([WORK, WORK, WORK, WORK,WORK,WORK,CARRY, CARRY, MOVE, MOVE, MOVE, MOVE], newName,
            { memory: { role: 'mineral' } }) == OK) {
            console.log('Spawing new mineral:' + newName);;
        }
    }

    if (claims.length < 0) {
        var newName = 'claim' + Game.time;
        if (Game.spawns['Spawn1'].spawnCreep([CLAIM, CLAIM,MOVE,MOVE], newName,
            { memory: { role: 'claim' } }) == OK) {
            console.log('Spawing new claim:' + newName);;

        }
    }

    if (soilders.length < 0) {
        var newName = 'Soilder' + Game.time;
        if (Game.spawns['Spawn1'].spawnCreep([TOUGH, TOUGH, TOUGH, TOUGH, ATTACK, ATTACK, ATTACK, ATTACK, ATTACK, ATTACK, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE], newName,
            { memory: { role: 'soilder' } }) == OK) {
            console.log('Spawing new repair:' + newName);
        }
    }

    if (Game.spawns['Spawn1'].spawning) {
        var spawningCreep = Game.creeps[Game.spawns['Spawn1'].spawning.name];
        Game.spawns['Spawn1'].room.visual.text(
            '🛠️' + spawningCreep.memory.role,
            Game.spawns['Spawn1'].pos.x + 1,
            Game.spawns['Spawn1'].pos.y,
            { align: 'left', opacity: 0.8 });
    }



    for (var name in Game.creeps) {
        var creep = Game.creeps[name];


        if (creep.memory.role == 'harvester') {
            roleHarvester.run(creep);
        }

        if (creep.memory.role == 'upgrader') {
            roleUpgrader.run(creep);
        }

        if (creep.memory.role == 'builder') {
            roleBuilder.run(creep);
        }

        if (creep.memory.role == 'repair') {
            roleRepair.run(creep);
        }

        if (creep.memory.role == 'carry') {
            roleCarry.run(creep);
        }

        if (creep.memory.role == 'realharvester') {
            roleRealHarvester.run(creep);
        }

        if (creep.memory.role == 'claim') {
            roleClaim.run(creep);
        }

        if (creep.memory.role == 'soilder') {
            roleSoilder.run(creep);
        }
        if (creep.memory.role == 'mineral') {
            roleMineral.run(creep);
        }
        if (creep.memory.role == 'linkcarry') {
            if (creep.ticksToLive < 1000) {
                Memory.livemax = false;
            }
            if (Memory.livemax == false && Game.spawns['Spawn1'].renewCreep(creep) == ERR_FULL) {
                Memory.livemax = true;
            }

            roleLinkcarry.run(creep);
        }
    }
}