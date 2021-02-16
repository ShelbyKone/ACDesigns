import Vue from 'vue';
import Vuetify from 'vuetify/lib/framework';

Vue.use(Vuetify);

export default new Vuetify({
    theme: {
        themes: {
            light: {
                primary: "#f19eaf",
                secondary: "#26bdb5",
                background: "#f3e7cf",
                text: "#f3e7cf",
                error: "#FF5252",
                white: "#FFFFFF",
                black: "#000000"
            }
        }
    }
});
