import accountService from '../../service/account.service';

// actions
export const CREATE_WALLET = 'createWallet';
export const IMPORT_WALLET = 'importWallet';
export const CLEAR_WALLET = 'emptyWallet';

// mutations
export const SET_WALLET = 'setWallet';
export const DEL_WALLET = 'deleteWallet';


const state = {
   wallet: null
};

const getters = {
   wallet: (state) => {
      return state.wallet;
   }
};

const mutations = {
   [SET_WALLET](state, wallet) {
      state.wallet = {
         address: wallet.address,
         private_key: wallet.privateKey
      }
   },
   [DEL_WALLET](state) {
      state.wallet = null;
   }
};

const actions = {
   [CREATE_WALLET](context) {
      return new Promise((resolve) => {
         accountService.createAccount().then((res) => {
            context.commit(SET_WALLET, res);
            resolve(true);
         })
      });
   },
   [IMPORT_WALLET](context, privateKey) {
      return new Promise((resolve, reject) => {
         accountService.importAccount(privateKey).then((res) => {
            context.commit(SET_WALLET, res);
            resolve(true);
         }).catch((err) => {
            reject(`[importWallet] => ${err}`);
         })
      });
   },
   [CLEAR_WALLET](context) {
      context.commit(DEL_WALLET);
   }
};

export default {
   state,
   getters,
   mutations,
   actions
}