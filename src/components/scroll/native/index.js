/* eslint-disable @typescript-eslint/no-this-alias,no-undef */

// eslint-disable-next-line no-undef
Component({
  options: {
    multipleSlots: true, // 在组件定义时的选项中启用多slot支持
  },
  properties: {
    className: String,
    merchantId: String,
    hideCart: Boolean,
    openScroll: {
      type: Boolean,
      value: true,
      observer: function (newVal, oldVal, change) {
        this.setData({
          isOpenbScroll: newVal,
        });
      },
    },
    data: {
      type: Object,
      value: [],
      observer: function (newVal, oldVal, change) {
        this.initdata(newVal);
      },
    },
    height: Number,
  },
  data: {
    isOpenbScroll: true,
    id: '',
    list: [],
    mainList: [],
    dataList: [],
    toView: '',
    tabsView: '',
    isShow: false,
    values: {},
    totalPrice: 0,
    totalNumber: 0,
  },
  methods: {
    //滚动事件
    scrollIndex: function (e) {
      if (this.data.mainList.length === 0) {
        const mainListI = [];
        this.data.dataList.forEach((item, index) => {
          // 添加节点的布局位置的查询请求。相对于显示区域，以像素为单位。其功能类似于 DOM 的 getBoundingClientRect。返回 NodesRef 对应的 SelectorQuery
          this.createSelectorQuery()
            .select(`#section-${item.categoryId}`)
            .boundingClientRect(function (rect) {
              if (!rect) return;
              mainListI[index] = {
                key: item.categoryId,
                top: rect.top,
                bottom: rect.bottom,
              };
            })
            .exec();
        });
        this.data.mainList = mainListI;
      }
      const mainList = this.data.mainList;
      const nowTop = e.detail.scrollTop + (mainList[0]?.top || 0);
      mainList.forEach((item, index) => {
        let newView = this.data.toView;
        // 判断区间List是否完全取出
        if (mainList[index + 1]) {
          if (nowTop >= item.top && nowTop < mainList[index + 1].top) {
            newView = this.data.dataList[index].categoryId;
          }
        } else {
          if (nowTop >= item.top) {
            newView = this.data.dataList[index].categoryId;
          }
        }
        if (this.data.toView !== newView) {
          this.setData({
            tabsView: newView,
          });
        }
      });
    },
    selectType: function (e) {
      var item = e.currentTarget.dataset.item;
      if (!this.data.isOpenbScroll) {
        wx.pageScrollTo({
          scrollTop: 9999,
        });
      }
      this.setData({
        toView: item.categoryId,
        tabsView: item.categoryId,
      });
    },
    subtraction: function (e) {
      var item = e.currentTarget.dataset.item;
      const num = parseInt(this.data.values[item.goodsId] || 0);
      if (num <= 0) {
        return;
      }
      this.setData({
        values: {
          ...this.data.values,
          [item.goodsId]: num - 1,
        },
      });
      this.total();
    },
    add1: function (e) {
      var item = e.currentTarget.dataset.item;
      var num = parseInt(this.data.values[item.goodsId] || 0);

      if (num + 1 > parseInt(item.overNum || 0)) {
        return;
      }
      this.setData({
        values: {
          ...this.data.values,
          [item.goodsId]: num + 1,
        },
      });
      this.total();
    },
    total: function () {
      var prod = Object.entries(this.data.values)
        .filter(([, number]) => number > 0)
        .map(([key, number]) => {
          return {
            ...this.data.list.find((i) => i.goodsId === key),
            number: number,
          };
        });
      this.setData({
        totalNumber: prod.reduce((a, b) => a + b.number, 0),
        totalPrice:
          prod.reduce((a, b) => {
            var bt = Math.floor(b.number * b.price * 100) / 100;
            bt = bt.toFixed(2);
            const tt = Math.floor((parseFloat(a) + parseFloat(bt)) * 100) / 100;
            return tt.toFixed(2);
          }, 0) || 0,
      });
    },
    toNext: function () {
      const valueArr = Object.entries(this.data.values).map(
        ([key, number]) => ({
          goodsId: key,
          value: number,
        })
      );
      if (valueArr.length <= 0) return;
      const orderCache = wx.getStorageSync('orderCache');
      wx.setStorageSync('orderCache', {
        ...(orderCache || {}),
        [this.properties.merchantId]: valueArr.reduce(
          (a, b) => ({
            ...a,
            [b.goodsId]: b,
          }),
          {}
        ),
      });
      wx.navigateTo({
        url: `/pages/orderConfirmation/index?merchantId=${this.properties.merchantId}`,
      });
    },
    initdata: function (data) {
      this.data.list = data?.map((item) => item.goodsListResList).flat();
      const dataList = data.filter((item) => item.goodsListResList?.length > 0);
      this.setData({
        dataList: dataList,
        tabsView: dataList[0]?.categoryId,
      });
    },
    toEdit: function (e) {
      if (!this.properties.hideCart) return;
      var item = e.currentTarget.dataset.item;
      wx.navigateTo({
        url: `/pages/productPages/productEdit/index?id=${item.goodsId}`,
      });
    },
  },
  lifetimes: {
    ready: function () {
      this.initdata(this.properties.data);
      // this.data.list = this.properties.data
      //   ?.map((item) => item.goodsListResList)
      //   .flat();
      // const dataList = this.properties.data.filter(
      //   (item) => item.goodsListResList?.length > 0
      // );
      // this.setData({
      //   dataList: dataList,
      //   tabsView: dataList[0]?.categoryId,
      // });
    },
  },
});
