module.exports = {
    /** @param {Creep} creep **/
    energyTrigger: function (creep) {
        if (creep.store[RESOURCE_ENERGY] === creep.store.getCapacity() && !creep.memory.doingJob) creep.memory.doingJob = true;
        else if  (creep.store[RESOURCE_ENERGY] === 0 && creep.memory.doingJob) creep.memory.doingJob = false;
    },
    /** @param {Creep} creep **/
    alwaysWork: function (creep) {
        if (!creep.memory.doingJob) creep.memory.doingJob = true;
    }
};