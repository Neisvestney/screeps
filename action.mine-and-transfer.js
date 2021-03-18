const mine = require("action.mine");

module.exports = {
    /** @param {Creep} creep **/
    do: function (creep) {
        const targets = creep.pos.findInRange(FIND_MY_CREEPS, 1, { filter: (c) => c.store.getFreeCapacity() > 0});

        if (targets.length > 0 && creep.store.getFreeCapacity()/creep.store.getCapacity() < 0.2) {
            creep.transfer(targets[0], RESOURCE_ENERGY);
        } else {
            mine.do(creep);
        }
        return true;
    }
};
