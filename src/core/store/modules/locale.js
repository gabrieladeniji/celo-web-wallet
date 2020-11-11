export const SET_LOCALE = 'setLocalization';
export const FETCH_LOCALE = 'fetchLocaliation';


const setters = {
   locale: {
     iso2: '',
     name: ''
  }
};

const getters = {
   locale: (state) => {
      return state.locale
   }
};

const mutations = {
   [SET_LOCALE](state, locale) {
      state.locale = locale;
   }
};

const actions = {
   [SET_LOCALE](context, locale) {
      localStorage.setItem('locale', JSON.stringify(locale));
      context.commit(SET_LOCALE, locale);
   },
   [FETCH_LOCALE](context) {
      let locale = JSON.parse(localStorage.getItem('locale'));
      locale = (!locale ? {iso2: 'gb', name: 'English'} : locale);
      context.commit(SET_LOCALE, locale);
   }
};


export default {
   setters,
   getters,
   mutations,
   actions
}