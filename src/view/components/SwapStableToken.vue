<template>
    <v-dialog v-model="utils.show_modal" width="500">
        <v-card class="pb-2">
            <div class="card-header">
                <h5 class="card-title mb-0">Swap Cusd to Celo</h5>
                <div @click="closeModal()" class="closeIcon-container">
                    <img alt="close" class="close-icon" src="/images/close.png"/>
                </div>
            </div>

            <div class="m-5" v-if="utils.transaction_active">
                <div class="text-left pb-2">From (Cusd)</div>
                <v-text-field placeholder="0.0000" v-model="swap.cusd" @keyup="onConvertStable" solo suffix="cUSD"></v-text-field>
                <div class="text-center">
                    <img alt="img" src="/images/swap_vert.png" width="15"/>
                </div>
                <label class="text-left">To (Celo)</label>
                <v-text-field solo v-model="swap.celo" suffix="Celo"></v-text-field>
                <div class="text-center">
                    <button @click="swapStableToGold()" class="btn-custom text-center m-auto">
                        Swap
                    </button>
                </div>
            </div>

            <div class="m-5" v-if="utils.transaction_sent">
                <div class=" text-center">
                    <img alt="img" class="pt-2" src="/images/success-trade.png" style="width: 50px; margin: 0 auto;"/>
                    <h2 class="pt-3 pb-3">Successful</h2>
                    <div class="body-2">
                        Your swap of <strong>0.2939 celo </strong> to <strong>300 cUSD</strong> is Successful.
                    </div>
                    <div class="body-2 mt-5 font-weight-bold">Please reload your cUSD wallet to update balance</div>
                </div>
            </div>

        </v-card>
    </v-dialog>
</template>

<script>

    import {bus} from '@/main';
    import {CONVERT_STABLE_TO_GOLD, SWAP_STABLE_TO_GOLD} from '@/core/store/modules/exhange';

   export default {
      name: "SwapStableToken",
      data() {
         return {
            utils: {
               show_modal: false,
               transaction_sent: false,
               transaction_active: true,
            },
           swap: {
              cusd: 0.0,
              celo: 0.0
           }
         }
      },
      methods: {
         closeModal() {
            this.utils.show_modal = false;
         },
         onConvertStable() {
           if(this.swap.cusd !== '' && this.swap.cusd !== 0) {
             this.$store.dispatch(CONVERT_STABLE_TO_GOLD, this.swap.cusd).then((cvt) => {
               this.swap.celo = cvt;
             }).catch((err) => {
               console.log(err);
               this.swap.celo = '';
             });
           }
         },
        swapStableToGold() {
           this.$store.dispatch(SWAP_STABLE_TO_GOLD, this.swap.cusd).then((res) => {
             console.log(res);
           }).catch((err) => {
             console.log(err);
           })
        }
      },
      mounted() {
         bus.$on('open_swap_gold_token', () => {
            this.utils.show_modal = true;
         })
      }
   }
</script>

<style scoped>

</style>