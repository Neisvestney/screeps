const utils = require("utils");

var roleHarvester = {

    /** @param {Creep} creep **/
    run: function(creep) {
	    if(creep.store.getFreeCapacity() > 0) {
            let target = utils.findNearest(creep);

            if(creep.harvest(target) === ERR_NOT_IN_RANGE) {
                creep.moveTo(target, {visualizePathStyle: {stroke: '#ffaa00'}});
            }
        }
        else {
            // const targets = creep.room.find(FIND_STRUCTURES, {
            //     filter: (structure) => {
            //         return (structure.structureType === STRUCTURE_EXTENSION ||
            //             structure.structureType === STRUCTURE_SPAWN ||
            //             structure.structureType === STRUCTURE_TOWER) &&
            //             structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0;
            //     }
            // });
            const targets = creep.room.find(FIND_STRUCTURES, {
                filter: (structure) => {
                    return (structure.structureType === STRUCTURE_EXTENSION ||
                        structure.structureType === STRUCTURE_SPAWN ||
                        structure.structureType === STRUCTURE_TOWER) &&
                        structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0;
                }
            });
            const target = creep.pos.findClosestByPath(targets);
            //var targets = [Game.getObjectById('5de7c4f8afe1b414e754fe99')];
            //console.log(target);
            if(target) {
                if(creep.transfer(target, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
                    creep.moveTo(target, {visualizePathStyle: {stroke: '#ffffff'}});
                }
            }
        }
	}
};

module.exports = roleHarvester;