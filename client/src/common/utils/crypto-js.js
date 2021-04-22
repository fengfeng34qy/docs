import CryptoJS from 'crypto-js'

const key = CryptoJS.enc.Utf8.parse("1234123412ABCDEF") // 秘钥必须为：8/16/32位
const iv = CryptoJS.enc.Utf8.parse('ABCDEF1234123412')

export default {
  // 加密
  encrypted (pwd) {
    let result = CryptoJS.DES.encrypt(pwd, key, {
      iv: iv,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7
    })
    return result.toString()
  },
  // 解密
  decrypted (encrypted) {
    let result = CryptoJS.DES.decrypt(encrypted, key, {
      iv: iv,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7
    })
    return result.toString(CryptoJS.enc.Utf8)
  }
}
// console.log(decrypted.toString(CryptoJS.enc.Utf8))  // 123456
