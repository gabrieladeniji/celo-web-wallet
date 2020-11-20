<template>
   <v-dialog v-model="utils.showModal" width="400">
      <v-card class="pb-4">
         <div class="card-header">
            <h5 class="card-title mb-0">
               {{ $t('modals.privateKeyWarning.warning') }}
            </h5>
         </div>
         <div style="padding: 30px 0;">
            <div class="text-center">
               <img src="/images/p_celo_warning.png" width="100px" alt="warning" />
            </div>
         </div>
         <div class="pt-1 pb-1 p-5 text-center">
            <p>
               {{ $t('modals.privateKeyWarning.thisIsYourPrivate') }}
            </p>
            <button @click="closeModal()" class="mt-1" style="color: #7d838c;border: 1px solid rgb(228 229 230);background-color: rgb(240 241 245);cursor: pointer;border-radius: 9px;padding: 10px 20px;">
               {{ $t('modals.privateKeyWarning.okIGetIt') }}
            </button>
         </div>
      </v-card>
   </v-dialog>
</template>


<script>

   import {bus} from '../../main';

   export default {
      name: "PrivateKeyWarning",
      data() {
         return {
            utils: {
               showModal: false
            }
         }
      },
      methods: {
         closeModal() {
            this.utils.showModal = false;
         },
      },
      mounted() {
         bus.$on('open_private_key_warning', () => {
            this.utils.showModal = true;
         })
      }
   }
</script>


<style scoped>

</style>