<template>
    <div>
        <div class="text-center pb-5 pt-4">
            <h2>
                <img src="/images/Celo_Glyph_Color.png" width="28" alt="celo_paychant" />
                Celo web wallet
            </h2>
            <div class="text-muted m-auto text-center pb-3" style="font-size: 10px;">
                <a href="https://paychant.com"><i class="mdi mdi-lock powered-lock"></i>
                    Powered by <img src="/images/p_paychant-green.png" alt="logo" width="80">
                </a>
            </div>
            <p class="font-weight-medium subheading">
                Easy way to send, receive and hold your celo assets
            </p>
        </div>
        <div class="mt-5">
            <div class="title font-weight-medium">Access your Celo wallet</div>
            <div class="body-2 pt-3">This wallet is built on the Celo Alfajores Testnet.</div>
        </div>

        <button v-if="wallet && stable.balance" @click="logOut()"
                style="position: absolute;top: 233px;right: 151px;background-color: tan !important;height: 36px;padding: 5px 11px;color:#fff;">
            Logout
        </button>

    </div>
</template>

<script>

   import {mapGetters} from 'vuex';
   import {CLEAR_WALLET} from '../../core/store/modules/auth';

   export default {
      name: "Header",
      computed: {
         ...mapGetters([
             'wallet',
             'stable'
         ])
      },
      methods: {
         async logOut() {
            await this.$store.dispatch(CLEAR_WALLET);
            this.$router.push({ name: 'index' });
         }
      }
   }
</script>

<style scoped>

</style>