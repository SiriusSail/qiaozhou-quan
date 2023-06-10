import React, { useState, useMemo } from 'react';
import { request } from '@/apis';

export type Jobinfo = {
  /**
   * ID
   */
  id?: string;
  /**
   * 岗位介绍	string
   */
  jobDesc?: string;
  /**
   * 招聘人数	integer
   */
  jobNumber?: string;
  /**
   * 岗位类型(1兼职,2全职)	integer
   */
  jobType?: 1 | 2;
  /**
   * 发布状态(1开启,0关闭)	integer
   */
  status?: 1 | 0;
};

/**
 * 分页查询订单
 */
export const jobinfoPage = (data: API.PageListReq) =>
  request<API.PageListRes<Jobinfo>>({
    method: 'POST',
    dataType: 'json',
    data,
    url: '/wx/api/jobInfo/findJobInfoPageByUserId',
  });

/**
 * 新增招聘信息
 */

export const addJobinfo = (data: Jobinfo) =>
  request<string>({
    method: 'POST',
    dataType: 'json',
    url: '/wx/api/jobInfo/add',
    data,
  });

/**
 * 查询招聘信息
 */

export const getJobinfo = (id: string) =>
  request<Jobinfo>({
    method: 'POST',
    url: `/wx/api/jobInfo/getJobInfoById/${id}`,
  });

export const updateJobinfo = (data: Jobinfo) =>
  request<string>({
    method: 'POST',
    dataType: 'json',
    url: '/wx/api/jobInfo/update',
    data,
  });

export default {};
