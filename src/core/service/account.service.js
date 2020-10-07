const Web3 = require('web3');

const accountService = {
   init() {
      window.web3 = new Web3();
   },

   createAccount() {
      return new Promise(resolve => {
         let randomAccount = window.web3.eth.accounts.create();
         resolve(randomAccount);
      });
   },

   importAccount(privateKey) {
      return new Promise(resolve => {
         let account = window.web3.eth.accounts.privateKeyToAccount(privateKey);
         resolve(account);
      });
   }
};

export default accountService;