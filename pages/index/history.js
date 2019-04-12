const app = getApp();
Page({
  data: {
    user: null,
    userinfo: {
      head: './assets/head.svg',
      name: '自动化校际交流李英豪'
    },
    borrows: []

  },
  onLoad: function() {
    this.setData({
      user: app.globalData.user,
      borrows : app.globalData.user.records,
      userinfo : app.globalData.userInfo
    })
  },
  // 函数们
  toBorrow: function() {
    wx.navigateTo({
      url: './borrow'
    })
  },
  toRepay: function() {
    wx.navigateTo({
      url: './repay'
    })
  },
  toHistory: function() {
    wx.navigateTo({
      url: './history'
    })
  },
  speakSao: function() {
    wx.navigateTo({
      url: './speakSao'
    })
  }
})