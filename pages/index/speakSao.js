const request = require('./request.js');
const app = getApp();
Page({
  data: {
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