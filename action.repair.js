module.exports = {
    /** @param {Creep} creep **/
    do: function (creep) {
        const target = creep.pos.findClosestByPath(FIND_STRUCTURES, {
            filter: function (object) {
                return object.structureType === STRUCTURE_ROAD && (object.hits < object.hitsMax / 3);
            }
        });

        if (target) {
            if (creep.repair(target) === ERR_NOT_IN_RANGE) {
                creep.moveTo(target, {visualizePathStyle: {stroke: '#ffffff'}});
                return true
            }
        } else {
            return false
        }
    }
};