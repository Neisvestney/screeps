const triggers = require('triggers');

const carry = require('action.carry');
const getFromMiner = require('action.get-from-miner');
const mine = require('action.mine');
const mineAndTransfer = require('action.mine-and-transfer');
const upgrade = require('action.upgrade');
const build = require('action.build');
const repair = require('action.repair');

module.exports = {
  "creeps": {
    "harvester": {
      "max": 2,
      "body": [WORK,CARRY,CARRY,CARRY,MOVE,MOVE],
      "miniBody": [WORK,CARRY,MOVE],
      "work": [carry, upgrade],
      "trigger": triggers.energyTrigger,
      "refill": [getFromMiner, mine]
    },
    "miner": {
      "max": 3,
      "body": [WORK,WORK,WORK,CARRY,CARRY,CARRY,MOVE],
      "miniBody": [WORK,CARRY,MOVE],
      "work": [mineAndTransfer],
      "trigger": triggers.alwaysWork,
      "refill": []
    },
    "upgrader": {
      "max": 5,
      "body": [WORK,WORK,CARRY,MOVE,MOVE],
      "miniBody": [WORK,CARRY,MOVE],
      "work": [upgrade],
      "trigger": triggers.energyTrigger,
      "refill": [getFromMiner, mine]
    },
    "builder": {
      "max": 2,
      "body": [WORK,CARRY,CARRY,MOVE,MOVE,MOVE],
      "miniBody": [WORK,CARRY,MOVE],
      "work": [build, repair, carry, upgrade],
      "trigger": triggers.energyTrigger,
      "refill": [getFromMiner, mine]
    },
    "repairer": {
      "max": 2,
      "body": [WORK,CARRY,CARRY,MOVE,MOVE,MOVE],
      "miniBody": [WORK,CARRY,MOVE],
      "work": [repair, build, carry, upgrade],
      "trigger": triggers.energyTrigger,
      "refill": [getFromMiner, mine]
    }
  }
};