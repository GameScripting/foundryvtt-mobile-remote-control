import {selectPlayerToken} from "../services/PlayerToken.js";
import MoveControls from "./MoveControls.js";
import ActionsControls from "./ActionsControls.js";
import Accordion from "./Accordion.js";
import {stopApp} from "../main.js";

export default {
  components: {
    Accordion,
    MoveControls,
    ActionsControls
  },
  template: `
    <div id="mobile-view">
      <Accordion>
        <template #header-0>
          <h1>Steuerung</h1>
        </template>
        <template #content-0>
          <MoveControls></MoveControls>
        </template>
        
        <template #header-1>
          <h1>Aktionen</h1>
        </template>
        <template #content-1>
          <ActionsControls></ActionsControls>
        </template>
      </Accordion>
      <h1 @click="exitMobileRemoteControl()">EXIT</h1>
    </div>
  `,
  mounted() {
    selectPlayerToken();
  },
  methods: {
    exitMobileRemoteControl() {
      stopApp();
    }
  }
}
