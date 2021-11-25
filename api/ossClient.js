import request from "../js/request";
import { IS_DEV } from "../js/utils";

// oss 直传服务端签名
export const directUpload = (params) => request().post('//develop.yatiku.com/common/toolkit/oss/directUpload', params);

// post
export const urlAuthPostFile = (url, params, bucketName) =>  {
	let proxyStr = IS_DEV ? `/ossClient-${bucketName}` : url;

	return request({
		timeout: 60000 * 30,
		headers: { 'Content-Type': 'multipart/form-data' }
	}).post(proxyStr, params);
}