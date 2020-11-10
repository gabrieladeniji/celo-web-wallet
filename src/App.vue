<template>
    <v-app>
        <v-content>
            <router-view></router-view>
        </v-content>
    </v-app>
</template>

<script>
   export default {
      name: "App",
      components: {},
      data() {
         return {};
      }
   };
</script>

<style>

    #app {
        width: 100%;
        height: 100%;
        /* font-family: 'Avenir', Helvetica, Arial, sans-serif; */
    }

    .application--wrap {
        min-height: auto !important;
    }

    .theme--light.application {
        background: #fafafa;
        color: rgba(64, 61, 61, 0.87);
    }

    a {
        color: inherit !important;
    }

    .Network_color_active {
        max-width: 100% !important;
        min-width: 100% !important;
    }

    .Network_color_inactive {
        max-width: 100% !important;
        min-width: 100% !important;
    }
</style>