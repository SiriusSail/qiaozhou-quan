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
/**
 * 通过用户id修改校区
 */
export const updateCampus = (data) =>
  request<string>({
    method: 'POST',
    url: '/wx/api/user/updateCampus',
    data,
    dataType: 'json',
  });
/**
 * 用户充值
 */
export const userRecharge = (data) =>
  request<string>({
    method: 'POST',
    url: '/wx/api/user/userRecharge',
    data,
    dataType: 'json',
  });

export default {};
