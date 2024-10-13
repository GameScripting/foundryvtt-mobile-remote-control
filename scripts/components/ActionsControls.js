import {hudGroups} from "../services/ActionHud.js";
import {executeAction} from "../services/PlayerToken.js";

export default {
    template: `
        <div v-for="actionGroup in hudGroups">
            <h2>{{actionGroup.listName}}</h2>
            <button @click="executeAction(action.encodedValue)" v-for="action in actionGroup.actions">{{action.listName}}</button>
        </div>
    `,
    setup() {
        return {
            hudGroups,
            executeAction
        }
    }
}