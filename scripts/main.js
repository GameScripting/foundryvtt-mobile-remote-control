import { createApp } from './vue.esm-browser.js'
import App from './app.js'

export function startApp() {
    // start vue app
    document.body.insertAdjacentHTML(
        'beforeend',
        '<div id="mobile-remote-control-ui"></div>'
    );
    createApp(App).mount("#mobile-remote-control-ui");
}

export function stopApp() {
    document.getElementById("mobile-remote-control-ui").remove()
}

Hooks.once('ready', () => {
    startApp();
});
