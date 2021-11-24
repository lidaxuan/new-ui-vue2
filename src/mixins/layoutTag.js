import findData from '@/utils/findData'


export default {

    data() {
        return {
            defaultValue: "",
            tagsList: [],
            result: [],
        }
    },
    watch: {
        defaultActiveMenu(v) {

            if (v != this.easyDetail[0].id) {
                this.defaultValue = v;
                let obj = findData.getParentId(this.layoutTag, v);
                this.$router.push(obj.path);
            } else {
                this.defaultValue = this.easyDetail[0].id;
                let obj = findData.getParentId(this.layoutTag, this.defaultValue);
                if (obj) this.$router.push(this.easyDetail[0].path);
            }
        },
        layoutTag: {
            handler(newVal) {
                this.tagsList = newVal;
            },
            deep: true,
        }
    },
    created() {
        this.result = findData.treeLevel(this.nomalMenu);
    },
    methods: {
        dispatchBreadcrumb(defaultActive, menuList) {
            if( defaultActive!=this.easyDetail[0].id){
                this.$store.dispatch("setDefaultActiveMenu", defaultActive);
                let dispatch = findData.findParentArr(defaultActive, this.result, menuList)
                if (this.layoutSetting.layout.value == "1") {
                    this.$store.dispatch("setDefaultActiveHorizontalMenu", dispatch[0].id);
                }
                this.$store.dispatch("setBreadcrumb", dispatch)
            }else {
                this.$store.dispatch("setDefaultActiveHorizontalMenu", this.easyDetail[0].id);
                this.$store.dispatch("setDefaultActiveMenu", this.easyDetail[0].id);
                this.$store.dispatch("setBreadcrumb", this.easyDetail)
            }
        },
        setLayoutTagId(defaultValue) {
            this.$store.dispatch("setLayoutTagId", defaultValue);
            this.dispatchBreadcrumb(this.defaultActiveMenu, this.nomalMenu)
        },
        // 关闭全部标签
        closeAll() {
            this.$store.dispatch("setLayoutTag", "");
            this.dispatchBreadcrumb(this.defaultActiveMenu, this.nomalMenu)
        },
        // 点击当前tag
        tabClick(v) {
            this.dispatchBreadcrumb(v, this.nomalMenu)
        },
        // 关闭当前标签
        closeCru(v) {
            this.$store.dispatch("setRemoveCurrentTagId", v);
            this.setLayoutTagId([v])
        },
        lrClose(index) {
            const delItem = this.tagsList.splice(index, 1)[0];
            this.setLayoutTagId(delItem ? [delItem.id] : [])
        },
    },
    mounted() {
        this.defaultValue = this.defaultActiveMenu;
        this.tagsList = this.layoutTag;

    }
}
