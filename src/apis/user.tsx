import React, { useState, useMemo } from 'react';
import { request } from '@/apis';

/**
 * 会员开通
 */
export const openMember = (data) =>
  request<string>({
    method: 'POST',
    url: '/wx/api/user/openMember',
    data,
    dataType: 'json',
  });

type UpdateCampusParams = {
  /**
   * 校区id
   */
  campusId?: string;
  /**
   * 城市
   */
  city?: string;
  /**
   * 国家
   */
  country?: string;
  /**
   * 省份
   */
  province?: string;
  /**
   * 用户id
   */
  userId?: string;
};
/**
 * 通过用户id修改校区
 */
export const updateCampus = (data: UpdateCampusParams) =>
  request<string>(
    {
      method: 'POST',
      url: '/wx/api/user/updateCampus',
      data,
      dataType: 'json',
    },
    true
  );
/**
 * 用户充值
 */
export const userRecharge = (data) =>
  request<string>(
    {
      method: 'POST',
      url: '/wx/api/user/userRecharge',
      data,
      dataType: 'json',
    },
    true
  );

type RoutType = {
  code: string;
  id: string;
  name: string;
  sort: string;
};
/**
 * 查询当前用户菜单列表
 */
export const findMenuList = () =>
  request<RoutType[]>(
    {
      method: 'GET',
      url: '/wx/api/user/findMenuList',
    },
    true
  );

export default {};
