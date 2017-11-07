// pages/signActivity/signActivity.js
var Api = require('../../api.js');
var app = getApp()
Page({

    /**
     * 页面的初始数据
     */
    data: {
        activityInfo: {},
        modal:{
            title:'',
            hidden:true
        }
    },
    format(t){
        return  t < 10 ? '0' + t : t;
    },
    /**
     * 生命周期函数--监听页面显示
     */
    onLoad: function(options) {
      var that = this;
        wx.request({
            url: Api.getTag,
            success: function(res) {
                var tags = res.data;
                wx.request({
                    url: Api.getDetail,
                    data: {
                        id: options.id
                    },
                    success: function(data) {
                        if (data.statusCode == 200) {
                            var res = data.data;
                            tags.map((tag) => {
                                if (tag.id == res.tagId) {
                                    tag.isChooses = true;
                                }
                            })
                            var startDate = new Date(res.appointmentStartTime);
                            var endDate = new Date(res.appointmentEndTime);
                            var date = startDate.getFullYear() + '-' + that.format(startDate.getMonth()) + '-' + that.format(startDate.getDay());
                            var time = that.format(startDate.getHours()) + ':' + that.format(startDate.getMinutes());
                            var time1 = that.format(endDate.getHours()) + ':' + that.format(endDate.getMinutes());
                            var addr = '';
                            that.setData({
                                activityInfo: {
                                    id: options.id,
                                    subject: res.subject,
                                    tags: tags,
                                    concatWay: res.concatWay,
                                    content: res.content,
                                    amountExplain: res.amountExplain,
                                    times: date + ' ' + time + '-' + time1,
                                    addressDesc:res.addressDesc || '',
                                    joinerCount: res.joinerCount || ''
                                }
                            })
                        }
                    }
                })
            }
        })

        // this.setData({
        //     activityInfo
        // })
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function() {

    },

    

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function() {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function() {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function() {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function() {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function() {

    },

    listenerCancel(){
        this.setData({
            modal:{
                title:"",
                hidden:true
            }
        })
    },
    listenerConfirm(){
        this.setData({
            modal:{
                title:"",
                hidden:true
            }
        })
        wx.navigateTo({
            url: '../index/index'
        })
    },
    handleAttend() {
        var that = this;
        wx.request({
            url: Api.takePartInActive,
            method:'post',
            data:{
                groupActivityId: this.data.activityInfo.id,
                userId: app.globalData.userInfo.userId
            },
            success: function(res){
                if(res.statusCode == 200 && res.data.result == '参加成功'){
                    console.log('参加成功!');
                    that.setData({
                        modal:{
                            title:"报名成功",
                            hidden:false
                        }
                    })
                }
            }
        })
    }
})