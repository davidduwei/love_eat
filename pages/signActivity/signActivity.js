// pages/signActivity/signActivity.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    activityInfo:{}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var activityInfo = {
      subject:'叽叽歪歪',
      tags:[{id:0,tagName:'美食'}],
      time:'2017-01-01 16:00:00',
      addr:'天府三街',
      total:'12',
      has:'1',
      orgName:'养眼',
      orgTel:'15828181853',
      money:'11',
      content:'多少'
    };
    this.setData({
      activityInfo
    })
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
  handleAttend(){
    console.log("报名参加活动")
  }
})