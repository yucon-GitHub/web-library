import request from './request';
import * as utils from './utils';
import moment from 'moment';
import device from "./device";

/**
 * components
 */
import qiankeTable from '../components/table.vue';
import qiankeUploadFile from '../components/uploadFile.vue';
import qiankePagination from '../components/pagination.vue';
import qiankeTextToQrCode from '../components/qrCode.vue';

export {
  // 请求
  request,
  // 工具
  utils,
  // 时间
  moment,
  // 设备环境
  device,

  // 组件
  qiankeTable,
  qiankeUploadFile,
  qiankePagination,
  qiankeTextToQrCode
};
