import { AxiosRequestConfig } from 'axios';

/**
 * request
 */
export interface AxiosConfigProps extends AxiosRequestConfig {
  baseUrl?: string;
  showGlobalLoading?: boolean;
  successMessage?: string;
  fail?(res: any): void;
  success?(res: any): void;
  loadingCount?(res: number): void;
}

/**
 * utils
 */
interface UtilsMethods {
  formatParams(query?: string): any;
  throttle(fn: any, interval?: number): void;
  debounce(fn: any, interval?: number): void;
  URLToBase64(url: string): void;
  HexToRGB(hex: string, opacity: string): void;
  RGBToHex(rgb: string): void;
  setClipboardText(content: string): any;
}

/**
 * ossClient
 */
interface ossInitProps {
  bucketName?: string;
  dir?: string;
  fileName?: string;
  expireTime?: number;
  securityType?: 'POLICY' | 'STS'
}

export function request(config?: AxiosConfigProps): any;

export const utils: UtilsMethods;

export const moment: any;

export const device: any;

export function ossClient(initObj?: ossInitProps): Promise<any | unknown>;

/**
 * 业务组件
 */
export const qiankeTable: any;
export const qiankeUploadFile: any;
export const qiankePagination: any;
export const qiankeTextToQrCode: any;
