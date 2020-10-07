<template>

    <div class="page-content">
        <div class="container">

            <app-header/>
            <app-nav/>

            <!-- Modal -->
            <app-swap-token />
            <app-deposit-token />
            <app-send-gold-token />

            <div class="wallets-container mt-3">
                <div class="row">
                    <div class="col-md-12">
                        <div class="coinWallet-Balcontainer">
                            <div class="coinWallet-logo">
                                <img alt="coin" class="wallet-coin" src="/images/Celo_Glyph_Color.png"/>
                            </div>
                            <div style="position: absolute;right: 25px;top: 14px;">
                                <div class="pb-1" style="color: rgb(152, 161, 178);font-size: 14px;">
                                    1 cGLD ≈ <span style="font-size: 13px;color: #4eaf0a;">$1.96</span>
                                </div>
                            </div>
                            <div class="coinWallet-details" style="max-width: inherit !important;">
                                <div class="pb-2" style="color: rgb(152, 161, 178);font-size: 16px;">
                                    Celo Gold Balance
                                </div>
                                <div>
                                    <span style="font-size: 20px;">{{ gold.balance }} cGLD</span>
                                    <!--<span class="pl-1 text-muted">($0.00)</span>-->
                                </div>
                                <div class="coinWallet-actionBtns mt-3">
                                    <div @click="openSendModal()" class="btn-deposit">Send</div>
                                    <div @click="openDepositModal()" class="btn-deposit">Deposit</div>
                                    <!--<div @click="openSwapModal()" class="btn-deposit">Swap</div>-->
                                </div>
                                <div class="font-weight-bold body-2 pt-4">Wallet private key</div>
                                <p class="body-2 text-muted">
                                    {{ wallet.private_key }}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

   import {bus} from '../../main';
   import Header from '../layout/Header';
   import Nav from '../layout/Nav';
   import DepositToken from '../components/DepositToken';
   import SendGoldToken from '../components/SendGoldToken';
   import SwapToken from '../components/SwapToken';
   import {mapGetters} from 'vuex';
   import {FETCH_GOLD_BALANCE} from '../../core/store/modules/exhange';

   export default {
      name: "GoldToken",
      data() {
         return {}
      },
      components: {
         appNav: Nav,
         appHeader: Header,
         appSwapToken: SwapToken,
         appSendGoldToken: SendGoldToken,
         appDepositToken: DepositToken
      },
      computed: {
         ...mapGetters([
            'gold',
            'wallet'
         ])
      },
      methods: {
         openSendModal() {
            bus.$emit('open_send_gold_token');
         },
         openDepositModal() {
            bus.$emit('open_deposit_token', { name: 'cGLD', address: this.wallet.address });
         },
         openSwapModal() {
            bus.$emit('open_swap_gold_token');
         }
      },
      async mounted() {
         await this.$store.dispatch(FETCH_GOLD_BALANCE);
      }
   }
</script>

<style scoped>

</style>