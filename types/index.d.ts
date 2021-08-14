import { AxiosRequestConfig } from 'axios';

export interface AxiosConfigProps extends AxiosRequestConfig {
  baseUrl?: string;
  showGlobalLoading?: boolean;
  successMessage?: string;
  fail?(res: any): void;
  success?(res: any): void;
  loadingCount?(res: number): void;
}

interface UtilsMethods {
  formatParams(query?: string): any;
  throttle(fn: any, interval?: number): void;
  debounce(fn: any, interval?: number): void;
  URLToBase64(url: string): void;
  HexToRGB(hex: string, opacity: string): void;
  RGBToHex(rgb: string): void;
  setClipboardText(content: string): any;
}

export function request(config?: AxiosConfigProps): any;

export const utils: UtilsMethods;

export const moment: any;
