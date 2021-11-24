<template>
    <div class="flex ai-center">
        <icon-class
              padding-left="5px"
              icon-class="icon-C-C5"
              font="24"
              color="var(--layoutTopMenuCol)">
        </icon-class>
        <span class="pl-5" :font="layoutSetting.layout.value=='0'?'14':''">{{layoutSetting.layout.value=='0'?'Search...':''}}</span>
    </div>
</template>

<script>
    import {mapGetters} from "vuex";

    export default {
        name: "LayoutHeaderSearch",
        computed: {
            ...mapGetters([
                'layoutSetting',
            ])
        },
    }
</script>

<style scoped>

</style>
