import React, { useState, useMemo } from 'react';
import { request } from '@/apis';

/**
 * 用户领券
 */
export const receiveCoupon = (data: ReceiveCouponParmas) =>
  request<string>(
    {
      method: 'POST',
      url: '/wx/api/usercoupon/receiveCoupon',
      data,
      dataType: 'json',
    },
    true
  );

type UpdateCampusParams = {
  merchantId?: string;
  status?: number;
  userId?: string;
};

export type ReceiveCouponParmas = {
  /**
   * 活动id
   */
  activityId?: string;
  /**
   * 红包金额
   */
  favorable?: number;
  /**
   * 商家编号
   */
  merNo?: string;
  /**
   * 商户id
   */
  merchantId?: string;
  /**
   * 用戶id
   */
  userId?: string;
};
export type CampusItem = {
  couponCount: 2;
  list: CampusVoucherItem[];
  merAvatarurl?: string;
  merchantId?: string;
  couponNo?: string;
  merchantName?: string;
};
export type CampusVoucherItem = {
  couponId?: string;
  couponName?: string;
  activityId?: string;
  couponNo?: string;
  effectiveTime?: string;
  favorable: number;
  merchantId?: string;
  status: number;
};
/**
 * 查询用户领取到的券
 */
export const updateCampus = (data: API.PageListReq<UpdateCampusParams>) =>
  request<API.PageListRes<CampusItem>>({
    method: 'POST',
    url: '/wx/api/usercoupon/findUserCouponList',
    data,
    dataType: 'json',
  });

type UseCouponParams = {
  couponNo?: string;
  userId?: string;
};
/**
 * 核销优惠券
 */
export const coupon = (data: UseCouponParams) =>
  request<string>(
    {
      method: 'POST',
      url: '/wx/api/usercoupon/useCoupon',
      data,
      dataType: 'json',
    },
    true
  );

export default {};
