import Vue from 'vue';
import Vuetify from 'vuetify/lib/framework';

Vue.use(Vuetify);

export default new Vuetify({
    theme: {
        themes: {
            light: {
                primary: "#81f1f7",
                secondary: "#9dffb0",
                dark: "#2e686e",
                light: "#f8f3e7",
                error: "#FF5252",
                white: "#FFFFFF",
                black: "#000000"
            }
        }
    }
});
