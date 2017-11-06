//index.js
//获取应用实例
var Api = require('../../api.js')
var app = getApp()

Page({
    data: {
        motto: 'Hello World',
        userInfo: {},
        hasUserInfo: false,
        canIUse: wx.canIUse('button.open-type.getUserInfo'),
        footer: {
            text: "发布"
        },
        markers: [],
        cacheIds:[],
        cur_pos: []
    },
    //事件处理函数
    bindViewTap: function(event) {
        wx.navigateTo({
            url: '../personal/personal'
        })
    },
    // 调整到发布活动页
    toActivity: function() {
        wx.navigateTo({
            url: '../addActivity/addActivity'
        })
    },
    reBackLocation: function() {
        //this.initLocation();
        this.mapCtx.moveToLocation()
    },
    // 初始化定位
    initLocation: function(callback) {
        var that = this;
        wx.getLocation({
            type: 'wgs84',
            success: function(res) {
                that.setData({
                    cur_pos: [res.longitude, res.latitude]
                })
                if (callback) {
                    callback(res)
                };
            }
        })
    },
    markertap(e){
        var id = e.markerId;
        wx.navigateTo({
            url: '../signActivity/signActivity?id='+id
        })
    },
    onHide: function(){
        clearInterval(this.timer);
        this.timer = null;
    },
    onReady: function(){
        // console.log(1)
        // var that = this;
        // this.timer = setInterval(function(){
        //     that.getRegionData();
        // },1000)
    },
    onShow: function() {
        var that = this;
        // 使用 wx.createMapContext 获取 map 上下文
        this.mapCtx = wx.createMapContext('myMap');
        if (app.globalData.userInfo) {
            this.initLocation();
            that.setData({
                userInfo: app.globalData.userInfo,
                hasUserInfo: true
            })
        } else if (this.data.canIUse) {
            // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
            // 所以此处加入 callback 以防止这种情况
            app.userInfoReadyCallback = res => {
                this.setData({
                    userInfo: res.userInfo,
                    hasUserInfo: true
                })
            }
        } else {
            // 在没有 open-type=getUserInfo 版本的兼容处理
            wx.getUserInfo({
                success: res => {
                    app.globalData.userInfo = res.userInfo
                    this.setData({
                        userInfo: res.userInfo,
                        hasUserInfo: true
                    })
                }
            })
        }
        this.timer = setInterval(function(){
            that.getRegionData();
        },1000)
    },
    getRegionData(){
        var that = this;
        this.mapCtx.getCenterLocation({
            success: function(res){
                wx.request({
                    url: Api.getNearBy + res.longitude + '/' + res.latitude + '/1000', 
                    success: function(data){
                        var markers = [] , cIds = [] , status = false;
                        data.data.map((res) => {
                            markers.push({
                                iconPath: "/images/type/"+(res.tagId || 'all')+".png",
                                id: res.id,
                                latitude: res.currentLatitude,
                                longitude: res.currentLongitude,
                                width: 50,
                                height: 50
                            })
                            cIds.push(res.id);
                            if(that.data.cacheIds.indexOf(res.id) < 0){
                                status = true;
                            }
                        })
                        if(status){
                            that.setData({
                                markers: markers,
                                cacheIds:cIds
                            })
                        }
                    }
                })
            }
        }) 
    },
    regionChange(){
        //this.getRegionData();
    },
    getUserInfo: function(e) {
        app.globalData.userInfo = e.detail.userInfo
        this.setData({
            userInfo: e.detail.userInfo,
            hasUserInfo: true
        })
    },
    handleToCreate() {
        wx.navigateTo({
            url: '../myCreate/myCreate'
        })
    },
    handleToJoin() {
        wx.navigateTo({
            url: '../myJoin/myJoin'
        })
    },
    bindToAddActivity() {
        wx.navigateTo({
            url: '../addActivity/addActivity'
        })
    },
    bindToSignActivity() {
        wx.navigateTo({
            url: '../signActivity/signActivity'
        })
    }
})