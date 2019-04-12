const app = getApp();
const request = require('./request.js');
Page({
  data: {

  },
  onLoad: function() {
    let records = app.globalData.user.records;
    let l = records.length - 1;
    let lastBook = records[l];
    request('v1/books/'+lastBook.bookId,'GET',{},(res) => {
      if (res.data.bookState === '在读') {
        app.globalData.currentBook = res.data;
        console.log(app.globalData.currentBook)
      }
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