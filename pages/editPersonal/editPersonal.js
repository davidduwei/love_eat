// pages/editPersonal/editPersonal.js
const app = getApp();
var userInfo = wx.getStorageSync('userInfo');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: userInfo,
    
    index: 0,
    sex: ['男', '女'],
    age: 9,
    ages: [13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34],
    hobbyChoice: [{ 'id': 0, hobbyName: "电影" }, { 'id': 1, hobbyName: "篮球" }, { 'id': 2, hobbyName: "足球" }, { 'id': 3, hobbyName: "旅游" }, { 'id': 4, hobbyName: "美食" }, { 'id': 5, hobbyName: "阅读" }, { 'id': 6, hobbyName: "音乐" }, { 'id': 7, hobbyName: '写字' }, { id: 8, hobbyName: '游戏' }, { id: 9, hobbyName: '美妆' }, { id: 10, hobbyName: '科技' }, { id: 11, hobbyName: '画画' }, { id: 12, hobbyName: '麻友' }, { id: 13, hobbyName: '唱歌' }],
    chooseCount:0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  },
  bindPickerChangeSex(e) {
    console.log(e)
    var editData = this.data.editData;
    editData.index = e.detail.value;
    this.setData({
      editData
    })
  },
  bindPickerChangeAge(e) {
    console.log(e)
    var editData = this.data.editData;
    editData.age = e.detail.value;
    this.setData({
      editData
    })
  },
  checkboxChangeHobby: function (e) {
    this.setData({ chooseCount: e.detail.value.length})
  },
  handleSubmit() {
    console.log('提交编辑的内容')
    wx.navigateTo({
      url: '../personal/personal'
    })
  }

})