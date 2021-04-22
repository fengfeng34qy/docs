/**
 * 获取用户信息
 */
function Request () {
  this.data = {}
};
Request.prototype.url = '/getUserInfo'
Request.prototype.serviceName = 'C008'
Request.prototype.serviceCode = 'C008'
export default Request
