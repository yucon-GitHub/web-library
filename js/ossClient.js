import { directUpload, urlAuthPostFile } from '../api/ossClient';

import OSS from 'ali-oss';

/**
 *
 * @param securityType 安全类型 目前支持 Policy 签名方式；STS授权为可拓展功能 (支持分片、断点续传)
 * @param initObj 仅在 STS 授权模式下支持，实例客户端需要的参数
 * @returns {Promise<boolean | any>}
 */
export default async (initObj = {}) => {
  let CLIENT = null;
  const { bucketName = 'yatiku', dir = '', fileName = '', expireTime = 30, securityType = 'POLICY' } = initObj;

  switch (securityType) {
    case 'POLICY':
    {
      let params = {
        bucketName,
        dir,
        expireTime,
        key: fileName
      };

      let { code, data } = await directUpload(params);
      if (code === 200) {
        return policyModeMethods(data, params);
      } else {
        return false;
      }
    }

    case 'STS':
    {
      const { data = {} } = await directUpload();

      const { accessKeyId, accessKeySecret } = data;

      CLIENT = new OSS({
        region: '',
        bucket: bucketName,
        accessKeyId,
        accessKeySecret
      });

      return stsModeMethods(CLIENT);
    }
  }
};

/**
 * sts模式提供的方法
 * @param CLIENT
 * @returns {{multipartUpload: (function(*, *=): *), put: (function(*, *=): *)}}
 */
export const stsModeMethods = (CLIENT) => {
  return {
    multipartUpload: (dir, file) => {
      return CLIENT.multipartUpload(`${dir}/${file.name}`, file);
    },

    put: (dir, file) => {
      return CLIENT.put(`${dir}/${file.name}`, file);
    }
  };
};

/**
 * policy 提供的方法
 * @param data
 * @param authParams
 * @returns {{put: (function(*=): *)}}
 */
export const policyModeMethods = (data, authParams) => {
  return {
    put: async (file) => {
      let formData = new FormData();
      formData.append('key', `${authParams.dir}${authParams.key}`);
      formData.append('OSSAccessKeyId', data.accessid);
      formData.append('policy', data.policy);
      formData.append('success_action_status', 200);
      formData.append('signature', data.signature);
      formData.append('file', file);

      try {
        await urlAuthPostFile(data.host, formData);
        return data.visitUrl;
      } catch {
        return new Promise.reject();
      }
    }
  };
}