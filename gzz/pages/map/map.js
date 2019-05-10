
Page({
  data: {
    mapCtx: null,
    mapWidth: 200,
    mapHeight: 200,
    longitude:"",
    latitude:"",
    markers: [{
      "id": 1,
      "title": "永州市中心医院",
      "longitude": "111.62852107566833",
      "latitude": "26.42142999357519"
    },
    {
      "id": 2,
      "title": "永州市中医院",
      "longitude": "111.5972679762268",
      "latitude": "26.44470581245983"
    }
    ],
    textData: { name: '', desc: '' },
    //0:加载完成  1:加载中
    searchLoadingStatus: 0,
    //当前选中纬度信息
    currentLocationInfo: {
      longitude: 0,
      latitude: 0
    }
  },
  add:function(){
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
    var that = this;
    // 使用 wx.createMapContext 获取 map 上下文
    that.mapCtx = wx.createMapContext('loactionMap', this);
  },
  onLoad(options) {
    var that = this;

    that.authorAddress();
    that.setMapSize();
    that.getShareLocation(options);
  },
  //用户地理位置授权
  authorAddress: function () {
    var that = this;
    that.getCurrentLocation('gcj02', function (res) {
      console.log(res);
      that.setData({
        longitude: res.longitude,
        latitude: res.latitude
      });
      that.showMarkerInfo(res.longitude, res.latitude);
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
            console.log(4444)
            console.log(data);
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