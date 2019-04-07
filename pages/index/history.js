const app = getApp();

Page({
  data: {
    userinfo: {
      head: './assets/head.svg',
      message: '自动化校际交流李英豪'
    },
    borrows: [
      {
        name: '少林英雄传之少林英雄传之少林英雄传之少林英雄传之',
        start: '2019-1-1',
        end: '2019-2-2',
        id: 1
      },      {
        name: '少林英雄传',
        start: '2019-1-1',
        end: '2019-2-2',
        id: 1
      },
      {
        name: '少林英雄传',
        start: '2019-1-1',
        end: '2019-2-2',
        id: 1
      },      {
        name: '少林英雄传',
        start: '2019-1-1',
        end: '2019-2-2',
        id: 1
      },
      {
        name: '少林英雄传',
        start: '2019-1-1',
        end: '2019-2-2',
        id: 1
      },      {
        name: '少林英雄传',
        start: '2019-1-1',
        end: '2019-2-2',
        id: 1
      },
    ]

  },
  onLoad: function() {
    console.log('home loaded')
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