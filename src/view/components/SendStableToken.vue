<template>
    <v-dialog v-model="utils.show_modal" width="500">
        <v-card class="pb-2">

            <div class="card-header">
                <h5 class="card-title mb-0">{{ $t('modals.send.send') }} cUSD</h5>
                <div @click="closeModal()" class="closeIcon-container">
                    <img alt="close" class="close-icon" src="/images/close.png"/>
                </div>
            </div>

            <div class="m-5" v-if="utils.transaction_active" ref="formContent">
                <div class="text-left pb-2">{{ $t('modals.send.receivingAddress') }}</div>
                <v-text-field solo v-model.trim="$v.swap.receiver.$model"></v-text-field>
                <div class="error-text" v-if="!$v.swap.receiver.required">
                   {{ $t('modals.send.receivingAddressReq') }}
                </div>
                <label class="text-left">
                   {{ $t('modals.send.howMuchDoYouWantToSend') }}
                </label>
                <v-text-field @input="onInputAmount()" prefix="cUSD" solo v-model.number="$v.swap.amount.$model"></v-text-field>
                <div class="error-text" v-if="!$v.swap.amount.required">
                   {{ $t('modals.send.amountIsRequired') }}
                </div>
                <div class="error-text" v-if="!$v.swap.amount.decimal">
                   {{ $t('modals.send.amountIsNotValid') }}
                </div>
                <div class="error-text" v-if="utils.amount_not_sufficient">
                   {{ $t('modals.send.amountIsNotSufficient') }}
                </div>
                <div class="text-center">
                    <button @click="sendTransaction()" class="btn-custom text-center m-auto"
                            :class="{disabled: !isFieldsValid}">
                       {{ $t('modals.send.send') }}
                    </button>
                </div>
            </div>

            <div class="m-5" v-if="utils.transaction_sent">
                <div class=" text-center">
                    <img alt="img" class="pt-2" src="/images/success-trade.png" style="width: 50px; margin: 0 auto;"/>
                    <h2 class="pt-3 pb-3">{{ $t('modals.send.successful') }}</h2>
                    <div class="body-2">
                       {{ $t('modals.send.transactionSent') }}
                    </div>
                    <a target="_blank" :href="`https://alfajores-blockscout.celo-testnet.org/tx/${swap.success_tx_hash}`"
                       class="btn btn-custom mt-5">
                       {{ $t('modals.send.checkTransactionOnBlockscout') }}
                    </a>
                </div>
            </div>

        </v-card>
    </v-dialog>
</template>

<script>

   import {bus} from '../../main';
   import {mapGetters} from 'vuex';
   import {required,decimal} from 'vuelidate/lib/validators';
   import {SEND_STABLE_TOKEN} from '../../core/store/modules/exhange';

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
             'stable'
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
            if(this.swap.amount <= this.stable.balance) {
               let load = this.$loading.show({ container:  this.$refs.formContent});
               setTimeout(() => {
                  this.$store.dispatch(SEND_STABLE_TOKEN, { amount: this.swap.amount, receiver: this.swap.receiver }).then((res) => {
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
         },
         resetFields() {
            this.swap.amount = '';
            this.swap.receiver = '';
            this.utils.transaction_sent = false;
            this.utils.transaction_active = true;
            this.utils.amount_not_sufficient = false;
         }
      },
      mounted() {
         bus.$on('open_send_stable_token', () => {
            this.resetFields();
            this.utils.show_modal = true;
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