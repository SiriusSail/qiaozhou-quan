import {
  findInfoPublishPageByUserId,
  delPublishInfo,
} from '@/apis/infoPublish';
import type { PublishInfo } from '@/apis/infoPublish';

Page({
  data: {
    request: findInfoPublishPageByUserId,
    dataList: [],
    delList: [],
    list: [],
  },

  delete(e) {
    const id = e.currentTarget.dataset.id;
    wx.showModal({
      title: '提示',
      content: '请在再次确认是否删除该动态',
      cancelText: '取消',
      confirmColor: '#ff4d4f',
      confirmText: '删除',
      success: (e) => {
        if (e.confirm) {
          delPublishInfo(id).then((res) => {
            this.data.delList.push(id);
            this.updateList();
          });
        }
      },
    });
  },
  toinfo(e) {
    // const id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: `/pages/shopPages/shopRelease/index`,
      // url: '/pages/shopPages/myReleaseList/index',
    });
  },
  setDataList(e) {
    this.data.dataList = e.detail.list;
    // this.setData({
    //   dataList: ,
    // });
    this.updateList();
  },
  onLoad() {
    // 判断是否第一次进入页面，如果是第一次进入页面就不下拉刷新
    const a = setTimeout(() => {
      this.show = true;
      clearTimeout(a);
    }, 2000);
  },
  onShow() {
    // 和onLoad 衔接 如果是从上个页面返回回来，就下拉刷新
    if (!this.show) return;
    this.selectComponent('#scroll').reRequest();
  },
  updateList() {
    this.setData({
      list: this.data.dataList.filter(
        (item: PublishInfo) =>
          !this.data.delList.find((i: string) => i === item.id)
      ),
    });
  },
});
