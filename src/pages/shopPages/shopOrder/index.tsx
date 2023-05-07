import React from 'react';
import { orderPage } from '@/apis/order';
import OrderList from '@/components/orderList';

const Index = () => {
  return <OrderList request={orderPage} />;
};
export default Index;
