const app = getApp();
Page({
  data: {
    userinfo: {
      head: './assets/head.svg',
      name: '自动化校际交流李英豪'
    },
    borrows: [
      {
        bookId: '少林英雄传之少林英雄传之少林英雄传之少林英雄传之',
        borrowTime: '2019-1-1',
        lendTime: '2019-2-2',
        id: 1
      },      {
        name: '少林英雄传',
        borrowTime: '2019-1-1',
        lendTime: '2019-2-2',
        id: 1
      },
      {
        name: '少林英雄传',
        borrowTime: '2019-1-1',
        lendTime: '2019-2-2',
        id: 1
      },      {
        name: '少林英雄传',
        borrowTime: '2019-1-1',
        lendTime: '2019-2-2',
        id: 1
      },
      {
        name: '少林英雄传',
        borrowTime: '2019-1-1',
        lendTime: '2019-2-2',
        id: 1
      },      {
        name: '少林英雄传',
        borrowTime: '2019-1-1',
        lendTime: '2019-2-2',
        id: 1
      },
    ]

  },
  onLoad: function() {
    this.setData({
      borrows : app.globalData.user.records,
      userinfo : app.globalData.user
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