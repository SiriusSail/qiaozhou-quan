// eslint-disable-next-line no-undef
Component({
  options: {
    multipleSlots: true, // 在组件定义时的选项中启用多slot支持
  },
  properties: {
    placeholder: String,
    defaultOpen: Boolean,
    value: {
      type: String,
      value: '',
      observer: function (newVal) {
        this.setData({
          value: newVal,
        });
      },
    },
    range: Array,
    height: Number,
  },
  data: {
    menuOption: wx.getMenuButtonBoundingClientRect(),
    id: '',
    placeholder: '请选择',
    rangeObject: {},
    value: '',
    isOpen: false,
    inputValue: '',
    isBlur: false,
    searchValue: undefined,
    option: [],
  },
  observers: {
    range: function (newVal) {
      //  'params'是要监听的字段，（params）是已更新变化后的数据
      this.setData({
        rangeObject: newVal?.reduce((a, b) => {
          return { ...a, [b.value]: b.label };
        }, {}),
      });
      this.updateOption();
      if (
        this.properties.defaultOpen &&
        newVal?.length > 0 &&
        !this.data.value
      ) {
        this.setData({
          isOpen: true,
        });
      }
    },
  },

  methods: {
    updateOption: function () {
      const inputValue = this.data.inputValue;
      const option = this.properties.range?.map((item) => item.label);
      console.log(option);
      this.setData({
        option: inputValue
          ? option.filter((item) => item.includes(inputValue))
          : option,
      });
    },
    onChange: function (e) {
      const find =
        this.properties.range?.find(
          (item) => item.label === e.currentTarget.dataset.item
        ).value || e.currentTarget.dataset.item;
      this.setData({
        value: find,
        isOpen: false,
      });
      this.triggerEvent('change', find);
    },
    open: function () {
      this.setData({
        isOpen: true,
      });
    },
    close: function () {
      this.setData({
        isOpen: false,
      });
    },
    onBlur: function () {
      this.setData({
        isBlur: true,
      });
    },
    onFocus: function () {
      this.setData({
        isBlur: false,
      });
    },
    onInput: function (e) {
      this.data.inputValue = e.detail.value;
      this.updateOption();
    },
  },

  // lifetimes: {
  //   ready: function () {
  //     // console.log(1);
  //   },
  // },
});
