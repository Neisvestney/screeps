const config = require('config');


module.exports.apply = function() {
    Object.defineProperty(Game, 'gameConfig', {value: config});
};
