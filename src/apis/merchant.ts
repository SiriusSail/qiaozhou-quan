import React, { useState, useMemo } from 'react';
import { request } from '@/apis';

/**
 * 获取商户经营类别列表
 */
export const getMerchantType = () =>
  request<API.ReqOptions[]>({
    method: 'GET',
    url: '/wx/api/merchant/getMerchantType',
  });

/**
 * 商家申请
 */
export const merchantApply = (data: MerchantApplyParams) =>
  request({
    method: 'POST',
    url: '/wx/api/merchant/merchantApply',
    data,
  });
/**
 * 通过用户id修改商家所属校区
 */
export const updateMerchantCampus = (data: MerchantApplyParams) =>
  request({
    method: 'POST',
    url: '/wx/api/merchant/updateMerchantCampus',
    data,
    dataType: 'json',
  });

type MerchantApplyParams = {
  /**
   * 	校区id
   */
  campusIds?: string[];
  /**
   * 	商铺地址
   */
  merAddress?: string;
  /**
   * 	商铺名称
   */
  merName?: string;
  /**
   * 	商铺负责人
   */
  merPerson?: string;
  /**
   * 	联系人电话
   */
  merPersonTel?: string;
  /**
   * 	商铺类型
   */
  merType?: string;
  /**
   * 	用户id
   */
  userId?: string;
  /**
   * 	file
   */
  file?: string[];
};

export default {};
