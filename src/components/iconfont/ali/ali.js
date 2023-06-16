Component({
  props: {
    // qz-shangpin | qz-tubiaolunkuo- | qz-fenxiang1 | qz-liwu | qz-dailiren | qz-dianpu1 | qz-chahao | qz-shijian | qz-shanchu | qz-zhifu | qz-tianxuangouren | qz-weibolu | qz-shouji | qz-gouwucheman | qz-dianpu | qz-fenxiang | qz-yaoqingjiangli | qz-VIP | qz-gongzuozheng | qz-jiahao | qz-24gf-telephone | qz-renzheng1 | qz-gerenzhongxin-hongbao | qz-huiyuan1 | qz-nan | qz-shezhi | qz-youhuiquan | qz-dingwei | qz-huiyuan2 | qz-dingdan | qz-dingdan2 | qz-tianjiatupian_huaban | qz-jiameng | qz-huiyuan3 | qz-yuangongguanli | qz-huodongguanli | qz-gongzuozhengrenzheng | qz-shangdian | qz-jiamengguanli | qz-fabu | qz-nv | qz-shequ | qz-shouye1 | qz-canju | qz-jiahao2fill | qz-zengjia | qz-jianshao | qz-hongbao | qz-wode-copy | qz-hongbao1 | qz-shouye | qz-tipvip
    name: null,
    // string | string[]
    color: '',
    size: 41,
  },
  data: {
    colors: '',
    quot: '"',
    svgSize: 41,
    isStr: true,
  },
  didMount() {
    const size = this.props.size;
    const color = this.props.color;

    this.setData({
      colors: this.fixColor(color),
      isStr: typeof color === 'string',
    });

    if (size !== this.data.svgSize) {
      this.setData({
        svgSize: size / 750 * my.getSystemInfoSync().windowWidth,
      });
    }
  },
  disUpdate(prevProps) {
    const size = this.props.size;
    const color = this.props.color;

    if (color !== prevProps.color) {
      this.setData({
        colors: this.fixColor(color),
        isStr: typeof color === 'string',
      });
    }

    if (size !== prevProps.size) {
      this.setData({
        svgSize: size / 750 * my.getSystemInfoSync().windowWidth,
      });
    }
  },
  methods: {
    fixColor: function() {
      var color = this.props.color;
      var hex2rgb = this.hex2rgb;

      if (typeof color === 'string') {
        return color.indexOf('#') === 0 ? hex2rgb(color) : color;
      }

      return color.map(function (item) {
        return item.indexOf('#') === 0 ? hex2rgb(item) : item;
      });
    },
    hex2rgb: function(hex) {
      var rgb = [];

      hex = hex.substr(1);

      if (hex.length === 3) {
        hex = hex.replace(/(.)/g, '$1$1');
      }

      hex.replace(/../g, function(color) {
        rgb.push(parseInt(color, 0x10));
        return color;
      });

      return 'rgb(' + rgb.join(',') + ')';
    }
  }
});
