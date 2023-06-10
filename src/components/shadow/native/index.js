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
    addstyle: String,
    contentstyle: String,
    arrow: Boolean,
  },
  data: {
    id: '',
    isShow: false,
  },
  lifetimes: {},
});
