const utils = require("utils");

var roleBuilder = {

    /** @param {Creep} creep **/
    run: function(creep) {

	    if(creep.memory.repairing && creep.store[RESOURCE_ENERGY] === 0) {
            creep.memory.repairing = false;
            creep.say('🔄 harvest');
	    }
	    if(!creep.memory.repairing && creep.store.getFreeCapacity() === 0) {
	        creep.memory.repairing = true;
	        creep.say('🚧 repair');
	    }

	    if(creep.memory.repairing) {
	    	const target = creep.pos.findClosestByPath(FIND_STRUCTURES, {
                filter: function(object){
                    return object.structureType === STRUCTURE_ROAD && (object.hits > object.hitsMax / 3);
                }
            });
			if(typeof target !== 'undefined') {
                if(creep.repair(target) === ERR_NOT_IN_RANGE) {
                    creep.moveTo(target, {visualizePathStyle: {stroke: '#ffffff'}});
                }
            } else {
			    const targets = creep.room.find(FIND_CONSTRUCTION_SITES);
                if(targets.length) {
                    creep.say('🚧 build');
                    if(creep.build(targets[0]) === ERR_NOT_IN_RANGE) {
                        creep.moveTo(targets[0], {visualizePathStyle: {stroke: '#ffffff'}});
                    }
                }
            }
	    }
	    else {
			let target = utils.findNearest(creep);
			if (creep.harvest(target) === ERR_NOT_IN_RANGE) {
				creep.moveTo(target, {visualizePathStyle: {stroke: '#ffaa00'}});
			}
	    }
	}
};

module.exports = roleBuilder;