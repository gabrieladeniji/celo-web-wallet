<template>
    <nav class="navbar navbar-expand-lg navbar-light fixed-top">
        <a class="navbar-brand overflow-hidden" href="/">
            <img alt="Paychant" class="p_brand_logo" src="/images/Celo_Logo_Color.svg" width="150"/>
            <span style="margin-left: -7px;position: relative;top: 3px;font-size: 21px;font-weight: 200;color: #6c757d;">|</span>
            <span class=" text-muted"
                  style="font-size: 12px;position: relative;top: 2px;padding-left: 5px;">{{ $t('layout.navbar.wallet') }}</span>
        </a>

        <!-- Large Screen Header -->
        <div class="collapse navbar-collapse hide-sm hide-md" id="navbarSupportedContent">
            <ul class="navbar-nav ml-auto">
                <li class="nav-item dropdown dropdown-country">
                    <div aria-expanded="true" aria-haspopup="true" class="nav-link" data-toggle="dropdown"
                         id="dropdown" style="color: #42566b !important;">
                        <span class="ml-2 c-languages-dropdown"> {{ utils.locale.name }}
                            <span class="pull-right">
                                <span :class="`ml-2 flag-icon flag-icon-${locale.iso2} country-flag-icon`"></span>
                                <i class="pl-2 fa fa-chevron-down c-Nav-dropdown-fa"></i>
                            </span>
                        </span>
                    </div>
                    <div aria-labelledby="dropdown" class="dropdown-menu country-dropdown-menu">
                        <template v-for="el in utils.localizations">
                            <a class="country-dropdown-item dropdown-item" @click="swapLocalization(el)"
                               :class="{'dropdown-active': el.iso2 === utils.locale.iso2}">
                                <span class="pr-2">{{ el.name }}</span>
                                <div :class="`pull-right flag-icon flag-icon-${el.iso2} country-flag-icon`" style=" font-size: inherit !important;"></div>
                            </a>
                        </template>
                    </div>
                </li>
                <li v-if="wallet && stable.done && gold.done">
                    <button @click="logOut()"
                            style="margin-top: 30px;margin-left: 20px;height: 36px;padding: 5px 11px;color: rgb(46 51 56);border: 1px solid #2e3338;border-radius: 6px;">
                        {{ $t('layout.navbar.logout') }}
                    </button>
                </li>
            </ul>
        </div>
        <!-- End of Large Screen Header -->

        <!-- Small Screen Header -->
        <nav class="navbar navbar-main navbar-expand-lg navbar-light hide-lg">
            <ul class="navbar-nav ml-auto">
                <li v-if="wallet && stable.done && gold.done">
                    <button @click="logOut()"
                            style="margin-top: 0;margin-right: 20px;height: 36px;padding: 5px 11px;color: rgb(46 51 56);border: 1px solid #2e3338;border-radius: 6px;">
                        {{ $t('layout.navbar.logout') }}
                    </button>
                </li>
            </ul>
        </nav>
        <!-- Small Screen Header -->
    </nav>
</template>

<script>

   import {mapGetters} from 'vuex';
   import {CLEAR_WALLET} from '../../../core/store/modules/auth';
   import {SET_LOCALE} from "../../../core/store/modules/locale";
   import {CLEAR_ASSETS_BALANCE} from '../../../core/store/modules/exhange';

    export default {
       name: "Navbar",
       data() {
          return {
             utils: {
                localizations: [
                   {name: 'English', iso2: 'gb'},
                   {name: 'German', iso2: 'de'},
                   {name: '繁體中文', iso2: 'cn'},
                   {name: 'Français', iso2: 'fr'},
                   {name: 'Español', iso2: 'es'},
                   {name: 'Русский', iso2: 'ru'}
                ],
                locale: {
                   iso2: 'gb',
                   name: 'English',
                }
             }
          }
       },
       computed: {
          ...mapGetters([
             'gold',
             'locale',
             'wallet',
             'stable',
          ])
       },
       methods: {
          async logOut() {
             await this.$store.dispatch(CLEAR_WALLET);
             await this.$store.dispatch(CLEAR_ASSETS_BALANCE);
             this.$router.push({name: 'index'});
          },
          async swapLocalization(el) {
             this.utils.locale.iso2 = el.iso2;
             this.utils.locale.name = el.name;
             await this.$store.dispatch(SET_LOCALE, this.utils.locale);
             window.location.reload();
          }
       },
       created() {
          this.utils.locale = this.locale;
       }
    }
</script>

<style scoped>
    a.dropdown-active {
        background: #9fcdff;
    }

    .page-item.active .page-link {
        z-index: 1;
        color: #fff !important;
        background-color: #46d286 !important;
        border-color: #35d080 !important;
    }

    .navbar {
        -webkit-transition: all 0.2s ease-in-out;
        transition: all 0.2s ease-in-out;
        padding: 2px 230px !important;
        line-height: 1;
        background: #f7f8fa;
        height: 83px;
        z-index: 10;
    }

    .nav-item {
        padding-right: 25px !important;
        font-weight: 600;
        color: #031b4e;
    }

    .dropdown-country {
        position: relative;
        left: 26px;
    }

    .nav-item {
        padding-right: 25px !important;
        font-weight: 600;
        color: #031b4e;
    }

    .nav-link {
        cursor: pointer;
        display: block;
        padding: 2.0rem 1rem 1.7rem 1rem;
        font-size: 15px;
        font-weight: 400;
    }

    .c-Nav-dropdown-fa {
        font-size: 9px !important;
        position: relative;
        top: -2px;
        left: 3px;
        color: #38d081;
    }

    .country-flag-icon {
        border-radius: 2px;
        font-size: 19px;
    }

    .country-dropdown-menu {
        width: 11.7rem;
        left: 13px;
        top: 73px;
        background-color: #fff;
        border-radius: 4px;
        border: 1px solid #efefef !important;
        box-shadow: 0 8px 16px 0 rgba(3, 49, 86, 0.08);
    }

    .country-dropdown-item {
        font-weight: 500;
        padding: 10px 18px;
        line-height: 21px;
        text-align: left;
    }


    .dropdown-toggle::after {
        display: none !important;
    }

    .c-languages-dropdown {
        -moz-user-select: none;
        -ms-user-select: none;
        font-weight: 500;
        line-height: 44px;
    }

    .mobile-nav-button {
        border: 1px solid #42566b;
        color: rgb(66, 86, 107) !important;
        border-radius: 5px;
        cursor: pointer;
        display: inline-block;
        font-size: 1rem;
        white-space: nowrap;
        vertical-align: middle;
        -webkit-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
        height: 40px;
        width: auto;
        font-weight: 600;
        line-height: 39px;
        outline: none;
        padding: 0 15px;
        position: relative;
        will-change: transform, box-shadow;
        -webkit-transition: ease-in-out 0.3s all;
        transition: ease-in-out 0.3s all;
    }

    @media (max-width: 767px) and (min-width: 300px) {
        .navbar {
            padding: 2px 0 !important;
        }

        .hide-sm {
            visibility: hidden;
            float: none !important;
            display: none !important;
        }

    }

    @media (min-width: 768px) and (max-width: 991px) {
        .navbar {
            padding: 2px 40px !important;
        }
    }

    @media (min-width: 768px) and (max-width: 991px) {
        .hide-md {
            visibility: hidden;
            float: none !important;
            display: none !important;
        }
    }

    @media (min-width: 992px) and (max-width: 1157px) {
        .hide-lg {
            visibility: hidden;
            float: none !important;
            display: none;

        }
    }

    @media (min-width: 1158px) and (max-width: 1280px) {
        .hide-lg {
            visibility: hidden;
            float: none !important;
            display: none;
        }
    }

    @media only screen and (max-width: 6000px) and (min-width: 1200px) {
        .hide-lg {
            visibility: hidden;
            float: none !important;
            display: none;
        }
    }
</style>