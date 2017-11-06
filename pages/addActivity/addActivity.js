var Api = require('../../api.js');
var app = getApp()
// pages/addActivity/addActivity.js
var userInfo = wx.getStorageSync('userInfo');
Page({

    /**
     * 页面的初始数据
     */
    data: {
        longitude:'',
        latitude:'',
        params:{
            startTime: '开始时间',
            endTime:'结束时间',
            date: "",
        },
        markers:[],
        tags: [],
        modal:{
            title:'',
            hidden:true
        }
    },
    // 选择地址
    selectAddress: function(){
        var that = this;
        wx.chooseLocation({
            success: function(res){
                console.log(res)
                var params = that.data.params;
                params.address = res.address;
                params.appointmentLatitude = res.latitude;
                params.appointmentLongitude = res.longitude;
                 that.setData({
                    params:params,
                    longitude: res.longitude,
                    latitude: res.latitude,
                    markers:[
                        {
                            iconPath: "/images/type/1.png",
                            id: 3,
                            latitude: res.latitude,
                            longitude: res.longitude,
                            width: 50,
                            height: 50
                        }
                    ]
                 })   
            }
        })
    },
    getTag: function() {
        var that = this;
        wx.request({
            method: 'get',
            url: Api.getTag,
            success: function(res) {
                for (var i = 0; i < res.data.length; i++) {
                    res.data[i].isChooses = false;
                }
                console.log(res)
                that.setData({
                    tags: res.data
                })
            }
        })
    },
    /**
     * 生命周期函数--监听页面加载
     */
    format(t){
        return  t < 10 ? '0' + t : t;
    },
    onLoad: function(options) {
        var myDate = new Date();
        var params = this.data.params;
        params.date = myDate.getFullYear() + '-' + this.format(myDate.getMonth()) + '-' + this.format(myDate.getDay());
        params.time = this.format(myDate.getHours()) + ':' + this.format(myDate.getMinutes());
        this.setData({
                params:params
            })
            // 获取标签
        this.getTag();
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function() {
        this.activeMap = wx.createMapContext('activeMap');
        var that = this, params = this.data.params;
        // 获取当前用户位置信息
        wx.getLocation({
            success: function(res){
                params.currentLatitude = res.latitude;
                params.currentLongitude = res.longitude;
                params.publisherId = app.globalData.userInfo.userId;
            }
        })
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
    handleSubmit() {
        var params = this.data.params;
        if(!params.publisherId || !params.subject || !params.currentLatitude  || !params.concatWay  || !params.appointmentLatitude || !params.date || !params.startTime || !params.endTime ){
            this.setData({
                modal:{
                    title:"请填写完整信息",
                    hidden:false
                }
            })
            return 
        }
        params.appointmentEndTime = params.date + ' ' + params.endTime + ':00';
        params.appointmentStartTime = params.date + ' ' + params.startTime + ':00';
        wx.request({
            method:'post',
            url: Api.saveActive,
            data:this.data.params,
            success: function(res){
                console.log(res);
            }
        })
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
    },
    bindTimeChange(e) {
        var key = e.currentTarget.dataset['key'];
        var params = this.data.params;
        params[key] = e.detail.value
        this.setData({
            params: params
        })
    },
    bindDateChange(e) {
        var params = this.data.params;
        params.date = e.detail.value
        this.setData({
            params: params
        })
    },
    handleChangeInput(e) {
        var key = e.currentTarget.dataset['key'] , val = e.detail.value;
        var params = this.data.params;
        params[key] = val;
        this.setData({params:params})
    },
    chooseHobby(e) {
        var tags = this.data.tags;
        tags.map(function(item, index) {
            item.isChooses = false;
        })
        tags[e.currentTarget.dataset.index].isChooses = true;
        this.setData({
            tags
        })

    }
})