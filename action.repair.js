module.exports = {
    /** @param {Creep} creep **/
    do: function (creep) {
        const target = creep.pos.findClosestByPath(FIND_STRUCTURES, {
            filter: function (object) {
                return (object.hits < object.hitsMax);
            }
        });

        if (target) {
            if (creep.repair(target) === ERR_NOT_IN_RANGE) {
                creep.moveTo(target, {visualizePathStyle: {stroke: '#ffffff'}});
            }
            return true
        } else {
            return false
        }
    }
};