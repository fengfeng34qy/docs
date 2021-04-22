/**
 * 获取首页文章和语言
 */
function Request () {
  this.data = {}
};
Request.prototype.url = '/home'
Request.prototype.serviceName = 'C002'
Request.prototype.serviceCode = 'C002'
export default Request
