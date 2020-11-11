<template>
    <div class="wallets-container mt-3">
        <div class="row">
            <div class="col-md-12">
                <div class="coinWallet-Balcontainer">
                    <div class="coinWallet-logo">
                        <img alt="coin" class="wallet-coin" src="/images/icon-celo-dollar-color.png"/>
                    </div>
                    <div style="position: absolute;right: 25px;top: 14px;">
                        <div class="pb-1" style="color: rgb(152, 161, 178);font-size: 14px;">
                            1 cUSD ≈ <span style="font-size: 13px;color: #4eaf0a;">${{ stable.price }}</span>
                        </div>
                    </div>
                    <div class="coinWallet-details" style="max-width: inherit !important;">
                        <div class="pb-2" style="color: rgb(152, 161, 178);font-size: 16px;">
                            {{ $t('pages.stableToken.celoUsdBalance') }}
                        </div>
                        <div>
                            <span style="font-size: 20px;">{{ stable.balance }} cUSD</span>
                        </div>
                        <div class="coinWallet-actionBtns mt-3">
                            <div @click="openSendModal()" class="btn-deposit">{{ $t('pages.stableToken.send') }}</div>
                            <div @click="openDepositModal()" class="btn-deposit">{{ $t('pages.stableToken.deposit') }}</div>
                        </div>
                        <div class="font-weight-bold body-2 pt-4">{{ $t('pages.stableToken.walletPrivateKey') }}</div>
                        <p class="body-2 text-muted">
                            {{wallet.private_key}}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

   import {bus} from '../../main';
   import {mapGetters} from 'vuex';
   import TransactionHistory from '../components/TransactionHistory';
   import {FETCH_STABLE_PRICE, FETCH_STABLE_BALANCE} from '../../core/store/modules/exhange';

   export default {
      name: "StableToken",
      data() {
         return {}
      },
      components: {
         appTransactionHistory: TransactionHistory
      },
      computed: {
         ...mapGetters([
            'stable',
            'wallet'
         ])
      },
      methods: {
         openSendModal() {
            bus.$emit('open_send_stable_token');
         },
         openDepositModal() {
            bus.$emit('open_deposit_token', {name: 'cUSD', address: this.wallet.address});
         },
         openSwapModal() {

         }
      },
      async mounted() {
         await this.$store.dispatch(FETCH_STABLE_BALANCE);
         await this.$store.dispatch(FETCH_STABLE_PRICE);
      }
   }
</script>

<style scoped>

</style>