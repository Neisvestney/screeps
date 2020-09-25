const triggers = require('triggers');

const carry = require('action.carry');
const mine = require('action.mine');
const upgrade = require('action.upgrade');
const build = require('action.build');
const repair = require('action.repair');

module.exports = {
  "creeps": {
    "harvester": {
      "max": 3,
      "body": [WORK,WORK,CARRY,CARRY,CARRY,MOVE,MOVE],
      "miniBody": [WORK,CARRY,MOVE],
      "work": [carry, upgrade],
      "trigger": triggers.energyTrigger,
      "refill": [mine]
    },
    "upgrader": {
      "max": 5,
      "body": [WORK,WORK,CARRY,MOVE,MOVE],
      "miniBody": [WORK,CARRY,MOVE],
      "work": [upgrade],
      "trigger": triggers.energyTrigger,
      "refill": [mine]
    },
    "builder": {
      "max": 2,
      "body": [WORK,CARRY,CARRY,MOVE,MOVE,MOVE],
      "miniBody": [WORK,CARRY,MOVE],
      "work": [build, repair, carry, upgrade],
      "trigger": triggers.energyTrigger,
      "refill": [mine]
    },
    "repairer": {
      "max": 2,
      "body": [WORK,CARRY,CARRY,MOVE,MOVE,MOVE],
      "miniBody": [WORK,CARRY,MOVE],
      "work": [repair, build, carry, upgrade],
      "trigger": triggers.energyTrigger,
      "refill": [mine]
    }
  }
};