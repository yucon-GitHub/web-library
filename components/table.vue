<!-- 公用报表表头 -->
<template>
  <div class="table-title">
    <el-table
      class="table"
      :data="list"
      :show-summary="showSummary"
      :height="height"
      :border="border"
      ref="table"
      row-key="treeId"
      :tree-props="treeShape"
      :header-cell-class-name="rowClass"
      :summary-method="getSummaries"
      :span-method="spanMethod"
      :row-class-name="({ row }) => rowClassName(row)"
      :cell-style="cellStyle"
      @sort-change="remoteSort"
      @row-click="
        (row, column, event) => {
          $emit('rowClick', row, column, event);
        }
      "
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" v-if="selectionList" />
      <el-table-column
        :prop="item.prop"
        :label="item.label"
        :width="item.width || null"
        v-for="(item, index) in tableTitle"
        :key="index"
        :sortable="item.sortable"
        :fixed="item.fixed"
        :align="item.align"
      >
        <!-- 表头 -->
        <template #header>
          <span>{{ item.label }}</span>
          <el-tooltip
            effect="dark"
            :content="item.tips"
            placement="bottom"
            v-if="item.tips"
          >
            <i class="el-icon-question ml-5 cl-warning fz-15"></i>
          </el-tooltip>
        </template>

        <!-- 内容 -->
        <template #default="scope">
          <slot :name="item.prop" :item="scope.row" :index="scope.$index">
            <div v-html="scope.row[item.prop]"></div
          ></slot>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { ElTable, ElTableColumn, ElTooltip } from 'element-plus';
export default {
  name: 'tableTitle',

  components: {
    ElTable,
    ElTableColumn,
    ElTooltip
  },

  props: {
    // 表头
    tableTitle: {
      type: Array,
      default: () => []
    },

    border: {
      type: Boolean,
      default: true
    },

    list: {
      type: Array,
      default: () => []
    },

    // 高度
    height: {
      type: [String, Number],
      default: null
    },

    // 合计
    showSummary: {
      type: Boolean,
      default: false
    },

    // 需要忽略合计的字段
    ignoresSummary: {
      type: Array,
      default: () => []
    },

    spanMethod: {
      type: Function,
      default: () => {}
    },

    // 根据参数变化 修改行样式
    cellStyle: {
      type: Function,
      default: () => {}
    },

    // 树形结构
    treeShape: {
      type: Object,
      default: () => {}
    },

    // 树形结构(row-key)
    treeId: {
      type: String,
      default: ''
    },

    rowClassName: {
      type: Function,
      default: () => {}
    },

    selectionList: {
      type: Boolean,
      default: false
    }
  },

  setup(props, context) {
    /**
     * 自定义合计
     * @param param
     * @returns {Array}
     */
    const getSummaries = param => {
      let { columns, data } = param;
      let sums = [];
      let ignores = props.ignoresSummary;
      columns.forEach((column, index) => {
        if (index === 0) {
          sums.unshift('总计');
          return;
        }

        const values = data.map(item => Number(item[column.property]));
        if (
          !values.every(value => isNaN(value)) &&
          !ignores.includes(column.property)
        ) {
          if (this.tableTitle[index].total) {
            sums[index] = this.tableTitle[index].total;
          } else {
            sums[index] = values.reduce((prev, curr) => {
              const value = Number(curr);
              if (!isNaN(value)) {
                return prev + Math.floor(value || 0);
              } else {
                return prev;
              }
            }, 0);
          }
        } else {
          sums[index] = '-';
        }
      });

      return sums;
    };

    const rowClass = ({ columnIndex }) => {
      return props.tableTitle[columnIndex] && props.tableTitle[columnIndex].headerClassName;
    };

    const remoteSort = ({ prop, order }) => {
      context.emit('sortChange', prop, order);
    };

    const handleSelectionChange = val => {
      context.emit('update:selectionList', val);
    };

    return {
      getSummaries,
      rowClass,
      remoteSort,
      handleSelectionChange
    };
  }
};
</script>
