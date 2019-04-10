//index.js
//获取应用实例
const app = getApp()
app.globalData.baseUrl = 'https://guanli.hustonline.net/';
const request = require('./request.js');
let next = null;
Page({
  data: {
    motto: '点击进入系统',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    avatarUrl: null,
  },
  //事件处理函数
  onLoad: function () {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true,
        avatarUrl: app.globalData.userInfo.avatarUrl,
      });
      this.login()
    } else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true,
          avatarUrl: res.userInfo.avatarUrl,
        })
        this.login()
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true,
            avatarUrl: res.userInfo.avatarUrl,
          });
        }
      });
      this.login();
    }
  },
  login: function() {

    wx.login({
      success: (res) => {
        request('v1/auth','POST',{code:res.code},(res) => {
          let data = res.data;
          app.globalData.user = data.user;
          app.globalData.openId = data.openId;
          if (!data.errorType) {
              if (!data.user.name) {


                /***only for test */
                app.globalData.refresh_token = data.token.refresh_token;
                app.globalData.access_token = data.token.access_token;  
                next = './load'
                return;
              }
              app.globalData.refresh_token = data.token.refresh_token;
              app.globalData.access_token = data.token.access_token;
              next = './home'
          }
          else {
            wx.showToast({title: '请重新登录'})
          }
        })
        wx.navigateTo({
          url: next
        })  
      }
    });
  },
  getUserInfo: function(e) {
    app.globalData.userInfo = e.detail.userInfo;
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true,
      avatarUrl: e.detail.userInfo.avatarUrl,
    })
    wx.navigateTo({
      url: next
    })
  }
})
