import { AppConfig } from "remax/wechat";

const config: AppConfig = {
  pages: ['pages/index/index', 'pages/my/index'],
  window: {
    navigationBarTitleText: 'Remax Wechat Template',
    navigationBarBackgroundColor: '#282c34'
  },
  tabBar: {
    color: '#BEBEBE',
    selectedColor: '#2780D9',
    backgroundColor: '#FFFFFF',
    borderStyle: 'black',
    list: [
      {
        pagePath: 'pages/index/index',
        iconPath: './images/jz@2x.png',
        selectedIconPath: './images/jzxz@2x.png',
        text: '商家'
      },
      {
        pagePath: 'pages/bag/index',
        iconPath: './images/jz@2x.png',
        selectedIconPath: './images/jzxz@2x.png',
        text: '福利带'
      },
      {
        pagePath: 'pages/my/index',
        iconPath: './images/hz@2x.png',
        selectedIconPath: './images/hzxz@2x.png',
        text: '我得'
      },
    ]
  }
};

export default config;
