var Api = require("../../api.js")
var userId = wx.getStorageSync('userId');
Page({
  data: {
    listData: [
    ]
  },
  /**
* 生命周期函数--监听页面初次渲染完成
*/
  onReady: function () {
    //var list = (wx.getStorageSync('myJoinData'))
    var _this = this;
    wx.request({
      url: Api.getMyJoinList,
      method: "GET",
      //data: { userId: userId},
      header: {
        "content-type": "application/json"
      },
      success: function (res) {
        console.log(res)
        if (res.statusCode == 200){
          _this.setData({
            listData: res.res
          })
        }
      }
    })
    
  },
  handleTodetail(e){
    console.log(e.currentTarget.id)
    wx.navigateTo({
      url: '../activeDetail/activeDetail'
    })
  }
})