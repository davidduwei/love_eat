Page({
    data: {
        markers: [],
        cur_pos: []
    },
    markertap(e) {
        console.log(e)
    },
    onLoad() {
        var that = this;
        wx.getLocation({
            type: 'wgs84',
            success: (res) => {
                this.setData({
                    cur_pos: [res.longitude, res.latitude]
                })
                console.log(res.longitude, res.latitude)
                this.setData({
                    markers: [{
                        iconPath: "/images/type/1.png",
                        id: 3,
                        latitude: res.latitude,
                        longitude: res.longitude,
                        width: 50,
                        height: 50,
                        callout: {
                            content: '<view class="callout">123</view>'
                        }
                    }]
                })
            }
        })
        wx.login({
            success: function (res) {
                console.log(res)
                that.setData({wxcode: res.code});
                //获取用户信息
                wx.getUserInfo({
                    success: function (res) {
                        console.log(res)
                        that.setData({encryptedData: res.encryptedData})
                        that.setData({iv: res.iv})
                    }
                })
            }
        })

        // wx.request({
        //     url: 'http://10.122.1.118:8082/user/save', //仅为示例，并非真实的接口地址
        //     method:'get',
        //     header: {
        //         'content-type': 'application/json' // 默认值
        //     },
        //     success: function(res) {
        //         console.log(res.data)
        //     }
        // })
    },
    init() {
        //this.onLoad();
        //console.log(1)
        
    }
})