var baseUrl = 'http://10.122.1.118:8082';
module.exports = {
	getOpenId: baseUrl + '/wechat/getOpenId',
	saveUser: baseUrl + '/user/save',
	getTag: baseUrl + '/tag/activity',
	saveActive: baseUrl + '/group/activity/save',
	getNearBy: baseUrl + '/group/activity/nearby/list/',
	getDetail: baseUrl + '/group/activity/detail', //获取详情信息
	takePartInActive: baseUrl + '/group/activity/join', //参加活动
}