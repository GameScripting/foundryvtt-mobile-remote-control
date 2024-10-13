import {currentTargets, visibleTokens} from "../services/Tokens.js";
import {toRaw} from "../vue.esm-browser.js";

export default {
    template: `<div class="target-controls">
    <div v-for="token in visibleTokens">
        <button class="mobile-button" :class="{'selected': isSelected(token)}" @click="setTarget(token)">{{token.actor.name}}</button>
    </div>
</div>
`,
    setup() {
        return {
            visibleTokens: visibleTokens,
            currentTarget: currentTargets
        }
    },
    methods: {
        setTarget(token) {
            toRaw(token).setTarget(true, {releaseOthers: true})
            currentTargets[0] = token;
        },
        isSelected(token) {
            return currentTargets[0]?.id == token?.id
        }
    }
}
