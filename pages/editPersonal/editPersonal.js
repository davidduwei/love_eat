// pages/editPersonal/editPersonal.js
var Api = require("../../api.js")
const app = getApp();
var user = wx.getStorageSync('user');
var userInfo = wx.getStorageSync('userInfo');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: userInfo,
    
    index: parseInt(user.sex)-1,
    sex: ['男', '女'],
    age: parseInt(user.age),
    ages: [13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34],
    hobbyChoice: [],
    chooseCount: user.hobbyIds.length,
    disableCheck: false,
    submitData:{},
    hadHobby: user.hobbyIds
    //hadHobby:['1','5']
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var _this = this;
    var hadHobby = this.data.hadHobby;
    wx.request({
      url: Api.getAllHobby,
      method: "GET",
      //data: { userId: userId},
      header: {
        "content-type": "application/json"
      },
      success: function (res) {
        console.log(res)
        if (res.statusCode == 200) {
          var hobbyArr = res.data;
          hobbyArr.map(function(item,index){
            item.checked = false;
            item.disabled = false;
            if (hadHobby.length !== 0){
              for (var i = 0; i < hadHobby.length; i++) {
                item.id == hadHobby[i] ? item.checked = true : null
              }
            }
          })
          _this.setData({
            hobbyChoice: hobbyArr
          })
        }
      }
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
  bindPickerChangeSex(e) {
    console.log(e)
    this.setData({
      index: e.detail.value,
    })
  },
  bindPickerChangeAge(e) {
    console.log(e)
    this.setData({
      age: e.detail.value
    })
  },
  checkboxChangeHobby: function (e) {
    var hobbyChoice = this.data.hobbyChoice;
    var choosedArr = e.detail.value;
    if (choosedArr.length<5){
      hobbyChoice.map(function (item, index) {
        item.disabled = false;
        item.checked = false;
        for (var i = 0; i < choosedArr.length; i++) {
          item.id == choosedArr[i] ? item.checked = true : null;
        }
      })
      this.setData({ chooseCount: choosedArr.length, hadHobby: choosedArr, hobbyChoice })
    } else if (choosedArr.length == 5){
      hobbyChoice.map(function(item,index){
        item.disabled = true;
        for (var i = 0; i < choosedArr.length;i++){
          item.id == choosedArr[i] ? item.disabled = false:null;
          item.id == choosedArr[i] ? item.checked = true : null;
        }
      })
      this.setData({ chooseCount: 5, hobbyChoice })
    }
    
  },
  handleSubmit() {
    console.log('提交编辑的内容')
    var submitData = {
      hobbyIds: this.data.hadHobby,
      sex: parseInt(this.data.index) + 1,
      age: this.data.ages[parseInt(this.data.age)],
      id: user.id,
      openId: user.openId
    }
    wx.request({
      url: Api.saveUser,
      method: "POST",
      data: submitData,
      header: {
        "content-type": "application/json"
      },
      success: function (res) {
        console.log(res)
        if (res.statusCode == 200) {
          wx.navigateTo({
            url: '../personal/personal'
          })
        }
      }
    })
    
  }

})