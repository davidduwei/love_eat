// pages/activeDetail/activeDetail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    detailData:{
      subject:"周日永恒大地签约会活动（银泰楼）",
      tag:[{id:0,tagName:'运动'},{id:1,tagName:'美食'}],
      time:'17-01-01 16:00-18:00',
      addr:'天府四街银泰城乐坊',
      num:9,
      total:12,
      money:"30-50",
      telNum:'15828181853',
      content:'本次活动主要线下联谊会，主要是为了见某某某，我们的口号是：作作作作作作作作作作作作',
      attendsList:[{id:0,name:'杨洋'},{id:1,name:'洋洋'},{id:2,name:'阳阳'},{id:2,name:'痒痒'}]
  
    },
    tag:[],
    attendsList:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this.setData({ 
      tag: this.data.detailData.tag,
      attendsList: this.data.detailData.attendsList
    })
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
  
  }
})