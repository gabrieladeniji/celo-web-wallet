<template>
    <div class="wallets-container mt-3">
        <div class="row">
            <div class="col-md-12">
                <div class="coinWallet-Balcontainer">
                    <div class="coinWallet-logo">
                        <img alt="coin" class="wallet-coin" src="/images/icon-celo-gold-color.png"/>
                    </div>
                    <div style="position: absolute;right: 25px;top: 14px;">
                        <div class="pb-1" style="color: rgb(152, 161, 178);font-size: 14px;">
                            1 celo ≈ <span style="font-size: 13px;color: #4eaf0a;">${{ gold.price }}</span>
                        </div>
                    </div>
                    <div class="coinWallet-details" style="max-width: inherit !important;">
                        <div class="pb-2" style="color: rgb(152, 161, 178);font-size: 16px;">
                            {{ $t('pages.goldToken.celoGoldBalance') }}
                        </div>
                        <div>
                            <span style="font-size: 20px;">{{ gold.balance | amountFormatter }} celo</span>
                        </div>
                        <div class="coinWallet-actionBtns mt-3">
                            <div @click="openSendModal()" class="btn-deposit">{{ $t('pages.goldToken.send') }}</div>
                            <div @click="openDepositModal()" class="btn-deposit">{{ $t('pages.goldToken.deposit') }}</div>
                        </div>
                       <div class="font-weight-bold body-2 pt-4 text-muted">
                          {{ $t('pages.goldToken.walletPrivateKey') }}:
                          <button v-if="!utils.show_pk" @click="togglePk" class="show-btn">
                             {{ $t('pages.goldToken.showKey') }} <i class="fa fa-eye"></i>
                          </button>
                          <button v-else class="show-btn" @click="togglePk">
                             {{ $t('pages.goldToken.hideKey') }} <i class="fa fa-eye-slash"></i>
                          </button>
                       </div>
                        <p v-if="utils.show_pk" class="body-2 pt-2 text-muted">
                            {{ wallet.private_key }}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>


<script>

   import {bus} from '@/main';
   import {mapGetters} from 'vuex';
   import numberMixin from '../../core/mixins/number.mixin';
   import TransactionHistory from '../components/TransactionHistory';
   import {FETCH_GOLD_BALANCE, FETCH_GOLD_PRICE} from '@/core/store/modules/exhange';

   export default {
      name: "GoldToken",
      data() {
         return {
            utils: {
               show_pk: false,
            }
         }
      },
      components: {
         appTransactionHistory: TransactionHistory
      },
      computed: {
         ...mapGetters([
            'gold',
            'wallet'
         ])
      },
      mixins: [numberMixin],
      methods: {
         openSendModal() {
            bus.$emit('open_send_gold_token');
         },
         openDepositModal() {
            bus.$emit('open_deposit_token', {name: 'celo', address: this.wallet.address});
         },
         togglePk() {
            if(!this.utils.show_pk) {
               bus.$emit('open_private_key_warning');
            }
            this.utils.show_pk = !this.utils.show_pk;
         }
      },
      async mounted() {
         await this.$store.dispatch(FETCH_GOLD_PRICE);
         await this.$store.dispatch(FETCH_GOLD_BALANCE);
      },
   }
</script>


<style scoped>

</style>