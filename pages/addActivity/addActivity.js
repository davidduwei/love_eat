// pages/addActivity/addActivity.js
var userInfo = wx.getStorageSync('userInfo');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: userInfo,
    time:"",
    date:"",
    tags: [{ id: 0, tagName: '运动', isChooses: true }, { id: 1, tagName: '美食', isChooses: false }, { id: 2, tagName: '沙龙', isChooses: false }, { id: 3, tagName: '约玩', isChooses: false }, { id: 4, tagName: '购物', isChooses: false}],
    submitData:{}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var myDate = new Date()
    console.log(myDate.toLocaleString())
    var date = myDate.toLocaleDateString();
    var time = myDate.toLocaleTimeString();
    this.setData({date,time})
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
  handleSubmit(){
    console.log('提交')
    
    var submitData = this.data.submitData;
    submitData.publisherId = userInfo.nickName;
    submitData.appointmentStartTime = this.data.date+" "+this.data.time;
    console.log(this.data.submitData)
    wx.request({
      url: 'http://10.122.1.118:8082/group/activity/save',
      method: 'post',
      header: {
        "content-type": "application/json"
      },
      success: function (res) {
        console.log(res)
      }
    })
  },
  bindTimeChange(e){
    console.log(e)
    this.setData({
      time: e.detail.value
    }) 
  },
  bindDateChange(e){
    this.setData({
      date: e.detail.value
    }) 
  },
  handleChangeInput(e){
    console.log(e.detail.value)
    var submitData = this.data.submitData;
    submitData.subject = e.detail.value;
    this.setData({submitData})
  },
  handleInputMoney(e){
    console.log(e)
    var submitData = this.data.submitData;
    submitData.amountExplain = e.detail.value;
    this.setData({ submitData})
  },
  handleInputTelNum(e){
    var submitData = this.data.submitData;
    submitData.concatWay = e.detail.value;
    this.setData({ submitData })
  },
  handleInputContent(e){
    var submitData = this.data.submitData;
    submitData.content = e.detail.value;
    this.setData({ submitData })
  },
  chooseHobby(e){
    console.log(e.detail.value)
    var tags = this.data.tags, submitData = this.data.submitData;
    tags.map(function(item,index){
      item.isChooses = false;
    })
    tags[e.target.id].isChooses = true;
    submitData.tagId = e.target.id;
    submitData.tagName = tags[e.target.id].tagName;
    this.setData({ tags, submitData})
  
  }
})