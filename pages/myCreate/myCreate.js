Page({
  data: {
    listData:[
    ]
  },
  /**
 * 生命周期函数--监听页面初次渲染完成
 */
  onReady: function () {
    var list = (wx.getStorageSync('myCreateData'))
    this.setData({
      listData: list
    })
  },
  handleTodetail(e){
    console.log(e.currentTarget.id)
    wx.navigateTo({
      url: '../activeDetail/activeDetail'
    })
  }
})