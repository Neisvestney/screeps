const config = require('config')

Creep.prototype.getConfig = function () {
    return config.creeps[this.memory.role]
}