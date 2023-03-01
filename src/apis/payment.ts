import React, { useState, useMemo } from 'react';
import { request } from '@/apis';

type PayParams = {
  amount: string;
  userId: string;
};

type PayReq = {
  timeStamp: string;
  nonceStr: string;
  packageValue: string;
  signType: 'MD5' | 'HMAC-SHA256' | 'RSA' | undefined;
  paySign: string;
};
/**
 * 支付
 */
export const pay = (data: PayParams) =>
  request<PayReq>(
    {
      method: 'POST',
      url: '/wx/api/payment/pay',
      data,
      dataType: 'json',
    },
    true
  );
/**
 * 支付回调
 */
export const payNotify = (data) =>
  request<string>({
    method: 'POST',
    url: '/wx/api/payment/payNotify',
    data,
    dataType: 'json',
  });

export default {};
