import apiService from '../../service/api.service';
import celoService from '../../service/celo.service';


// actions
export const SWAP_GOLD_TOKEN = 'swapStableToken';
export const SEND_GOLD_TOKEN = 'sendGoldToken';
export const FETCH_GOLD_PRICE = 'fetchGoldTokenPrice';
export const SEND_STABLE_TOKEN = 'sendStableToken';
export const FETCH_STABLE_PRICE = 'fetchStableTokenPrice';
export const FETCH_GOLD_BALANCE = 'fetchGoldTokenBalance';
export const FETCH_STABLE_BALANCE = 'fetchStableTokenBalance';
export const CLEAR_ASSETS_BALANCE = 'clearAssetsBalance';
export const EXTRACT_ADDRESS_TRANSACTIONS = 'extractAddressTransactions';

// mutations
export const RESET_BALANCE = 'resetTokenBalance';
export const SET_GOLD_PRICE = 'setGoldPrice';
export const SET_GOLD_BALANCE = 'setGoldTokenBalance';
export const SET_STABLE_BALANCE = 'setStableTokenBalance';


const state = {
   gold: {
      done: false,
      price: 0.00,
      balance: 0,
      transactions: []
   },
   stable: {
      done: false,
      price: 1,
      balance: 0,
      transactions: []
   }
};

const getters = {
   gold: (state) => {
      return state.gold;
   },
   stable: (state) => {
      return state.stable;
   }
};

const mutations = {
   [SET_GOLD_BALANCE](state, balance) {
      state.gold['balance'] = balance;
      state.gold['done'] = true;
   },
   [SET_STABLE_BALANCE](state, balance) {
      state.stable['balance'] = balance;
      state.stable['done'] = true;
   },
   [RESET_BALANCE](state) {
      state.gold['balance'] = 0;
      state.gold['done'] = false;
      state.stable['balance'] = 0;
      state.stable['done'] = false;
   },
   [SET_GOLD_PRICE](state, price) {
      state.gold['price'] = price;
   }
};

const actions = {
   [FETCH_GOLD_BALANCE](context) {
      return new Promise((resolve, reject) => {
         let { address } = context.getters.wallet;
         celoService.getGoldTokenBalance(address).then((bal) => {
            context.commit(SET_GOLD_BALANCE, bal);
            resolve(true);
         }).catch((err) => {
            reject(`[fetchGoldBalance] => ${err}`);
         })
      })
   },
   [FETCH_STABLE_BALANCE](context) {
      return new Promise((resolve, reject) => {
         let { address } = context.getters.wallet;
         celoService.getStableTokenBalance(address).then((bal) => {
            context.commit(SET_STABLE_BALANCE, bal);
            resolve(true);
         }).catch((err) => {
            reject(`[fetchStableBalance] => ${err}`);
         })
      })
   },
   [SEND_GOLD_TOKEN](context, { amount, receiver }) {
      return new Promise((resolve, reject) => {
         let data = {
            amount: parseFloat(amount),
            sender: context.getters.wallet.address,
            receiver: receiver,
            sender_pk: context.getters.wallet.private_key
         };
         celoService.sendGoldToken(data).then((res) => {
            resolve(res);
         }).catch((err) => {
            reject(`[sendGoldToken] => ${err}`);
         })
      });
   },
   [SEND_STABLE_TOKEN](context, { amount, receiver }) {
      return new Promise((resolve, reject) => {
         let data = {
            amount: parseFloat(amount),
            sender: context.getters.wallet.address,
            receiver: receiver,
            sender_pk: context.getters.wallet.private_key
         };
         celoService.sendStableToken(data).then((res) => {
            resolve(res);
         }).catch((err) => {
            reject(`[sendStableToken] => ${err}`);
         })
      });
   },
   [SWAP_GOLD_TOKEN](context) {
      return new Promise((resolve, reject) => {
         let data = {
            amount: parseFloat(5),
            sender: context.getters.wallet.address,
            sender_pk: context.getters.wallet.private_key
         };
         celoService.swapStableToGoldToken(data).then((res) => {
            console.log(res);
            resolve(res);
         }).catch((err) => {
            reject(`[swapGoldToken] => ${err}`);
         });
      });
   },
   [CLEAR_ASSETS_BALANCE](context) {
      context.commit(RESET_BALANCE);
   },
   [FETCH_STABLE_PRICE](context) {
      return new Promise((resolve, reject) => {
         apiService.setBaseUrl('http://baklava.thecelo.com');
         apiService.getApi('/api/v0.1', {method: 'getprices'}).then((res) => {
            console.log(res);
         }).catch((e) => {
            console.log(e);
            reject(`[fetchStablePrice] => ${e}`);
         });
      });
   },
   [FETCH_GOLD_PRICE](context) {
      return new Promise((resolve, reject) => {
         apiService.setBaseUrl('https://api.coingecko.com/api/v3');
         apiService.getApi('/simple/price', {ids: 'celo-gold', vs_currencies: 'usd'}).then((res) => {
            context.commit(SET_GOLD_PRICE, res['celo-gold'].usd);
            console.log(res);
         }).catch((e) => {
            console.log(e);
            reject(`[fetchGoldPrice] => ${e}`);
         });
      });
   },
   [EXTRACT_ADDRESS_TRANSACTIONS]() {
      // return new Promise((resolve, reject) => {
      //    celoService.extractTransactions().then((res) => {
      //       resolve(res);
      //    }).catch((err) => {
      //       reject(`[extractAddressTransactions] => ${err}`);
      //    })
      // });
   }
};

export default {
   state,
   getters,
   mutations,
   actions
}