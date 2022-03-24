<!--
/**
 * @fileName: 字符串转换二维码
 * @author: yucon
*/
-->
<template>
  <div class="qr-code text-center">
    <div class="mb-20" id="qrcode"></div>
    <p class="mb-20" v-if="isShowUrl">{{ src }}</p>
    <el-button
      type="primary"
      size="mini"
      v-if="isShowCopyBtn"
      @click="copyUrl"
      >{{ btnText }}</el-button
    >
  </div>
</template>

<script>
import qrCode from "qrcodejs2";
import { utils } from "qianke-web-library";
const { setClipboardText } = utils;
export default {
  name: "qrCode",

  props: {
    // 生成二维码路径
    src: {
      type: String,
      default: ""
    },

    // 是否显示地址
    isShowUrl: {
      type: Boolean,
      default: false
    },

    // 是否显示辅助按钮
    isShowCopyBtn: {
      type: Boolean,
      default: false
    },

    // 按钮文案
    btnText: {
      type: String,
      default: "复制链接"
    },

    copySuccess: {
      type: Function,
      default: () => {}
    },

    copyError: {
      type: Function,
      default: () => {}
    }
  },

  created() {
    this.createQrCode();
  },

  methods: {
    // 生成二维码
    createQrCode() {
      let options = {
        width: 120, // 二维码宽度
        height: 120, // 二维码高度
        text: this.src, // 二维码中的内容
        colorDark: "#000000", // 前景色
        colorLight: "#ffffff", // 背景色
        correctLevel: qrCode.CorrectLevel.H // 容错级别
      };

      this.$nextTick(() => {
        new qrCode("qrcode", options);
      });
    },

    // 复制链接
    copyUrl() {
      setClipboardText(this.src)
        .then(() => {
          this.copySuccess();
        })
        .catch(() => {
          this.copyError();
        });
    }
  }
};
</script>
