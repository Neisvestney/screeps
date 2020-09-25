require('proto.Creep');

const config = require('config');
const utils = require('utils');


module.exports.loop = function () {

    const tower = Game.getObjectById('5ded7997c54c4cad5cf71019');
    if (tower) {
        const closestDamagedStructure = tower.pos.findClosestByRange(FIND_STRUCTURES, {
            filter: (structure) => structure.hits < structure.hitsMax
        });
        if (closestDamagedStructure) {
            //tower.repair(closestDamagedStructure);
        }

        let closestHostile = tower.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
        if (closestHostile) {
            tower.attack(closestHostile);
        }
    }

    respawnCreeps();

    if (Game.spawns['HomeSpawn'].spawning) {
        let spawningCreep = Game.creeps[Game.spawns['HomeSpawn'].spawning.name];
        Game.spawns['HomeSpawn'].room.visual.text(
            '🛠️' + spawningCreep.memory.role,
            Game.spawns['HomeSpawn'].pos.x + 1,
            Game.spawns['HomeSpawn'].pos.y,
            {align: 'left', opacity: 0.8});
    }

    doJobs();
};

function doJobs() {
    for (let name in Game.creeps) {
        const creep = Game.creeps[name];
        const creepConfig = creep.getConfig();

        creepConfig.trigger(creep);

        if (creep.memory.doingJob) {
            for (const work in creepConfig.work) {
                if (creepConfig.work[work].do(creep)) {
                    break;
                }
            }
        }
        else {
            for (const work in creepConfig.refill) {
                if (creepConfig.refill[work].do(creep)) {
                    break;
                }
            }
        }
    }
}

function respawnCreeps() {
    for (let name in Memory.creeps) {
        if (!Game.creeps[name]) {
            delete Memory.creeps[name];
            console.log('Clearing non-existing creep memory:', name);
        }
    }

    for (const creepName in config.creeps) {
        const creepConfig = config.creeps[creepName];
        if (_.filter(Game.creeps, (creep) => creep.memory.role === creepName).length < creepConfig.max) {
            let newName = creepName + Game.time;
            newName = utils.upFirst(newName);
            const cost = utils.bodyCost(creepConfig.body);
            const capacity = Game.spawns['HomeSpawn'].room.energyCapacityAvailable;

            console.log(`Spawning new creep: ${newName} (${Game.spawns['HomeSpawn'].room.energyAvailable}/${cost}) (Max Energy: ${capacity})`);

            if (cost <= capacity) {
                Game.spawns['HomeSpawn'].spawnCreep(creepConfig.body, newName,
                    {memory: {role: creepName, doingJob: false}});
            } else {
                Game.spawns['HomeSpawn'].spawnCreep(creepConfig.miniBody, newName,
                    {memory: {role: creepName, doingJob: false}});
            }
            return;
        }
    }
}