const defaultPageSize = 20;

let d = null;
let s = null;
// eslint-disable-next-line no-undef
Component({
  options: {
    multipleSlots: true, // 在组件定义时的选项中启用多slot支持
  },
  properties: {
    params: Object,
    navigationStyle: String,
    noDataText: String,
    request: Function,
    pageSize: Number,
  },
  data: {
    menuOptionTop: wx.getMenuButtonBoundingClientRect()?.top,
    end: false,
    /**
     * 是否正在加载数据
     */
    loading: false,
    /**
     * 是否正在下拉
     */
    triggered: false,
    pageNo: 0,
    // 分级数据
    dataList: [],
    endtimes: 0,
    // 最终数据
    list: [],
  },
  observers: {
    params: function () {
      this.data.pageNo = 0;
      console.log('数据变化重新加载');
      this.getList();
      this.setData({
        dataList: [],
        list: [],
      });
      this.updata();
    },
  },
  methods: {
    updata() {
      this.triggerEvent('updateList', {
        list: this.data.dataList.flat(),
        pageNo: this.data.pageNo,
        pageSize: this.properties.pageSize || 20,
      });
    },
    reRequest() {
      this.data.pageNo = 0;
      console.log('数据刷新');
      this.getList();
    },
    async getList() {
      this.setData({
        loading: true,
        end: false,
      });
      try {
        const data = await this.properties.request({
          pageNo: this.data.pageNo + 1,
          pageSize: this.properties.pageSize || 20,
          ...this.properties.params,
        });

        if (this.data.pageNo === 0) {
          this.data.dataList = [];
        }
        this.data.dataList[this.data.pageNo] = data?.records;
        if (data?.records?.length < (this.properties.pageSize || 20)) {
          this.setData({
            end: true,
          });
        } else {
          this.data.pageNo = this.data.pageNo + 1;
        }
        this.updata();
      } catch (error) {
        console.log('错误信息', error);
      }
      if (this.data.triggered === true) {
        s = setTimeout(() => {
          this.setData({
            triggered: false,
          });
          clearTimeout(s);
          s = null;
        }, 1500);
      }
      d = setTimeout(() => {
        this.setData({
          loading: false,
          list: this.data.dataList.flat(),
        });
        clearTimeout(d);
        d = null;
      }, 500);
    },
    async handleRefresherRefresh() {
      this.data.pageNo = 0;
      this.setData({
        triggered: true,
      });
      console.log('下拉刷新');
      this.getList();
      // console.log("handle refresher refresh")
      // this.getContentList(this.data.tabId)
    },
    handleScrollToLower(e) {
      console.log('滑到底部', this.data.loading, this.data.end);
      if (this.data.loading) return;
      if (this.data.end) {
        this.data.endtimes++;
        if (this.data.endtimes < 3) return;
        this.data.endtimes = 0;
      }
      console.log('加载下一页');
      this.getList();
    },
  },
  lifetimes: {
    ready: function () {
      this.getList();
      if (this.properties.navigationStyle !== 'custom') {
        this.setData({
          menuOptionTop: 0,
        });
      }
    },
  },
});
