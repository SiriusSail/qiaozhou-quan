import React, { useState, useMemo } from 'react';
import { request } from '@/apis';

/**
 * 支付
 */
export const pay = (data) =>
  request<string>({
    method: 'POST',
    url: '/wx/api/payment/pay',
    data,
    dataType: 'json',
  });
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
