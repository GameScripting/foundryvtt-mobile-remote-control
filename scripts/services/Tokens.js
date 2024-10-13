import {reactive, watch} from "../vue.esm-browser.js";
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

watch(
    () => playerToken,
    () => updateVisibleTokens()
)

Hooks.on('mobileRemoteControlReady', updateVisibleTokens);
Hooks.on('sightRefresh', updateVisibleTokens);
Hooks.on('createToken', updateVisibleTokens);
Hooks.on('deleteToken', updateVisibleTokens);
