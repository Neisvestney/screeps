const config = require('config');

const roleHarvester = require('role.harvester');
const roleUpgrader = require('role.upgrader');
const roleBuilder = require('role.builder');
const roleRepairer = require('role.repairer');

module.exports.loop = function () {

    const tower = Game.getObjectById('5ded7997c54c4cad5cf71019');
    if(tower) {
        const closestDamagedStructure = tower.pos.findClosestByRange(FIND_STRUCTURES, {
            filter: (structure) => structure.hits < structure.hitsMax
        });
        if(closestDamagedStructure) {
            //tower.repair(closestDamagedStructure);
        }

        var closestHostile = tower.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
        if(closestHostile) {
            tower.attack(closestHostile);
        }
    }
    


    respawnCreeps();

    if(Game.spawns['HomeSpawn'].spawning) {
        var spawningCreep = Game.creeps[Game.spawns['HomeSpawn'].spawning.name];
        Game.spawns['HomeSpawn'].room.visual.text(
            '🛠️' + spawningCreep.memory.role,
            Game.spawns['HomeSpawn'].pos.x + 1,
            Game.spawns['HomeSpawn'].pos.y,
            {align: 'left', opacity: 0.8});
    }

    for(let name in Game.creeps) {
        const creep = Game.creeps[name];
        if(creep.memory.role === 'harvester') {
            roleHarvester.run(creep);
        }
        if(creep.memory.role === 'upgrader') {
            roleUpgrader.run(creep);
        }
        if(creep.memory.role === 'builder') {
            roleBuilder.run(creep);
        }
        if(creep.memory.role === 'repairer') {
            roleRepairer.run(creep);
        }
    }
};

function respawnCreeps() {
    for(let name in Memory.creeps) {
        if(!Game.creeps[name]) {
            delete Memory.creeps[name];
            console.log('Clearing non-existing creep memory:', name);
        }
    }

    if(_.filter(Game.creeps, (creep) => creep.memory.role === 'harvester').length < config.creeps.harvesters.max){
        let newName = 'Harvester' + Game.time;
        console.log('Spawning new harvester: ' + newName);
        Game.spawns['HomeSpawn'].spawnCreep([WORK,CARRY,CARRY,MOVE], newName,
            {memory: {role: 'harvester'}});
    } else if(_.filter(Game.creeps, (creep) => creep.memory.role === 'upgrader').length < config.creeps.upgraders.max) {
        let newName = 'Upgrader' + Game.time;
        console.log('Spawning new upgrader: ' + newName);
        Game.spawns['HomeSpawn'].spawnCreep([WORK,CARRY,MOVE,MOVE,MOVE], newName,
            {memory: {role: 'upgrader'}});
    } else if(_.filter(Game.creeps, (creep) => creep.memory.role === 'builder').length < config.creeps.builders.max) {
        let newName = 'Builder' + Game.time;
        console.log('Spawning new builder: ' + newName);
        Game.spawns['HomeSpawn'].spawnCreep([WORK,CARRY,MOVE,MOVE,MOVE], newName,
            {memory: {role: 'builder'}});
    } else if(_.filter(Game.creeps, (creep) => creep.memory.role === 'repairer').length < config.creeps.repairers.max) {
        let newName = 'Repairer' + Game.time;
        console.log('Spawning new repairer: ' + newName);
        Game.spawns['HomeSpawn'].spawnCreep([WORK,CARRY,MOVE,MOVE,MOVE], newName,
            {memory: {role: 'repairer'}});
    }
}