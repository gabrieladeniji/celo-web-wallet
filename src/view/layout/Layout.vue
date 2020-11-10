<template>
    <div class="page-content">

        <div class="container">

            <!-- Nav -->
            <app-navbar />

            <!-- Header -->
            <app-header />
            <app-tab-header v-if="wallet && gold.done && stable.done" />

            <!-- Modals -->
            <app-import-wallet />
            <app-deposit-token />
            <app-send-gold-token />
            <app-send-stable-token />

            <!-- views -->
            <router-view />

            <!-- footer -->
            <app-footer />

        </div>

    </div>
</template>


<script>

   import Navbar from './navbar/Navbar';
   import Header from './header/Header';
   import Footer from './footer/Footer';
   import TabHeader from './header/TabHeader';
   import ImportWallet from '../components/ImportWallet';
   import DepositToken from '../components/DepositToken';
   import SendGoldToken from '../components/SendGoldToken';
   import SendStableToken from '../components/SendStableToken';

   import {mapGetters} from 'vuex'

   export default {
      name: "Layout",
      components: {
         appNavbar: Navbar,
         appHeader: Header,
         appFooter: Footer,
         appTabHeader: TabHeader,
         appImportWallet: ImportWallet,
         appDepositToken: DepositToken,
         appSendGoldToken: SendGoldToken,
         appSendStableToken: SendStableToken
      },
      computed: {
         ...mapGetters([
             'gold',
             'stable',
             'wallet'
         ])
      }
   }
</script>


<style type="scss">

    /* style.css */
    @import "../../assets/css/style.less";

    /* Flag Icon */
    @import "~flag-icon-css/css/flag-icon.min.css";

    /* Fontawesome Free */
    @import "~@fortawesome/fontawesome-free/css/all.min.css";

    .v-text-field input {
        font-size: 12px !important;
    }
</style>