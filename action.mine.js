const utils = require("utils");

module.exports = {
    /** @param {Creep} creep **/
    do: function (creep) {
        let target = utils.findNearest(creep);

        if (creep.harvest(target) === ERR_NOT_IN_RANGE) {
            creep.moveTo(target, {visualizePathStyle: {stroke: '#ffaa00'}});
        }
        return true;
    }
};
