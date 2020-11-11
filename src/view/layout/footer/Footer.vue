<template>
    <footer style="background: #f7f8fa;">
        <div class="text-muted m-auto text-center pb-3"
             style="font-size: 10px;position: absolute;left: 0;right: 0;bottom: -50px;">
            <a href="https://paychant.com">
                <i class="mdi mdi-lock powered-lock"></i> {{ $t('layout.footer.powered') }}
                <img src="/images/p_paychant-green.png" alt="logo" width="80">
            </a>
        </div>
    </footer>
</template>

<script>
   export default {
      name: "Footer"
   }
</script>

<style scoped>

</style>