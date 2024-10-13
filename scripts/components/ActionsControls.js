import {hudGroups} from "../services/ActionHud.js";
import {executeAction} from "../services/PlayerToken.js";

export default {
    template: `<div class="action-group" v-for="actionGroup in hudGroups">
    <div class="action-header">
        <img v-if="actionGroup.parent.settings.image" :src="actionGroup.parent.settings.image" alt="">
        <h2>{{formatGroupName(actionGroup.listName)}}</h2>
    </div>
    <div class="action-btn" v-for="action in actionGroup.actions">
        <button class="mobile-button" @click="executeAction(action.encodedValue)">
            {{action.name}}
        </button>
    </div>
</div>
`,
    setup() {
        return {
            hudGroups,
            executeAction
        }
    },
    methods: {
        formatGroupName(listName) {
            const result = /(.+)\(\w+\)/.exec(listName)
            if (result) {
                return result[1]
            }

            const result2 = /Group: (.+)/.exec(listName)
            if (result2) {
                return result2[1]
            }

            return listName;
        }
    }
}