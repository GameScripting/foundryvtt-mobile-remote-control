import {selectPlayerToken} from "../services/PlayerToken.js";
import MoveControls from "./MoveControls.js";
import ActionsControls from "./ActionsControls.js";

export default {
  components: {
    MoveControls,
    ActionsControls
  },
  template: `
    <div id="mobile-view">
      <b>Steuerung</b>
      <MoveControls></MoveControls>

      <b>Aktionen</b>
      <ActionsControls></ActionsControls>
    </div>
  `,
  mounted() {
    selectPlayerToken();
  }
}
