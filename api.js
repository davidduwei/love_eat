var baseUrl = 'http://10.122.1.118:8082';
module.exports = {
	getOpenId: baseUrl + '/wechat/getOpenId',
	saveUser: baseUrl + '/user/save',
	getTag: baseUrl + '/tag/activity',
	saveActive: baseUrl + '/group/activity/save'
}