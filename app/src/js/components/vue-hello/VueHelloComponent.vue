<template>
    <div>
        <span class="hello">Vue! Hello...</span>
    </div>
</template>

<script>
    export default {
        name: "VueHelloComponent"
    }
</script>

<style lang="scss" scoped>
    /deep/ {
        .hello {
            color: red;
        }
    }
</style>