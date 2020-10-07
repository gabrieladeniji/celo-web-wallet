<template>
    <v-dialog v-model="utils.show_modal" width="620">
        <v-card class="pb-2">
            <div class="card-header">
                <h5 class="card-title mb-0">Swap cGLD</h5>
                <div @click="closeModal()" class="closeIcon-container">
                    <img alt="close" class="close-icon" src="/images/close.png"/>
                </div>
            </div>

            <div class="m-5" v-if="utils.transaction_active">
                <div class="text-left pb-2">From</div>
                <v-text-field placeholder="0.0000" solo suffix="cGLD"></v-text-field>
                <div class="text-center">
                    <img alt="img" src="/images/swap_vert.png" width="15"/>
                </div>
                <label class="text-left">To</label>
                <v-text-field solo suffix="cUSD"></v-text-field>
                <div class="text-center">
                    <button @click="swapToken()" class="btn-custom text-center m-auto">
                        Swap
                    </button>
                </div>
            </div>

            <div class="m-5" v-if="utils.transaction_sent">
                <div class=" text-center">
                    <img alt="img" class="pt-2" src="/images/success-trade.png" style="width: 50px; margin: 0 auto;"/>
                    <h2 class="pt-3 pb-3">Successful</h2>
                    <div class="body-2">
                        Your swap of <strong>0.2939 Cgld </strong> to <strong>300 cUSD</strong> is Successful.
                    </div>
                    <div class="body-2 mt-5 font-weight-bold">Please reload your cUSD wallet to update balance</div>
                </div>
            </div>

        </v-card>
    </v-dialog>
</template>

<script>

    import {bus} from '../../main';
    import {SWAP_GOLD_TOKEN} from '../../core/store/modules/exhange';

   export default {
      name: "SwapToken",
      data() {
         return {
            utils: {
               show_modal: false,
               transaction_sent: false,
               transaction_active: true,
            }
         }
      },
      methods: {
         closeModal() {
            this.utils.show_modal = false;
         },
         async swapToken() {
            await this.$store.dispatch(SWAP_GOLD_TOKEN);
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