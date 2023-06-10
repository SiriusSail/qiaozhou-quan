// eslint-disable-next-line no-undef
Component({
  options: {
    multipleSlots: true, // 在组件定义时的选项中启用多slot支持
  },
  properties: {
    text: String,
    size: String,
    color: String,
    iconstyle: String,
    textstyle: String,
  },
  data: {
    itext: false,
    isize: 26,
    icolor: '#E8813E',
    iiconstyle: '',
    itextstyle: '',
  },
  observers: {
    size: function (newValue) {
      this.setData({
        isize: newValue,
      });
    },
    iconstyle: function (newValue) {
      this.setData({
        iiconstyle: newValue,
      });
    },
    textstyle: function (newValue) {
      this.setData({
        itextstyle: newValue,
      });
    },
    color: function (newValue) {
      this.setData({
        icolor: newValue,
      });
    },
    text: function (newValue) {
      this.setData({
        itext: newValue,
      });
    },
  },
});
