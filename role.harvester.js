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
            const target = creep.pos.findClosestByPath(FIND_MY_STRUCTURES, {
                filter: { structureType: STRUCTURE_SPAWN }
            });
            //var targets = [Game.getObjectById('5de7c4f8afe1b414e754fe99')];
            console.log(target);
            if(target) {
                if(creep.transfer(target, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
                    creep.moveTo(target, {visualizePathStyle: {stroke: '#ffffff'}});
                }
            }
        }
	}
};

module.exports = roleHarvester;