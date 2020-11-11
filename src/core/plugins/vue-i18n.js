import Vue from 'vue';
import VueI18n from "vue-i18n";

Vue.use(VueI18n);

// languages
import { locale as en } from '../config/i18n/en';
import { locale as de } from '../config/i18n/de';
import { locale as fr } from '../config/i18n/fr';
import { locale as cn } from '../config/i18n/cn';
import { locale as es } from '../config/i18n/es';
import { locale as ru } from '../config/i18n/fr';

let messages = {};
messages = { ...messages, en, de, fr, cn, es, ru };

const locale = JSON.parse(localStorage.getItem("locale"));
const lang = (locale ? locale.iso2 : null);


const i18n = new VueI18n({
   locale: lang,
   fallbackLocale: 'en',
   messages
});

export default i18n;