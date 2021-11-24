<template>
    <div>
        <div class="breadcrumb" font="18" font-weight="400">{{breadcrumb[breadcrumb.length-1].name}}</div>
        <el-breadcrumb separator="/" class="mt-5">
            <el-breadcrumb-item
                  v-for="(parent,index) in breadcrumb"
                  :key="index+'breadcrumb'"
            >{{parent.name}}
            </el-breadcrumb-item>
        
        </el-breadcrumb>
     
    </div>
</template>
<script>

    import {mapGetters} from "vuex";
    // import  Dia from '@/components/dialog/Dia.vue'
    export default {
        name: "LayoutBreadcrumb",
        computed: {
            ...mapGetters([
                'breadcrumb',
            ])
        },
        // components:{
        //     Dia
        // },
        data() {
            return {
                value: "",
                drawer: false
            }
        }
    }
</script>

<style lang="scss" scoped>
    .breadcrumb{
        color: var(--layoutBreadcrumbCol);
    }
    
    ::v-deep .el-breadcrumb__inner,
    ::v-deep .el-breadcrumb__separator {
        font-size: 12px;
        font-weight: 400;
        color: $-color-7D8DBF !important;
        
    }
</style>
