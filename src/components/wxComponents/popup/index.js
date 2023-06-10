// eslint-disable-next-line no-undef
Component({
  options: {
    multipleSlots: true, // 在组件定义时的选项中启用多slot支持
  },
  properties: {
    addstyle: String,
  },
  data: {
    show: false,
  },
  methods: {
    open: function () {
      this.setData({
        show: true,
      });
    },
    close: function () {
      this.setData({
        show: false,
      });
    },
  },
});
