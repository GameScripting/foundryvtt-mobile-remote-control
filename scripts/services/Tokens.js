import {reactive} from "../vue.esm-browser.js";
import {playerToken} from "./PlayerToken.js";

export let visibleTokens = reactive([]);
export let currentTargets = reactive([])

function updateVisibleTokens() {
    const updated = canvas.tokens.placeables.filter(token => {
        if (token === playerToken) return false;
        return token.visible;
    });

    visibleTokens.length = 0;
    visibleTokens.push(...updated);
}

Hooks.on('mobileRemoteControlReady', updateVisibleTokens);
Hooks.on('sightRefresh', updateVisibleTokens);
