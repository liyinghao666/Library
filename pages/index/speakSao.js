const request = require('./request.js');
const app = getApp();
Page({
  data: {
    words: null,
    touched: false,
    currentCommentIndex: null,
    comments: [
      {
        _id: {},
        anonymity: true,
        approvalCount: 0,
        bookId: {},
        content: '说的对说的对说的对说的对说的对说的对说的对说的对说的对说的对说的对说的对说的对',
        replies: [
          {
            replyContent: "说的对说的对说的对说的对说的对说的对说的对说的对说的对说的对说的对说的对说的对",
            userId: {},
          },
          {
            replyContent: "说那是球",
            userId: {},
          }
        ],
        unApprovalCount: 0,
        userId: {}
      },
      {
        _id: {},
        anonymity: true,
        approvalCount: 0,
        bookId: {},
        content: '说的对说的对说的对说的对说的对说的对说的对说的对说的对说的对说的对说的对说的对',
        replies: [
          {
            replyContent: "说的对说的对说的对说的对说的对说的对说的对说的对说的对说的对说的对说的对说的对",
            userId: {}
          },
          {
            replyContent: "说那是球",
            userId: {}
          }
        ],
        unApprovalCount: 0,
        userId: {}
      },
    ],
  },
  onLoad: function() {
    console.log(app.globalData.userInfo.avatarUrl)
    // "_id": {},
    // "anonymity": true,
    // "approvalCount": 0,
    // "bookId": {},
    // "content": "string",
    // "replies": [
    //   {
    //     "replyContent": "string",
    //     "userId": {}
    //   }
    // ],
    // "unApprovalCount": 0,
    // "userId": {}

    request('v1/comments','GET',{
      offset: 0,
      limit: 20
    },(res) => {
      console.log(res);
      this.setData({
        // comments: res.data
      })
    })
  },
  handleSpeak: function (e) {
    this.setData({
      words: e.detail.value
    })
  },
  handleTouch: function(e) {
    this.setData({
      touched: !this.data.touched,
      currentCommentIndex: e.currentTarget.id
    })
  },
  handleTap: function () {
    if (this.data.touched) {
      request('v1/comments/' + this.data.comments[this.data.currentCommentIndex]._id + '/replies',
              'POST',{
                userId: app.globalData.user._id,
                replyContent: this.data.words
              },(res) => {
                console.log(res);
              })
      this.setData({
        words: ''
      })
      return;
    }
    if(this.data.words) {
      request('v1/comments', 'POST', {
        userId: app.globalData.user._id,
        content: this.data.words,
        anonymity: false,
        bookId: '1'
      },(res) => {
        console.log(res);
      })
      this.setData({
        words: ''
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