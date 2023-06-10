// eslint-disable-next-line no-undef
Component({
  options: {
    multipleSlots: true, // 在组件定义时的选项中启用多slot支持
  },
  properties: {
    height: String,
    width: String,
    previewList: Array,
    preview: Boolean,
    src: String,
  },

  methods: {
    handleClickImage: function () {
      if (!this.properties.src && !this.properties.preview) return;
      const newPreviewList =
        this.properties.previewList?.length === 0
          ? [this.properties.src]
          : this.properties.previewList;
      console.log(
        this.properties.src.replace(/_s/g, ''),
        newPreviewList
          .filter((item) => !!item)
          .map((item) => item.replace(/s_/g, ''))
      );
      wx.previewImage({
        urls: newPreviewList
          .filter((item) => !!item)
          .map((item) => item.replace(/s_/g, '')),
        current: this.properties.src.replace(/s_/g, ''),
        enablesavephoto: true,
        enableShowPhotoDownload: true,
      });
    },
  },
});
