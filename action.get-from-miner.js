module.exports = {
    /** @param {Creep} creep **/
    do: function (creep) {
        let miner = creep.pos.findClosestByPath(FIND_MY_CREEPS, {
            filter: function(creep) {
                return (creep.memory['role'] === "miner" && creep.store.getFreeCapacity() < 50);
            }
        });

        if (miner) {
            creep.moveTo(miner);
            return true;
        }
        return false;
    }
};
