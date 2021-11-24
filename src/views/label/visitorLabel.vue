<template>
  <e-container-list-n @query="query" @reset="reset">
    <!-- 全局操作 开始 -->
    <template #global-oper="{ buttonAttr }">
      <e-button-n v-bind="buttonAttr" icon="icon-F-F2" @click="add">添加标签</e-button-n>
    </template>
    <!-- 全局操作 结束 -->

    <!-- 查询表单 开始 -->
    <template #query-form="{ queryFormAttr }">
      <el-form v-bind="queryFormAttr" :model="queryForm">
        <el-form-item>
          <el-input v-model="queryForm.titleOrContent" placeholder="请输入标签或关键词"></el-input>
        </el-form-item>
        <el-form-item prop="openStatus">
          <el-select v-model="queryForm.openStatus" placeholder="请选择启用状态" clearable filterable style="width: 200px">
            <el-option v-for="(item, index) in faultStatusOptions" :key="index" :label="item.label" :value="item.value" />
          </el-select>
        </el-form-item>
      </el-form>
    </template>
    <!-- 查询表单 结束 -->
    <template #query-form-oper="{ buttonAttr }">
      <e-button-n v-bind="buttonAttr" type="primary" @click="query">查询</e-button-n>
      <e-button-n v-bind="buttonAttr" @click="clear">重置</e-button-n>
    </template>

    <!-- 查询列表 开始 -->
    <template #query-table="{ queryTableAttr }">
      <e-table-sp v-bind="queryTableAttr" v-loading="loading" :tableColumnData="tableColumnData" :data="tableData">
        <template #status="{ row }">
          <e-switch-sp
            active-text=""
            inactive-text=""
            width="60px"
            statePosition="i"
            title=""
            borderWidth="0px"
            height="32px"
            :active-value="1"
            :inactive-value="0"
            :isPopover="false"
            :before-change="(val) => productsBeforeChange(val, row)"
            :stateText="row.openStatus"
            innerTextWidth="40px"
            v-model="row.openStatus"
          />
        </template>
        <template #oper="{ row }">
          <e-button-n @click="edit(row)">编辑</e-button-n>
          <e-button-n @click="remove(row)">删除</e-button-n>
        </template>
      </e-table-sp>
    </template>
    <!-- 查询列表 结束 -->

    <!-- 列表分页 开始 -->
    <template #table-page="{ tablePageAttr }">
      <el-pagination
        v-bind="tablePageAttr"
        @size-change="pageSizeChange"
        @current-change="pageNumberChange"
        :current-page="pageNo"
        :page-size="pageSize"
        :total="totalNumber"
      />
    </template>
    <!-- 列表分页 结束 -->

    <add ref="add" @renew="renew" />
  </e-container-list-n>
</template>
<script>
import add from './add.vue';
export default {
  props: [],
  data() {
    return {
      queryForm: {
        titleOrContent: '',
        openStatus: '',
      },
      faultStatusOptions: [
        { label: '开启', value: '1' },
        { label: '关闭', value: '0' },
      ],
      loading: false, // 列表加载控制
      // 列表展示列
      tableColumnData: [
        { minWidth: '200px', label: '标签', prop: 'title' },
        { minWidth: '200', label: '匹配关键词', prop: 'content' },
        { width: '200px', label: '启用状态', slotName: 'status' },
        { width: '200px', label: '操作', slotName: 'oper' },
      ],
      tableData: [], // 列表数据
      pageNo: 1, // 页码
      pageSize: 10, // 每页大小
      totalNumber: 0, // 列表总条数
    };
  },
  components: {
    add,
  },
  mounted() {},
  methods: {},
};
</script>
<style>
</style>
