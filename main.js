require('proto.Creep');

const utils = require('utils');

const towerAction = require('structures.tower');

module.exports.loop = function () {
    require('proto.Game').apply();

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
    doStructuresActions();
};

function doJobs() {
    for (let name in Game.creeps) {
        const creep = Game.creeps[name];
        const creepConfig = creep.config;

        creepConfig.trigger(creep);

        if (creep.memory.doingJob) {
            for (const work in creepConfig.work) {
                if (creepConfig.work[work].do(creep)) {
                    break;
                }
            }
        } else {
            for (const work in creepConfig.refill) {
                if (creepConfig.refill[work].do(creep)) {
                    break;
                }
            }
        }
    }
}

function doStructuresActions() {
    const towers = Game.spawns['HomeSpawn'].room.find(FIND_MY_STRUCTURES, {
        filter: {structureType: STRUCTURE_TOWER}
    });

    for (const towerName in towers) {
        let tower = towers[towerName];
        towerAction.do(tower);
    }
}

function respawnCreeps() {
    for (let name in Memory.creeps) {
        if (!Game.creeps[name]) {
            delete Memory.creeps[name];
            console.log('Clearing non-existing creep memory:', name);
        }
    }

    for (const creepName in Game.gameConfig.creeps) {
        const creepConfig = Game.gameConfig.creeps[creepName];
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
