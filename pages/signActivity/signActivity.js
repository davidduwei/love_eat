// pages/signActivity/signActivity.js
var Api = require('../../api.js');
Page({

    /**
     * 页面的初始数据
     */
    data: {
        activityInfo: {}
    },

    /**
     * 生命周期函数--监听页面加载
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
                                if(tag.id == res.tagId){
                                    tag.isChoosed = true;
                                }
                            })
                            that.setData({
                                activityInfo: {
                                    subject: res.subject,
                                    tags: tags,
                                    concatWay: res.concatWay,
                                    content: res.content,
                                    amountExplain: res.amountExplain
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
     * 生命周期函数--监听页面显示
     */
    onShow: function() {

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
    handleAttend() {
        console.log("报名参加活动")
    }
})