import CryptoJS from 'crypto-js'

const des = {
  // des加密
  encryptByDES (message, key) {
    var keyHex = CryptoJS.enc.Utf8.parse(key)
    message = CryptoJS.enc.Utf8.parse(message)
    var encrypted = CryptoJS.DES.encrypt(message, keyHex, {
      mode: CryptoJS.mode.ECB,
      padding: CryptoJS.pad.NoPadding
    })
    // return encrypted.ciphertext.toString().toUpperCase()
    return encrypted.ciphertext.toString()
  },
  // des解密
  decryptByDES (ciphertext, key) {
    var keyHex = CryptoJS.enc.Utf8.parse(key)
    var decrypted = CryptoJS.DES.decrypt({
      ciphertext: CryptoJS.enc.Hex.parse(ciphertext)
    }, keyHex, {
      mode: CryptoJS.mode.ECB,
      padding: CryptoJS.pad.Pkcs7
    })
    return decrypted.toString(CryptoJS.enc.Utf8)
  },
  hexStringToBytes (hex) {
    let len = (hex.length / 2)
    let result = new Array(len)
    let achar = hex.split("")
    for (let i = 0; i < len; i++) {
      let pos = i * 2
      result[i] = this.intToByte(this.toByte(achar[pos]) << 4 | this.toByte(achar[pos + 1]))
    }
    return result
  },
  toByte (c) {
    var b = this.intToByte("0123456789ABCDEF".indexOf(c))
    return b
  },
  intToByte (i) {
    var b = i & 0xFF
    var c = 0
    if (b >= 128) {
      c = b % 128
      c = -1 * (128 - c)
    } else {
      c = b
    }
    return c
  },
  byteXOR (src, src1) {
    return (src & 0xFF) ^ (src1 & 0xFF)
  },
  bytesXOR (src, src1) {
    let length = src.length
    if (length !== src1.length) {
      return null
    }
    let result = []
    for (let i = 0; i < length; i++) {
      result[i] = this.byteXOR(src[i], src1[i])
    }
    return result
  },
  Str2Bytes (str) {
    var pos = 0
    var len = str.length
    if (len % 2 !== 0) {
      return null
    }
    len /= 2
    var hexA = []
    for (var i = 0; i < len; i++) {
      var s = str.substr(pos, 2)
      var v = parseInt(s, 16)
      hexA.push(v)
      pos += 2
    }
    // return this.intToByte(hexA)
    return hexA
  },
  bytes2Str (arr) {
    var str = ""
    for (var i = 0; i < arr.length; i++) {
      var tmp = arr[i].toString(16)
      if (tmp.length === 1) {
        tmp = "0" + tmp
      }
      str += tmp
    }

    return str
  },
  hexCharCodeToStr (hexCharCodeStr) {
    var trimedStr = hexCharCodeStr.trim()
    var rawStr = trimedStr.substr(0, 2).toLowerCase() === "0x" ? trimedStr.substr(2) : trimedStr
    var len = rawStr.length
    if (len % 2 !== 0) {
      alert("Illegal Format ASCII Code!")
      return ""
    }
    var curCharCode
    var resultStr = []
    for (var i = 0; i < len; i = i + 2) {
      curCharCode = parseInt(rawStr.substr(i, 2), 16) // ASCII Code Value
      resultStr.push(String.fromCharCode(curCharCode))
    }
    return resultStr.join("")
  },
  strTo16 (str) {
    var temp = str
    let result = ''
    var ByteCount = 0
    for (let i = 0; i < temp.length; i++) {
      ByteCount = temp.charCodeAt(i)
      if (ByteCount.length === 1) {
        ByteCount = "0" + ByteCount
      }
      ByteCount = ByteCount.toString(16)
      result += ByteCount
    }
    return result
  },
  mac (content, key) {
    // var keyHex = CryptoJS.enc.Utf8.parse('abceabce')
    // console.log('keyHex', keyHex)
    // key = this.strTo16(key)
    let hexstring = this.strTo16(content)
    console.log('转16进制字符串', hexstring)
    let buff = this.hexStringToBytes(hexstring)
    console.log('16进制转字节数组', buff)
    // key = this.hexStringToBytes(key)
    console.log('key转字节数组', key)

    let srcData = buff

    let length = srcData.length
    let x = length % 8
    let addLen = 0
    if (x !== 0) {
      addLen = 8 - length % 8
    }
    // let pos = 0
    // 保证data是8的倍数
    let data = Object.assign(srcData)
    for (let i = 0; i < addLen; i++) {
      data.push(0)
    }
    console.log('data', data)

    let oper1 = data.slice(0, 8)
    // for (let i = 0; i < 8; i++) {
    //   oper1.push(data[i])
    // }
    console.log('oper1', oper1)
    // pos += 8
    let be = []
    // oper1 = this.bytes2Str(oper1)
    // console.log('oper1', oper1)
    // oper1 = this.hexCharCodeToStr(oper1)
    // console.log('oper1', oper1)
    for (let i = 0; i < data.length / 8; i++) {
      be = this.encryptByDES(content, key)
      console.log('加密结果:', be)
      console.log(this.hexStringToBytes(be))
    }
    return be
  }
}
export default des
