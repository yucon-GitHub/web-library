/**
 * 格式化字符串拼接参数
 * @param query 拼接的参数字符串
 * @return params 返回对象属性
 */
export const formatParams = (query = location.search) => {
  let params = {};

  if (!query) return params;

  let str = query.includes('?') ? query.split('?')[1] : query;
  let strs = str.split('&');
  strs.map(
    item =>
      (params[item.split('=')[0]] = decodeURIComponent(item.split('=')[1]))
  );

  console.log('当前获取到的参数：', params);
  return params;
};

/**
 * @method throttle 函数节流
 * @param {Function} fn 需要执行的函数
 * @param {Number} interval 节流间隔
 */
export const throttle = (fn, interval = 1000) => {
  let run = true;

  return function() {
    if (!run) return;
    run = false;
    setTimeout(() => {
      fn.apply(this, arguments);
      run = true;
    }, interval);
  };
};

/**
 * @method debounce 函数防抖
 * @param {Function} fn 需要执行的函数
 * @param {Number} interval 防抖间隔
 */
export const debounce = (fn, interval = 500) => {
  let timeout = null;

  return function() {
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      fn.apply(this, arguments);
    }, interval);
  };
};

/**
 * @method URLToBase64 链接转Base64
 * @param {String} url 图片链接
 * @return {String} Base64地址
 */
export const URLToBase64 = (url) => {
  return new Promise((resolve, reject) => {
    try {
      let canvas = document.createElement("canvas");
      let ctx = canvas.getContext("2d");
      let img = new Image();

      img.crossOrigin = "Anonymous";
      img.onload = () => {
        canvas.height = img.height;
        canvas.width = img.width;
        ctx.drawImage(img, 0, 0);

        let base64 = canvas.toDataURL("image/png");
        resolve(base64);
      };

      img.src = url;
    } catch (err) {
      reject(err);
    }
  });
};

/**
 * @method HexToRGB
 * @param {String} hex 16进制字符串
 * @return {String} RGB字符串
 */
export const HexToRGB = (hex, opacity) => {
  let reg = /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/;
  let color = hex.toLowerCase();

  // 正则检测
  if (reg.test(color)) {
    if (color.length === 4) {
      let colorNew = "#";
      for (let i = 1; i < 4; i += 1) {
        colorNew += color.slice(i, i + 1).concat(color.slice(i, i + 1));
      }
      color = colorNew;
    }
    let colorChange = [];
    for (let i = 1; i < 7; i += 2) {
      colorChange.push(parseInt("0x" + color.slice(i, i + 2)));
    }
    return opacity
      ? `rgba(${colorChange.join(", ")}, ${opacity})`
      : `rgb(${colorChange.join(", ")})`;
  } else {
    return color;
  }
};

/**
 * @method RGBToHex
 * @param {String} rgb RGB字符串
 * @return {String} 16进制字符串
 */
export const RGBToHex = (rgb) => {
  let reg = /^(rgb|RGB)/;
  let color = rgb;

  // 正则检测
  if (reg.test(color)) {
    let strHex = "#";
    let colorArr = color.replace(/(?:\(|\)|rgb|RGB)*/g, "").split(",");
    for (let i = 0; i < colorArr.length; i++) {
      let hex = Number(colorArr[i]).toString(16);
      if (hex === "0") {
        hex += hex;
      }
      strHex += hex;
    }
    return strHex;
  } else {
    return String(color);
  }
};

/**
 * @method setClipboardText 设置剪贴板内容
 * @param {String} content 内容
 */
export const setClipboardText = content => {
  return new Promise((resolve, reject) => {
    if (!content || typeof content != "string") return reject();

    let input = document.createElement("input");

    input.setAttribute("readonly", "readonly");
    input.setAttribute("value", content);
    input.style.cssText = `position: fixed; top: -200vh; left: -200vw; opacity: 0;`;

    document.body.appendChild(input);

    input.select();
    input.setSelectionRange(0, 9999);

    if (document.execCommand("copy")) {
      document.execCommand("copy");
      resolve();
    } else {
      reject();
    }
  });
};
