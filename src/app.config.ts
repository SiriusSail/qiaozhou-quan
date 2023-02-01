import { AppConfig } from 'remax/wechat';

const config: AppConfig = {
  pages: [
    'pages/index/index', // 首页
    'pages/my/index', // 我的
    'pages/bag/index', // 福利袋
    'pages/setting/index', // 设置
    'pages/activity/index', // 活动管理
    'pages/activityDetails/index', // 活动详情
    'pages/userInfo/index', // 商家信息
    'pages/userIdea/index', // 商家修改
    'pages/activitySetting/index', // 活动活动设置
    'pages/login/index', // 登录
  ],
  window: {
    navigationBarTitleText: '抢券小程序',
    navigationBarBackgroundColor: '#fff',
    navigationBarTextStyle: 'black',
    backgroundColor: '#fff',
  },
  tabBar: {
    color: '#BEBEBE',
    selectedColor: '#2780D9',
    backgroundColor: '#FFFFFF',
    borderStyle: 'white',
    list: [
      {
        pagePath: 'pages/index/index',
        iconPath: './images/jz@2x.png',
        selectedIconPath: './images/jzxz@2x.png',
        text: '商家',
      },
      {
        pagePath: 'pages/bag/index',
        iconPath: './images/jz@2x.png',
        selectedIconPath: './images/jzxz@2x.png',
        text: '福利袋',
      },
      {
        pagePath: 'pages/my/index',
        iconPath: './images/hz@2x.png',
        selectedIconPath: './images/hzxz@2x.png',
        text: '我得',
      },
    ],
  },
};

export default config;
