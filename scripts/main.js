Hooks.once('ready', () => {
    function showCustomMobileUI() {
        // Inject your custom UI into the HTML body
        fetch("modules/mobile-remote-control/templates/mobile-control.html")
            .then(response => response.text())
            .then(html => {
                // Disable canvas rendering when in mobile UI
                $("#board").fadeOut(5);

                document.body.insertAdjacentHTML('beforeend', html);
                afterReady()
            })
            .catch(err => console.error("Failed to load custom UI:", err));
    }

    function onResize() {
        if (window.innerWidth < 768) {
            if (!document.querySelector("#mobile-remote-control-ui")) {
                showCustomMobileUI();
            }
        } else {
            const mobileUI = document.querySelector("#mobile-remote-control-ui");
            if (mobileUI) {
                mobileUI.remove(); // Remove custom UI when switching back to desktop
                $("#board").fadeIn(5) // Reactivate canvas rendering for desktop
            }
        }

    }

    window.addEventListener('resize', onResize);
    onResize();
});

var token = null;

function afterReady() {
    // demo select token
    token = canvas.tokens.placeables.filter((it) => it.actor && it.actor.isOwner)[0]
    token.control()

    vueApp()
}

function moveToken() {
    const gridSize = canvas.grid.size; // Get the grid size (e.g., 100px per square)
    const newX = token.x - gridSize; // Move one square to the left
    const newY = token.y; // Keep the Y position the same

    token.document.update({ x: newX, y: newY });
}

function moveToken(updateXY) {
    const gridSize = canvas.grid.size; // Get the grid size (e.g., 100px per square)
    updateXY(token, gridSize);
    token.document.update({ x: token.x, y: token.y });
}

function analyseHudGroup(group, cb) {
    if(group.hasActions) {
        cb(group);
    } else {
        for(g of group.groups.lists) {
            analyseHudGroup(g, cb);
        }
    }
}

const allActionGroups = Vue.ref([])
function handleGroup(group) {
    console.log(group)
    allActionGroups.value.push(group);
}

function executeAction(encodedAction) {
    var event = {}
    var actionHandler = {
        actor: token.actor,
        token: token
    }

    game.tokenActionHud.rollHandler.handleActionClickCore(event, encodedAction, actionHandler)
}

window.mrc = {
    refresh: function () {
        for(group of game.tokenActionHud.hud.groups) {
            analyseHudGroup(group, handleGroup)
        }
    },
    moveLeft: function () {
        moveToken((token, amount) => token.x -= amount)
    },
    moveRight: function () {
        moveToken((token, amount) => token.x += amount)
    },
    moveUp: function () {
        moveToken((token, amount) => token.y -= amount)
    },
    moveDown: function () {
        moveToken((token, amount) => token.y += amount)
    },

    test: function () {
        executeAction("strike|7swXlOjSl2oHLuDv%3Egreatsword%3E0%3Emelee")
    }
}

function vueApp() {
    Vue.createApp({
        setup() {
            return {
                allActionGroups: allActionGroups,
                executeAction: executeAction,
            }
        }
    }).mount("#mobile-remote-control-ui")
}