function countFree(target) {
    const look = target.room.lookAtArea(target.pos.y-1, target.pos.x-1, target.pos.y+1, target.pos.x+1);
    //console.log(JSON.stringify(look));
    let free = 0;
    for (const y in look) {
        for(const x in look[y]) {
            //console.log(JSON.stringify(look[y][x]));
            if (look[y][x][0].type === 'terrain') {
                if (look[y][x][0].terrain === 'plain' || look[y][x][0].terrain === 'swamp') {
                    //console.log(JSON.stringify(look[y][x][0]))
                    free++;
                }
            }
        }
    }
    return(free);
};
module.exports.countFree = countFree;


module.exports.findNearest = function (creep, whatFind = FIND_SOURCES) {
    const sources = creep.room.find(FIND_SOURCES);
    //const sources = creep.pos.findClosestByPath(FIND_SOURCES);
    let target;
    for (let source in sources) {
        let free = countFree(sources[source]);
        if (free === 0)
            sources.splice(source);
    }
    target = creep.pos.findClosestByPath(sources);
    if (target === null) {
        target = creep.pos.findClosestByPath(FIND_SOURCES);
    }

    return target;
};