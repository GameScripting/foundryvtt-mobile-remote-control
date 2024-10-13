import {reactive} from "../vue.esm-browser.js";

export let hudGroups = reactive([])

function analyseHudGroup(group, cb) {
    if(group.hasActions) {
        cb(group);
    } else {
        for(let g of group.groups.lists) {
            g.parent = group
            analyseHudGroup(g, cb);
        }
    }
}

Hooks.on('tokenActionHudCoreHudUpdated', () => {
    const allActionGroups = [];
    for(let group of game.tokenActionHud.hud.groups) {
        analyseHudGroup(group, (group) => {
            if(group.id.indexOf("strikes") == 0
                || group.id.indexOf("spells") == 0
                || group.id == "consumables"
                || group.id == "saves") {
                allActionGroups.push(group);
            }
        })
    }

    hudGroups.length = 0;
    hudGroups.push(...allActionGroups)
});

