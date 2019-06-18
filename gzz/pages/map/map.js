const app = getApp()
Page({
  data: {
    mapCtx: null,
    mapWidth: 200,
    mapHeight: 200,
    clientY:"",
    clientY1:"",
    height:0,
    markers: [{
      "id": 1,
      "title": "马王堆汉墓",
      "longitude": "113.02306",
      "latitude": "28.20954"
    },
    {
      "id": 2,
      "title": "翡翠云天",
      "longitude": "113.0438467115164",
      "latitude": "28.107189929519915"
    },
      {
        "id": 3,
        "title": "翡翠云天",
        "longitude": "113.0438467115164",
        "latitude": "28.107189929519915"
      },
      {
        "id": 4,
        "title": "翡翠云天",
        "longitude": "113.0438467115164",
        "latitude": "28.107189929519915"
      }, {
        "id": 5,
        "title": "翡翠云天",
        "longitude": "113.0438467115164",
        "latitude": "28.107189929519915"
      },
      {
        "id": 6,
        "title": "翡翠云天",
        "longitude": "113.0438467115164",
        "latitude": "28.107189929519915"
      }
    ],
    d:0,
    jl:[],
    textData: { name: '', desc: '' },
    //0:加载完成  1:加载中
    searchLoadingStatus: 0,
    //当前选中纬度信息
    currentLocationInfo: {
      longitude: 0,
      latitude: 0
    }
  },
  functionPending:null,
  a:function(e){
   this.setData({ clientY: e.changedTouches[0].clientY})
 },
  b: function (e) {
    if(this.functionPending) return
    this.functionPending =setTimeout(()=>{
      this.functionPending=null
    },30)

    const changeData={}
    changeData.clientY1=e.changedTouches[0].clientY
    var a = this.data.clientY - this.data.clientY1;
    changeData.d=a   
    if (a > 0) { 
      if (this.data.height != 800) { changeData.height=a }
      else { changeData.height = 800}
      }
    this.setData(changeData)
  },
  c: function (e) {
    if (this.data.d > 0) { this.setData({ clientY1: e.changedTouches[0].clientY, height: 800 })}
    else { this.setData({height:0}) }
    
  },
  go:function(e){
    console.log(e.target.dataset)
    var a = e.target.dataset;
    wx.openLocation({
      latitude: a.latitude,
      longitude: a.longitude,
      name:a.title,
      scale: 15
    })
  },
  add: function () {
    var _this = this;
    wx.chooseLocation({
      success: function (res) {
        var name = res.name
        var address = res.address
        var latitude = res.latitude
        var longitude = res.longitude
        _this.setData({
          name: name,
          address: address,
          latitude: latitude,
          longitude: longitude
        })
      }
    })
  },
  onReady: function (e) {
  },
  onLoad(options) {
    var that = this;
    that.authorAddress();
    that.setMapSize();
    var a = wx.getStorageSync('Token');
    var timespan = new Date().getTime();
    var nonce = Math.floor((Math.random() + Math.floor(Math.random() * 9 + 1)) * Math.pow(10, 10 - 1));
    var signature = [timespan, nonce, a.signId, a.signToken].sort().join('').toUpperCase();
    console.log(app.globalData.latitude,app.globalData.longitude)
    wx.request({
      url: app.globalData.url + '/api/machine/NearMachinePageList',
      method: "POST",
      header: { 'content-type': 'application/json', signKey: a.signId, timespan: timespan, nonce: nonce, signature: signature },
      data: { page: 1, size: 10, longitude:app.globalData.longitude,latitude:app.globalData.latitude},
      success(res) {
      console.log(res.data.result)
      that.setData({markers:res.data.result})
      }
    })
  },
  //用户地理位置授权
  authorAddress: function () {
    var that = this;
    that.getCurrentLocation('gcj02', function (res) {
      that.setData({
        longitude: res.longitude,
        latitude: res.latitude
      });
      // that.showMarkerInfo(res.longitude, res.latitude);
    });
  },
  //初始化当前位置
  getCurrentLocation: function (typeCode, succFun) {
    var that = this;
    wx.getLocation({
      type: typeCode,
      success: function (res) {
        return succFun(res);
      },
      fail: function (res) {
        wx.openSetting({
          success: function (data) {
            that.authorAddress();
          },
          fail: function () {
            console.info("设置失败返回数据");
          }
        });
      }
    })
  },
  //设置地图长宽
  setMapSize: function () {
    var that = this;
    //获取设备可使用窗口高度
    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          mapWidth: res.windowWidth,
          mapHeight: res.windowHeight
        });
      }
    })
  }
})