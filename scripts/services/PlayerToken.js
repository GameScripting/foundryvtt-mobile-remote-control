export let playerToken = null;

export function selectPlayerToken() {
    playerToken = canvas.tokens.placeables.filter((it) => it.actor && it.actor.isOwner)[0]
    playerToken.control()
}

function moveToken(updateXY) {
    function snapToGrid(value, gridSize) {
        return Math.round(value / gridSize) * gridSize;
    }

    const gridSize = canvas.grid.size; // Get the grid size (e.g., 100px per square)
    updateXY(playerToken, gridSize);
    playerToken.document.update({
        x: snapToGrid(playerToken.x, gridSize),
        y: snapToGrid(playerToken.y, gridSize)
    });
}

export function moveLeft() {
    moveToken((token, amount) => token.x -= amount)
}
export function moveRight() {
    moveToken((token, amount) => token.x += amount)
}
export function moveUp() {
    moveToken((token, amount) => token.y -= amount)
}
export function moveDown() {
    moveToken((token, amount) => token.y += amount)
}

export function executeAction(encodedAction) {
    let event = {}
    let actionHandler = {
        actor: playerToken.actor,
        token: playerToken
    }

    game.tokenActionHud.rollHandler.handleActionClickCore(event, encodedAction, actionHandler);
}
