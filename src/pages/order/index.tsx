// import React, { useRef, useCallback } from 'react';
// import { orderPage } from '@/apis/order';
// import { showNavigationBarLoading } from 'remax/wechat';
// import OrderList from '@/components/orderList';
// import { usePageEvent } from 'remax/macro';

// const Index = () => {
//   const timeout = useRef<any>();
//   const upDate = useCallback(() => {
//     timeout.current = setTimeout(() => {
//       showNavigationBarLoading();
//       timeout.current && clearTimeout(timeout.current);
//       timeout.current = null;
//       upDate();
//     }, 40000);
//   }, []);
//   usePageEvent('onLoad', () => {
//     console.log('启动计时器');
//     upDate();
//   });
//   usePageEvent('onUnload', () => {
//     console.log('取消计时器');
//     timeout.current && clearTimeout(timeout.current);
//     timeout.current = null;
//   });
//   return <OrderList request={orderPage} />;
// };
// export default Index;

import React from 'react';
import { findUserOrderPage } from '@/apis/order';
import OrderList from '@/components/orderList';

const Index = () => {
  return <OrderList request={findUserOrderPage} />;
};
export default Index;
