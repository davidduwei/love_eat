const app = getApp();
var userInfo = wx.getStorageSync('userInfo');
var userId = wx.getStorageSync('userId');
var user = wx.getStorageSync('user');
var Api = require("../../api.js")
Page({
  data:{
    userInfo: userInfo,
    footer: {
      text: "发布"
    },
    hobbyIds: user.hobbyIds,
    hobbyName:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    wx.request({
      //url: Api.getPersonal,
      url: Api.getAllHobby,
      method:"GET",
      //data: { userId: userId},
      header:{
        "content-type":"application/json"
      },
      success:function(res){
        if (res.statusCode == 200) {
          var hobbyArr = res.data, hobbyName = that.data.hobbyName, hobbyIds = that.data.hobbyIds;
          hobbyArr.map(function (item, index) {
            item.checked = false
            if (hobbyIds.length !== 0) {
              for (var i = 0; i < hobbyIds.length; i++) {
                item.id == hobbyIds[i] ? hobbyName.push(item.name) : null
              }
            }
          })
          console.log(hobbyName)
          that.setData({ hobbyName})
      }
    }
  })
  },
  handleToMyCreate(){
    wx.navigateTo({
      url: '../myCreate/myCreate'
    })
  },
  handleToMyJoin(){
    wx.navigateTo({
      url: '../myJoin/myJoin'
    })
  },
  handleSetInfo:function(){
    wx.navigateTo({
      url: '../editPersonal/editPersonal'
    })
  }
})