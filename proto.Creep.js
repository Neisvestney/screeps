Object.defineProperty(Creep.prototype, 'config', {
    get: function () {
        return Game.gameConfig.creeps[this.memory.role]
    },
});