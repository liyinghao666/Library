//index.js
//获取应用实例
const app = getApp()
app.globalData.baseUrl = 'https://guanli.hustonline.net/';

Page({
  data: {
    motto: '点击进入系统',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  //事件处理函数
  onLoad: function () {
    wx.login({
      success: (res) => {
        wx.request({
          url: app.globalData.baseUrl + 'v1/auth',
          method: 'POST',
          data: {
            code: res.code,
          },
          success: (res) => {
            let data = res.data;
            console.log(data)
            if (!data.errorType) {
              app.globalData.refresh_token = data.token.refresh_token;
              app.globalData.access_token = data.token.access_token;
              app.globalData.user = data.user;
              console.log(app.globalData.refresh_token,app.globalData.access_token, app.globalData.user);
              wx.navigateTo({
                url: './home'
              })
            }
            else {
              wx.navigateTo({
                url: './load'
              })
            }
          }
        })
      }
    });
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse){
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
    wx.navigateTo({
      url: './home'
    })

  },
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  }
})
