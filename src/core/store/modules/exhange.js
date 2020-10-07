import celoService from '../../service/celo.service';


// actions
export const FETCH_GOLD_BALANCE = 'fetchGoldTokenBalance';
export const FETCH_STABLE_BALANCE = 'fetchStableTokenBalance';
export const SEND_GOLD_TOKEN = 'sendGoldToken';
export const SEND_STABLE_TOKEN = 'sendStableToken';
export const SWAP_GOLD_TOKEN = 'swapStableToken';

// mutations
export const SET_GOLD_BALANCE = 'setGoldTokenBalance';
export const SET_STABLE_BALANCE = 'setStableTokenBalance';


const state = {
   gold: {
      balance: 0,
      transactions: []
   },
   stable: {
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
      state.gold = {balance};
   },
   [SET_STABLE_BALANCE](state, balance) {
      state.stable = {balance};
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
   }
};

export default {
   state,
   getters,
   mutations,
   actions
}