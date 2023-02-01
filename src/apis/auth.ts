import React, { useState, useMemo } from 'react';
import { request } from '@/apis';

/**
 * 获取微信手机号
 */
export const bindPhone = (data) =>
  request<string>({
    method: 'POST',
    url: '/wx/api/auth/bindPhone',
    data,
    dataType: 'json',
  });
/**
 * 获取当前登录用户信息
 */
export const info = (data) =>
  request<string>({
    method: 'POST',
    url: '/wx/api/auth/info',
    data,
    dataType: 'json',
  });
/**
 * 帐号密码登录
 */
export const login = (data) =>
  request<string>({
    method: 'POST',
    url: '/wx/api/auth/login',
    data,
    dataType: 'json',
  });
/**
 * 用户登出
 */
export const logout = () =>
  request({
    method: 'GET',
    url: '/wx/api/auth/logout',
  });
/**
 * 修改用户密码
 */
export const updatePassword = (data) =>
  request<string>({
    method: 'POST',
    url: '/wx/api/auth/updatePassword',
    data,
    dataType: 'json',
  });
/**
 * 通过用户id修改商家所属校区微信一键登录
 */
export const wxClickLogin = (data) =>
  request<string>({
    method: 'POST',
    url: '/wx/api/auth/wxClickLogin',
    data,
    dataType: 'json',
  });

export default {};
