function countFree(target) {
    const look = target.room.lookAtArea(target.pos.y-1, target.pos.x-1, target.pos.y+1, target.pos.x+1);
    //console.log(JSON.stringify(look));
    let free = 0;
    for (const y in look) {
        for(const x in look[y]) {
            if(look[y][x][0].type === 'energy' || look[y][x][0].type === 'resource') {
                look[y][x].splice(0, 1);
            }

            // console.log(JSON.stringify(look[y][x]));

            if (look[y][x][0].type === 'terrain') {
                if (look[y][x][0].terrain === 'plain' || look[y][x][0].terrain === 'swamp') {
                    //console.log(JSON.stringify(look[y][x][0]))
                    free++;
                }
            }
            if(look[y][x][0].type === 'structure') {
                if (look[y][x][0].structure.structureType === 'road') {
                    free++;
                }
            }
        }
    }
    // console.log(free);
    return(free);
}
module.exports.countFree = countFree;


module.exports.findNearest = function (creep, whatFind = FIND_SOURCES, alterFind = FIND_RUINS) {
    let target = creep.pos.findInRange(whatFind, 1)[0];
    if(!target) {
        // if (alterFind) {
        //     let altTarget = creep.pos.findClosestByPath(alterFind);
        //     if (altTarget)
        //         return altTarget
        // }
        const find = creep.room.find(whatFind);
        for (let i in find) {
            let free = countFree(find[i]);
            if (free === 0 || find[i].energy < 50)
                find.splice(i);
        }
        target = creep.pos.findClosestByPath(find);
        if (target === null) {
            target = creep.pos.findClosestByPath(whatFind);
        }
    }
    return target;
};

module.exports.upFirst = function (string)
{
    return string[0].toUpperCase() + string.slice(1);
}

module.exports.bodyCost = function (body) {
    return body.reduce(function (cost, part) {
        return cost + BODYPART_COST[part];
    }, 0);
}
