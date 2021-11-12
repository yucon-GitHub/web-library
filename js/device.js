/*
 * @Author: yucon
 * @Purpose: 获取设备信息
 */

const ua = window.navigator.userAgent.toLowerCase();

export default {
  isPC: !ua.match(/(iphone|ipod|android|ios|ipad)/),
  isMobile: !!ua.match(/(iphone|ipod|android|ios|ipad)/),
  isAndroid: ua.includes("android") || ua.includes("adr"),
  isIos: ua.includes("iphone") || ua.includes("ipad"),
  isWechat: ua.includes("micromessenger"),
  isWeibo: ua.includes("weibo"),
  isQQ: ua.includes("qq"),
  isFirefox: ua.includes("firefox"),
  isChrome: ua.includes("chrome"),
  isSafari: ua.includes("safari") && !ua.includes("chrome"),
  isIE: ua.includes("compatible") && ua.includes("msie"),
  isAlipay: ua.includes("alipay"),
};
