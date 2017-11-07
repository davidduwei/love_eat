var Api = require('api.js');
App({
    globalData:{
        userInfo:{}
    },
    onLaunch: function() {
        var that = this;
        console.log(1)
        // 展示本地存储能力
        // var logs = wx.getStorageSync('logs') || []
        // logs.unshift(Date.now())
        // wx.setStorageSync('logs', logs);

        // 登录
        wx.login({
            success: res => {
                // 发送 res.code 到后台换取 openId, sessionKey, unionId
                wx.request({
                    url: Api.getOpenId,
                    method: 'get',
                    data: {
                        code: res.code
                    },
                    success: function(data) {
                        if (data.statusCode == 200) {
                            var res = data.data;
                            if (res.user) {
                                wx.setStorageSync('userId',res.user.id);
                                that.globalData.userInfo.userId = res.user.id;
                                wx.setStorageSync('user', res.user);
                            } else {
                                that.saveOpenId(res);
                            }
                        }
                    }
                })
            }
        })
        // 获取用户信息
        wx.getSetting({
            success: res => {
                if (res.authSetting['scope.userInfo']) {
                    // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
                    wx.getUserInfo({
                        success: res => {
                            // 可以将 res 发送给后台解码出 unionId
                            for(var i in res.userInfo){
                                this.globalData.userInfo[i] = res.userInfo[i];  
                            }
                            //this.globalData.userInfo = res.userInfo
                            wx.setStorageSync('userInfo', res.userInfo)
                                // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
                                // 所以此处加入 callback 以防止这种情况
                            if (this.userInfoReadyCallback) {
                                this.userInfoReadyCallback(res)
                            }
                        }
                    })
                }
            }
        })
    },
    saveOpenId: function(res) {
        var that = this;
        wx.request({
          url: Api.saveUser,
            method: 'post',
            data: {
                openId: res.openid,
                name: this.globalData.userInfo.nickName,
                sex: this.globalData.userInfo.gender,
                headImage: this.globalData.userInfo.avatarUrl
            },
            success: function(res) {
                wx.setStorageSync('userId',res.result);
                that.globalData.userInfo.userId = res.result;
                console.log(that.globalData.userInfo.userId)
            }
        })

    }
})
