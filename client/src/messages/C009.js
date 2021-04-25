/**
 * 删除文章
 */
function Request () {
  this.data = {}
};
Request.prototype.url = '/deleteArticle'
Request.prototype.serviceName = 'C009'
Request.prototype.serviceCode = 'C009'
export default Request
