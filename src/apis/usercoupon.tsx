import React, { useState, useMemo } from 'react';
import { request } from '@/apis';

/**
 * 用户领券
 */
export const receiveCoupon = (data) =>
  request<string>({
    method: 'POST',
    url: '/wx/api/usercoupon/receiveCoupon',
    data,
    dataType: 'json',
  });

type UpdateCampusParams = {
  status?: number;
  userId?: string;
};
export type CampusItem = {
  couponCount: 2;
  list: {
    couponId?: string;
    couponName?: string;
    couponNo?: string;
    effectiveTime?: string;
    favorable: number;
    merchantId?: string;
    status: number;
  }[];
  merAvatarurl?: string;
  merchantId?: string;
  merchantName?: string;
};
/**
 * 查询用户领取到的券
 */
export const updateCampus = (data: API.PageListReq<UpdateCampusParams>) =>
  request<API.PageListRes<CampusItem>>({
    method: 'POST',
    url: '/wx/api/usercoupon/updateCampus',
    data,
    dataType: 'json',
  });
/**
 * 核销优惠券
 */
export const useCoupon = (data) =>
  request<string>({
    method: 'POST',
    url: '/wx/api/usercoupon/useCoupon',
    data,
    dataType: 'json',
  });

export default {};
