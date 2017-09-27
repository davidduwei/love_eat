Page({
  data: {
    marker:{
      longitude:'',
      latitude:''
    }
  },
  onLoad: function(){
    wx.getLocation({
      success: (res) =>{
        console.log(this)
        this.setData({
          marker: {
            longitude: res.longitude,
            latitude: res.latitude
          }
        })
      }
    })
  }
})