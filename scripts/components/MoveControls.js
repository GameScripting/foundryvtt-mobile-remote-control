import {moveUp,moveDown,moveLeft, moveRight} from "../services/PlayerToken.js";

export default {
    template: `
        <div class="move-controls">
            <button class="arrow-btn" @click="moveUp()">↑</button>
            <div>
                <button class="arrow-btn" @click="moveLeft()">←</button>
                <button class="arrow-btn" @click="moveDown()">↓</button>
                <button class="arrow-btn" @click="moveRight()">→</button>
            </div>
        </div>
    `,
    methods: {
        moveUp: function () {
            moveUp();
        },
        moveDown: function () {
            moveDown();
        },
        moveLeft: function () {
            moveLeft();
        },
        moveRight: function () {
            moveRight();
        },
    }
}
