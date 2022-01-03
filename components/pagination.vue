<!--
/**
 * @fileName: 分页组件
 * @author: yucon
*/
*/
-->
<template>
  <div class="pagination text-center pb-15">
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :currentPage="value.page"
      :page-sizes="pageSize"
      :pageSize="value.size"
      layout="total, sizes, prev, pager, next"
      :total="value.total"
    >
    </el-pagination>
  </div>
</template>

<script>
import { ElPagination } from 'element-plus';

export default {
  name: 'pagination',

  props: {
    value: {
      type: Object,
      default: () => {}
    },

    pageSize: {
      type: Array,
      default: () => [10, 20, 50, 100]
    }
  },

  components: {
    ElPagination
  },

  setup(props, context) {
    /**
     * 修改每页条数，重置页码
     * @param event
     */
    const handleSizeChange = event => {
      context.emit('update:value', { ...props.value, size: event, page: 1 });
      context.emit('change-page');
    };

    /**
     * 修改页码
     * @param event
     */
    const handleCurrentChange = event => {
      context.emit('update:value', { ...props.value, page: event });
      context.emit('change-page');
    };

    return {
      handleSizeChange,
      handleCurrentChange,

      props
    };
  }
};
</script>
