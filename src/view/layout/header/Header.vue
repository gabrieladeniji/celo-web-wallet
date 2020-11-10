<template>
    <div class="text-center pb-5 pt-4">
        <h1>Celo web wallet</h1>
        <p class="font-weight-medium subheading pt-2">Easy way to store, send, receive and hold celo tokens.</p>
    </div>
</template>

<script>

   import {mapGetters} from 'vuex';
   import {CLEAR_WALLET} from '../../../core/store/modules/auth';
   import {CLEAR_ASSETS_BALANCE} from '../../../core/store/modules/exhange';

   export default {
      name: "Header",
      computed: {
         ...mapGetters([
            'gold',
            'wallet',
            'stable',
         ])
      },
      methods: {
         async logOut() {
            await this.$store.dispatch(CLEAR_WALLET);
            await this.$store.dispatch(CLEAR_ASSETS_BALANCE);
            this.$router.push({name: 'index'});
         }
      }
   }
</script>

<style scoped>

</style>