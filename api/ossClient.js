import request from "../js/request";
import { IS_DEV } from "../js/utils";

// oss 直传服务端签名
export const directUpload = (params) => request().post('//develop.yatiku.com/common/toolkit/oss/directUpload', params);

// post
export const urlAuthPostFile = (url, params) =>  {
	let proxyStr = IS_DEV ? '/ossClient': url;

	return request({
		headers: { 'Content-Type': 'multipart/form-data' }
	}).post(proxyStr, params);
}