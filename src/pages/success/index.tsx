import React from 'react';
import { switchTab } from 'remax/wechat';
import { Result, Button, Space } from 'anna-remax-ui';

const Index = () => {
  return (
    <Result
      height='100vh'
      status='success'
      icon={{
        color: '#fa8c16',
        name: 'roundcheckfill',
      }}
      title='下单成功'
      subTitle='您的订单已经发送给商家，请您前往店铺付款取餐'
      extra={
        <Space size={20}>
          <Button
            plain
            hairline
            color='#ff4f00'
            onTap={() =>
              switchTab({
                url: '/pages/index/index',
              })
            }>
            返回首页
          </Button>
          <Button
            type='primary'
            look='orange'
            onTap={() =>
              switchTab({
                url: '/pages/order/index',
              })
            }
            style={{ marginRight: '24px' }}>
            查看订单
          </Button>
        </Space>
      }
    />
  );
};
export default Index;
