var Api = require("../../api.js")
var userId = wx.getStorageSync('userId');
Page({
  data: {
    listData:[
    ]
  },
  //时间戳转换时间  
  toDate(number) {
    var n = number * 1000;
    var date = new Date(n);
    var Y = date.getFullYear() + '/';
    var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '/';
    var D = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
    return (Y + M + D)
  },
  /**
 * 生命周期函数--监听页面初次渲染完成
 */
  onReady: function () {
    //var list = (wx.getStorageSync('myCreateData'))
    var _this = this;
    wx.request({
      url: Api.getMyPublishList,
      method: "GET",
      data: { userId: userId},
      header: {
        "content-type": "application/json"
      },
      success: function (res) {
        console.log(res)
        if (res.statusCode == 200) {
          var data = res.data;
          for (var i = 0; i < data.length; i++) {

            data[i].appointmentStartTime = _this.toDate(data[i].appointmentStartTime)
          }
          _this.setData({
            listData: data
          })
        }
      }
    })
  },
  handleTodetail(e){
    console.log(e.currentTarget.id)
    wx.navigateTo({
      url: '../activeDetail/activeDetail?id=' + e.currentTarget.id
    })
  }
})