const app = getApp();
var userInfo = wx.getStorageSync('userInfo');
Page({
  data:{
    userInfo: userInfo,
    footer: {
      text: "发布"
    },
    hobbyArr: [
      { 'id': 1, name: "篮球" }, { 'id': 2, name: "足球" }
    ],
    joinArr: [
      { index: 0, name: '起开', time: '2017-01-01', addr: '公司', num: 10, hasNum: 2 },
      { index: 1, name: '踢开', time: '2017-01-01', addr: '公司', num: 10, hasNum: 2 },
      { index: 2, name: '磨叽', time: '2017-01-01', addr: '公司', num: 10, hasNum: 2 },
      { index: 3, name: '矫情', time: '2017-01-01', addr: '公司', num: 10, hasNum: 2 },
      { index: 4, name: '啰嗦', time: '2017-01-01', addr: '公司', num: 10, hasNum: 2 }
    ],
    createArr: [
      { index: 0, name: '创建起开', time: '2017-01-01', addr: '公司', num: 10, hasNum: 2 },
      { index: 1, name: '创建踢开', time: '2017-01-01', addr: '公司', num: 10, hasNum: 2 },
      { index: 2, name: '创建磨叽', time: '2017-01-01', addr: '公司', num: 10, hasNum: 2 },
      { index: 3, name: '创建矫情', time: '2017-01-01', addr: '公司', num: 10, hasNum: 2 },
      { index: 4, name: '创建啰嗦', time: '2017-01-01', addr: '公司', num: 10, hasNum: 2 }
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    wx.request({
      url:"http://www.tpshop.com/index.php",
      header:{
        "content-type":"application/json"
      },
      success:function(res){
        console.log(res)
      }
    })
  },
  handleToMyCreate(){
    wx.setStorageSync('myCreateData', this.data.createArr)
    wx.navigateTo({
      url: '../myCreate/myCreate'
    })
  },
  handleToMyJoin(){
    wx.setStorageSync('myJoinData', this.data.joinArr)
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