<template>
   <v-dialog v-model="utils.show_modal" width="500">
      <v-card class="pb-2">

         <div class="card-header">
            <h5 class="card-title mb-0">Send cGLD</h5>
            <div @click="closeModal()" class="closeIcon-container">
               <img alt="close" class="close-icon" src="/images/close.png"/>
            </div>
         </div>

         <div class="m-5" ref="formContent" v-if="utils.transaction_active">
            <div class="text-left pb-2">Receiving address</div>
            <v-text-field solo v-model.trim="$v.swap.receiver.$model"></v-text-field>
            <div class="error-text" v-if="!$v.swap.receiver.required">Receiver address required</div>
            <label class="text-left">How much do you want to send?</label>
            <v-text-field @input="onInputAmount()" prefix="cGLD" solo
                          v-model.number="$v.swap.amount.$model"></v-text-field>
            <div class="error-text" v-if="!$v.swap.amount.required">Amount is required</div>
            <div class="error-text" v-if="!$v.swap.amount.decimal">Amount is not valid</div>
            <div class="error-text" v-if="utils.amount_not_sufficient">Amount is not sufficient!</div>
            <div class="text-center">
               <button :class="{disabled: !isFieldsValid}" @click="sendTransaction()"
                       class="btn-custom text-center m-auto">
                  Send
               </button>
            </div>
         </div>

         <div class="m-5" v-if="utils.transaction_sent">
            <div class=" text-center">
               <img alt="img" class="pt-2" src="/images/success-trade.png" style="width: 50px; margin: 0 auto;"/>
               <h2 class="pt-3 pb-3">Successful</h2>
               <div class="body-2">Transaction sent.</div>
               <a :href="`https://alfajores-blockscout.celo-testnet.org/tx/${swap.success_tx_hash}`" class="btn btn-custom mt-5"
                  target="_blank">
                  Check transaction on blockscout
               </a>
            </div>
         </div>

      </v-card>
   </v-dialog>
</template>

<script>

   import {bus} from '../../main';
   import {mapGetters} from 'vuex';
   import {required, decimal} from 'vuelidate/lib/validators';
   import {SEND_GOLD_TOKEN} from '../../core/store/modules/exhange';

   export default {
      name: "SendGoldToken",
      data() {
         return {
            utils: {
               show_modal: false,
               transaction_sent: false,
               transaction_active: true,
               amount_not_sufficient: false,
            },
            swap: {
               amount: '',
               receiver: '',
               success_tx_hash: ''
            }
         }
      },
      validations: {
         swap: {
            receiver: {
               required
            },
            amount: {
               required,
               decimal
            },
         }
      },
      computed: {
         ...mapGetters([
            'gold'
         ]),
         isFieldsValid() {
            return (this.$v.swap.receiver.required && this.$v.swap.amount.required && this.$v.swap.amount.decimal);
         },
      },
      methods: {
         closeModal() {
            this.utils.show_modal = false;
         },
         onInputAmount() {
            this.resetAmountField();
         },
         sendTransaction() {
            if (this.swap.amount <= this.gold.balance) {
               let load = this.$loading.show({container: this.$refs.formContent});
               setTimeout(() => {
                  this.$store.dispatch(SEND_GOLD_TOKEN, {
                     amount: this.swap.amount,
                     receiver: this.swap.receiver
                  }).then((res) => {
                     console.log(res);
                     this.swap.success_tx_hash = res.transactionHash;
                     this.utils.transaction_active = false;
                     this.utils.transaction_sent = true;
                     load.hide();
                  }).catch((err) => {
                     console.log(err);
                     load.hide();
                  });
               }, 1000);
            } else {
               this.utils.amount_not_sufficient = true;
            }
         },
         resetAmountField() {
            this.utils.amount_not_sufficient = false;
         }
      },
      mounted() {
         bus.$on('open_send_gold_token', () => {
            this.utils.show_modal = true;
            this.utils.transaction_sent = false;
            this.utils.transaction_active = true;
            this.utils.amount_not_sufficient = false;
         });
      }
   }
</script>

<style scoped>
   .error-text {
      margin-top: -25px;
      margin-bottom: 10px;
      color: red;
      font-size: 10px;
   }

   .disabled {
      opacity: 0.5;
      cursor: not-allowed;
      pointer-events: none;
   }
</style>