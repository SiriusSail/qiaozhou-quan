/* eslint-disable @typescript-eslint/no-this-alias,no-undef */
/* eslint-disable no-var */
var idCount = 0;

// eslint-disable-next-line no-undef
Component({
  options: {
    multipleSlots: true, // 在组件定义时的选项中启用多slot支持
  },
  properties: {
    className: String,
    perf: Boolean,
    list: Object,
    height: Number,
  },
  data: {
    id: '',
    isShow: false,
    list: [],
  },
  lifetimes: {
    ready: function () {
      console.log(123123);
      wx.nextTick(() => {
        console.log(this.properties);
        this.setData({
          id: `visible${idCount++}`,
          height: this.properties.height || 1,
          list: this.properties.list || [],
        });
        var offsetY = this.properties.perf
          ? // eslint-disable-next-line no-undef
            wx.getSystemInfoSync().windowHeight * 2
          : 0;
        var that = this;
        wx.createIntersectionObserver(this)
          .relativeToViewport({
            top: offsetY,
            bottom: offsetY,
          })
          .observe(
            `#${this.data.id}`,
            function ({ intersectionRect: { height } }) {
              var isShow = height > 0;
              that.setData({ isShow });
              if (isShow) {
                that.triggerEvent('visible');
              } else {
                that.triggerEvent('hidden');
              }
            }
          );
      });
    },
  },
});
