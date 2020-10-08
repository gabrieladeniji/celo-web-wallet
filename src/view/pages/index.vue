<template>
    <div class="page-content">
        <div class="container">

            <app-header/>
            <app-import-wallet/>

            <div class="wallets-container mt-3">
                <div class="row justify-content-md-center">
                    <div class="col-md-5">
                        <div @click="createWallet()" class="coinWallet-container card" ref="createWallet">
                            <div class="coinWallet-logo">
                                <img alt="wallet" src="/images/new_wallet.png" style="width: 40px;height: 40px;"/>
                            </div>
                            <div class="coinWallet-details">
                                <div class="wallet-coin-name">Create a new wallet</div>
                                <p class="body-1 pt-1">Generate your unique celo wallet in minutes</p>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-5">
                        <div @click="importWallet()" class="coinWallet-container card">
                            <div class="coinWallet-logo">
                                <img alt="wallet" src="/images/import_wallet.png" style="width: 40px;height: 40px;"/>
                            </div>
                            <div class="coinWallet-details">
                                <div class="wallet-coin-name">Import my wallet</div>
                                <p class="body-1 pt-1">Import your celo wallet with your private key</p>
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
   import ImportWallet from '../components/ImportWallet';
   import {CREATE_WALLET} from '../../core/store/modules/auth';
   import {FETCH_GOLD_BALANCE,FETCH_STABLE_BALANCE} from '../../core/store/modules/exhange';

   export default {
      name: "index",
      data() {
         return {}
      },
      components: {
         appHeader: Header,
         appImportWallet: ImportWallet
      },
      methods: {
         async createWallet() {
            let loader = this.$loading.show({container: this.$refs.createWallet});
            await this.$store.dispatch(CREATE_WALLET);
            await this.$store.dispatch(FETCH_GOLD_BALANCE);
            await this.$store.dispatch(FETCH_STABLE_BALANCE);
            loader.hide();
            this.$router.push({name: 'goldToken'});
         },
         importWallet() {
            bus.$emit('open_import_wallet', {});
         }
      }
   }
</script>

<style scoped>

</style>