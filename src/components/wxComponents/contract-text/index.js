const defaultPageSize = 20;

let d = null;
let s = null;
// eslint-disable-next-line no-undef
Component({
  options: {
    multipleSlots: true, // 在组件定义时的选项中启用多slot支持
  },
  properties: {
    text: String,
    addstype: String,
  },
  data: {
    expand: false,
    noHide: false,
    content: '',
  },
  observers: {
    text: function (newValue) {
      this.fntext(newValue);
    },
  },
  methods: {
    fntext(text) {
      let newText = text;
      if (text.length < 50) {
        this.setData({
          noHide: true,
          content: newText,
          maxHeight: 'none',
        });
      } else if (!this.data.expand) {
        newText = text.slice(0, 30) + '...';
      }
      this.setData({
        content: newText,
      });
    },
    none() {},
    toggle() {
      this.setData({
        expand: !this.data.expand,
      });
      this.fntext(this.properties.text);
    },
  },
});
