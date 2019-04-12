const request = require('./request.js');
const app = getApp();
Page({
  data: {
    user: null,
    scroll: 0,
    offset: 0,
    limit: 5,
    words: null,
    touched: false,
    currentCommentIndex: null,
    comments: [],
  },
  onLoad: function() {
    request('v1/comments','GET',{
      offset: this.data.offset,
      limit: this.data.limit
    },(res) => {
      this.setData({
        user: app.globalData.user,
        comments: res.data,
        scroll: res.data.length - 1
      },this.pageScrollToBottom)
    })
  },
  handleSpeak: function (e) {
    this.setData({
      words: e.detail.value
    })
  },
  pageScrollToBottom: function() {
    this.setData({
      scroll: this.data.comments.length * 10000
    })
  },
  handleTouch: function(e) {
    console.log(e)
    this.setData({
      touched: !this.data.touched,
      currentCommentIndex: e.currentTarget.id
    })
  },
  handleTap: function () {
    if (this.data.touched) {
      request('v1/comments/' + this.data.comments[this.data.currentCommentIndex]._id + '/replies',
              'POST',{
                userId: app.globalData._id||app.globalData.user._id,
                replyContent: this.data.words
              },(res) => {
                console.log(res);
                this.setData({
                  words: ''
                })
                this.onLoad()          
              })
      return;
    }
    if(this.data.words) {
      request('v1/comments', 'POST', {
        userId: app.globalData._id||app.globalData.user._id,
        content: this.data.words,
        anonymity: false,
        bookId: '5cac6970f8f68c000140b465'
      },(res) => {
        console.log(res);
        if(res.statusCode === 200) {

        }
        this.setData({
          words: ''
        })
        this.onLoad()
      })
    }
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