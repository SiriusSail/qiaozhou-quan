import apis from '@/apis/index';
import { pay } from '@/apis/payment';
import { valiVip } from '@/utils/index';

const memberType = [
  { title: '日VIP', amount: '0.99', text: '试用一天', value: 'DAY' },
  { title: '周VIP', amount: '2.99', text: '续费7天', value: 'WEEK' },
  { title: '月VIP', amount: '9.9', text: '续费31天', value: 'MONTH' },
];

Page({
  data: {
    userInfo: {},
    dataList: [],
    typeList: memberType,
    memberEndTime: '',
    isVip: valiVip({
      isHideModal: true,
    }),
    member: memberType[0],
  },
  updataUserInfo: function () {
    apis.userInfo().then((t) => {
      wx.setStorage({
        key: 'userInfo',
        data: t,
      });
      this.setData({
        userInfo: t,
        memberEndTime: t?.memberEndTime.split(' ')[0],
        isVip: valiVip({
          isHideModal: true,
        }),
      });
    });
  },
  onLoad: function () {
    wx.getStorage({
      key: 'userInfo',
      success: (t) => {
        this.setData({
          userInfo: t.data,
          memberEndTime: t.data?.memberEndTime.split(' ')[0],
          isVip: valiVip({
            isHideModal: true,
          }),
        });
      },
    });
  },
  onShow: function () {
    this.updataUserInfo();
  },
  setType: function (e) {
    this.setData({ member: e.currentTarget.dataset.item });
  },
  pay() {
    pay({
      amount: this.data.member.amount,
      memberType: this.data.member.value,
      userId: this.data.userInfo.id,
    }).then((e) => {
      wx.requestPayment({
        timeStamp: e.timeStamp,
        nonceStr: e.nonceStr,
        package: e.packageValue,
        signType: e.signType,
        paySign: e.paySign,
        success: () => {
          wx.showToast({ title: '支付成功' });
          this.updataUserInfo();
        },
        fail: () => {
          wx.showModal({
            title: '错误',
            content: ' 支付失败, 请重试',
            showCancel: false,
          });
        },
      });
    });
  },
});
