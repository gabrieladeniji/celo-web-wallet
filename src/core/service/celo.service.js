import { newKit } from '@celo/contractkit';

const celoService = {
   init(url) {
      window.kit = newKit(url);
   },

   // paid gas in cUSD
   // kit.setFeeCurrency(CeloContract.StableToken)

   async getGoldTokenBalance(address) {
      const goldToken = await window.kit.contracts.getGoldToken();
      const bal = await goldToken.balanceOf(address);
      const balBn = window.kit.web3.utils.toBN(bal);
      return window.kit.web3.utils.fromWei(balBn.toString(), 'ether');
   },

   async getStableTokenBalance(address) {
      const stableToken = await window.kit.contracts.getStableToken();
      const bal = await stableToken.balanceOf(address);
      const balBn = window.kit.web3.utils.toBN(bal);
      return window.kit.web3.utils.fromWei(balBn.toString(), 'ether');
   },

   async sendGoldToken({sender, sender_pk, receiver, amount}) {
      window.kit.addAccount(sender_pk);
      const goldToken = await window.kit.contracts.getGoldToken();
      const amountWei = window.kit.web3.utils.toWei(amount.toString(), 'ether');
      const tx = await goldToken.transfer(receiver, amountWei).send({
         from: sender
      });
      return await tx.waitReceipt();
   },

   async sendStableToken({sender, sender_pk, receiver, amount}) {
      window.kit.addAccount(sender_pk);
      const stableToken = await window.kit.contracts.getStableToken();
      const amountWei = window.kit.web3.utils.toWei(amount.toString(), 'ether');
      const tx = await stableToken.transfer(receiver, amountWei).send({
         from: sender
      });
      return await tx.waitReceipt();
   },

   async convertGoldToStableToken(amount) {
      const exchange = await window.kit.contracts.getExchange();
      const amountWie = window.kit.web3.utils.toWei(amount, 'ether');
      const stableToken = await exchange.quoteGoldSell(amountWie.toString());
      const stableTokenEth = window.kit.web3.utils.fromWei(stableToken.toString(), 'ether');
      console.log(stableTokenEth);
      return stableTokenEth;
   },

   async swapGoldToStableToken({sender, sender_pk, amount}) {
      window.kit.addAccount(sender_pk);
      const exchange = await window.kit.contracts.getExchange();
      const amountWie = window.kit.web3.utils.toWei(amount.toString(), 'ether');

      const goldToken = await window.kit.contracts.getGoldToken();
      const approveTx = await goldToken.approve(sender, amountWie).send({from: sender});
      const approveReceipt = await approveTx.waitReceipt();

      const stableToken = await exchange.quoteGoldSell(amountWie);
      const sellTx = await exchange.sellGold(amountWie, stableToken).send();
      const sellReceipt = await sellTx.waitReceipt();

      //
      console.log('eth', amountWie);
      console.log('sell raw', stableToken.toString());
      console.log('sell', window.kit.web3.utils.fromWei(stableToken, 'ether'));

      return [approveReceipt, sellReceipt];
   },

   async swapStableToGoldToken({sender, sender_pk, amount}) {
      window.kit.addAccount(sender_pk);
      const exchange = await window.kit.contracts.getExchange();
      const amountWie = window.kit.web3.utils.toWei(amount.toString(), 'ether');

      const stableToken = await window.kit.contracts.getStableToken();
      const approveTx = await stableToken.approve(sender, amountWie).send({from: sender});
      const approveReceipt = await approveTx.waitReceipt();

      const goldToken = await exchange.quoteUsdSell(amountWie);
      const sellTx = await exchange.sellDollar(amountWie, goldToken).send();
      const sellReceipt = await sellTx.waitReceipt();

      //
      console.log('eth', amountWie);
      console.log('sell raw', stableToken.toString());
      console.log('sell', window.kit.web3.utils.fromWei(stableToken, 'ether'));

      return [approveReceipt, sellReceipt];
   }
};

export default celoService;