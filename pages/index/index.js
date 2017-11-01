//index.js
//获取应用实例
var app = getApp()

Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    footer:{
      text:"发布"
    },
    markers: [],
    cur_pos: []
  },
  //事件处理函数
  bindViewTap: function(event) {
    console.log(event)
    wx.navigateTo({
      url: '../personal/personal'
    })
  },
  // 调整到发布活动页
  toActivity: function(){
    wx.navigateTo({
      url: '../addActivity/addActivity'
    })
  },
  // 初始化定位
  initLocation: function(callback){
    var that = this;
    wx.getLocation({
      type:'wgs84',
      success: function(res){
        that.setData({
          cur_pos: [res.longitude, res.latitude]
        })
        if(callback) {
          callback(res)
        };
      }
    })
  },
  onLoad: function () {
    var that = this;
    if (app.globalData.userInfo) {
      this.initLocation(function(res){
        that.setData({
          markers: [{
              iconPath: "/images/type/1.png",
              id: 3,
              latitude: res.latitude,
              longitude: res.longitude,
              width: 50,
              height: 50,
              callout: {
                  content: '<view class="callout">123</view>'
              }
          }]
      })  
      })
      that.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  getUserInfo: function(e) {
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  handleToCreate(){
    wx.navigateTo({
      url: '../myCreate/myCreate'
    })
  },
  handleToJoin(){
    wx.navigateTo({
      url: '../myJoin/myJoin'
    })
  },
  bindToAddActivity(){
    wx.navigateTo({
      url: '../addActivity/addActivity'
    })
  },
  bindToSignActivity(){
    wx.navigateTo({
      url: '../signActivity/signActivity'
    })
  }
})
