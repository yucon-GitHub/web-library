<template>
  <div class="upload">
    <el-upload
      :accept="accept"
      :action="
        $isDev
          ? '/dev/tool/uploadFileOss'
          : '//app.yatiku.com/tool/uploadFileOss'
      "
      :multiple="multiple"
      :show-file-list="false"
      :before-upload="onBeforeUpload"
      :on-success="
        res => {
          $emit('uploadSuccess', res);
          loading = false;
        }
      "
    >
      <div class="box box-column-center">
        <div v-loading="loading">
          <slot name="button">
            <el-button
              size="small"
              type="primary"
              :loading="loading"
              :disabled="loading"
            >
              {{ loading ? "正在" : "点击" }}上传</el-button
            >
          </slot>
        </div>
      </div>
    </el-upload>
  </div>
</template>

<script>
import { ElUpload, ElMessageBox } from 'element-plus';
export default {
  name: "upload",

  components: {
    ElUpload,
    ElMessageBox
  },

  props: {
    accept: {
      type: String,
      default: "image/jpg, image/png, image/jpeg, image/gif"
    },

    multiple: {
      type: Boolean,
      default: false
    },

    // 文件限制大小，单位MB
    limitSize: {
      type: Number,
      default: 20
    }
  },

  data() {
    return {
      loading: false,
      $isDev: process.env.NODE_ENV === 'development'
    };
  },

  methods: {
    onBeforeUpload(file) {
      this.loading = true;

      if (1024 * 1024 * this.limitSize < file.size) {
        ElMessageBox.error("文件大于20MB，无法上传");
        return false;
      }

      this.$emit("onBeforeUpload", file);
    }
  }
};
</script>
