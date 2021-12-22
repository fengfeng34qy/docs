export default {
  // 生成指定范围随机数
  randomNum(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  },

  // 数字千分位分隔
  format(n) {
    let num = n.toString();
    let len = num.length;
    if (len <= 3) {
      return num;
    } else {
      let temp = '';
      let remainder = len % 3;
      if (remainder > 0) { // 不是3的整数倍
        return num.slice(0, remainder) + ',' + num.slice(remainder, len).match(/\d{3}/g).join(',') + temp;
      } else { // 3的整数倍
        return num.slice(0, len).match(/\d{3}/g).join(',') + temp;
      }
    }
  },

  // 生成随机字符串
  randomString(len) {
    let chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz123456789';
    let strLen = chars.length;
    let randomStr = '';
    for (let i = 0; i < len; i++) {
      randomStr += chars.charAt(Math.floor(Math.random() * strLen));
    }
    return randomStr;
  },

  // 手机号中间四位变成*
  telFormat(tel) {
    tel = String(tel);
    return tel.substr(0, 3) + "****" + tel.substr(7);
  }
};

// https://mp.weixin.qq.com/s/5KYW2aKyVfnomH1EFafPIw
