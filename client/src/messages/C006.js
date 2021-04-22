/**
 * 创建文支行
 */
function Request () {
  this.data = {}
};
Request.prototype.url = '/auth/addArticle'
Request.prototype.serviceName = 'C006'
Request.prototype.serviceCode = 'C006'
export default Request
