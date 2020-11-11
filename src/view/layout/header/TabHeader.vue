<template>
    <nav class="navbar navbar-expand-lg navbar-expand-md navbar-expand-sm navbar-light bg-light mt-3 p-0">
        <div class="collapse navbar-collapse" id="navbarNav">
            <ul class="navbar-nav">
                <router-link class="page-item" active-class="active" tag="li" to="/gold-token">
                    <a class="page-link">{{ $t('layout.tabHeader.celo_gold') }}</a>
                </router-link>
                <router-link class="page-item" active-class="active" tag="li" to="/stable-token">
                    <a class="page-link">{{ $t('layout.tabHeader.celo_usd') }}</a>
                </router-link>
            </ul>
        </div>
    </nav>
</template>

<script>
   export default {
      name: "TabHeader"
   }
</script>

<style scoped>
    .page-item.active .page-link {
        z-index: 1;
        color: #fff !important;
        background-color: #46d286 !important;
        border-color: #35d080 !important;
    }
</style>