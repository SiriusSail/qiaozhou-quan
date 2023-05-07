import React from 'react';
import { findUserOrderPage } from '@/apis/order';
import OrderList from '@/components/orderList';

const Index = () => {
  return <OrderList request={findUserOrderPage} />;
};
export default Index;