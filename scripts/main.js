import { createApp } from './vue.esm-browser.js'
import App from './app.js'

Hooks.once('ready', () => {
    // only start in mobile view
    if (window.innerWidth < 768) {
        // disable rendering
        $("#board").fadeOut();

        // start vue app
        document.body.insertAdjacentHTML(
            'beforeend',
            '<div id="mobile-remote-control-ui"></div>'
        );
        createApp(App).mount("#mobile-remote-control-ui");
    }
});
