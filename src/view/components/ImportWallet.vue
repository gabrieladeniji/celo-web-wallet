<template>
    <v-dialog v-model="utils.showModal" width="500">
        <v-card class="pb-2">
            <div class="card-header">
                <h5 class="card-title mb-0">Access wallet by Private Key</h5>
                <div @click="closeModal()" class="closeIcon-container">
                    <img alt="close" class="close-icon" src="/images/close.png"/>
                </div>
            </div>
            <div class="m-5" ref="importWallet">
                <div class="text-left pb-2">Enter Private Key</div>
                <v-text-field @input="onChangePrivateKey" solo v-model.trim="swap.private_key"></v-text-field>
                <div class="error-text" v-if="!$v.swap.private_key.required">Private key is required</div>
                <div class="error-text" v-if="swap.error_msg">{{swap.error_msg}}</div>
                <div class="text-center">
                    <button :class="{'disabled': !$v.swap.private_key.required}" @click="importKey()"
                            class="btn-custom text-center m-auto mt-2">
                        Next
                    </button>
                </div>
            </div>
            <div class="m-3">
                <div class="font-weight-bold body-2 text-muted">
                    You can use this testing PK
                </div>
                <p class="text-muted pt-2" style="font-size: 12px">
                    0xbb82646af650a7086f3ce35f01385fefef3ded9bc893256029477b8dd45ba4b4 <br/>
                    0x40ebc0d835965269fe26f78246d63a0c91d660fa477f61425487cdd271e2d65c
                </p>
            </div>
        </v-card>
    </v-dialog>
</template>

<script>

   import {bus} from '../../main';
   import {required} from 'vuelidate/lib/validators';
   import {IMPORT_WALLET} from '../../core/store/modules/auth';
   import {FETCH_GOLD_BALANCE, FETCH_STABLE_BALANCE} from '../../core/store/modules/exhange';

   export default {
      name: "ImportWallet",
      data() {
         return {
            utils: {
               showModal: false
            },
            swap: {
               error_msg: '',
               private_key: ''
            }
         }
      },
      validations: {
         swap: {
            private_key: {
               required
            }
         },
      },
      methods: {
         closeModal() {
            this.utils.showModal = false;
         },
         onChangePrivateKey() {
            this.resetField();
         },
         importKey() {
            this.resetField();
            let loader = this.$loading.show({container: this.$refs.importWallet});
            Promise.all([
               this.$store.dispatch(IMPORT_WALLET, this.swap.private_key)
                   .then(() => this.$store.dispatch(FETCH_STABLE_BALANCE))
                   .then(() => this.$store.dispatch(FETCH_GOLD_BALANCE))
            ]).then(() => {
               loader.hide();
               this.closeModal();
              this.$router.push({name: 'goldToken'});
            }).catch((err) => {
               loader.hide();
               this.swap.error_msg = err;
            });
         },
         resetField() {
            this.swap.error_msg = '';
         }
      },
      mounted() {
         bus.$on('open_import_wallet', () => {
            this.utils.showModal = true;
         })
      }
   }
</script>

<style scoped>
    .error-text {
        margin-top: -15px;
        color: red;
        font-size: 10px;
    }

    .disabled {
        opacity: 0.5;
        cursor: not-allowed;
        pointer-events: none;
    }
</style>