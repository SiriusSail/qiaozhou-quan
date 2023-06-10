import React, { useState, useMemo } from 'react';
import { request } from '@/apis';

/**
 * 查询校区列表
 */
export const campusPage = () =>
  request<CampusPageType[]>({
    method: 'POST',
    url: `/wx/api/campus/allCampusList`,
    dataType: 'json',
  });
/**
 * 查询枚举
 */
export const getEnums = (code: string) =>
  request<CampusPageType[]>({
    method: 'POST',
    url: `/wx/api/campus/allCampusList/${code}`,
    dataType: 'json',
  });

type CampusPageType = {
  /**
   *
   */
  campusLat?: number;
  /**
   *
   */
  campusLng?: number;
  /**
   *
   */
  campusName?: string;
  /**
   * 	创建人
   */
  createBy?: string;
  /**
   * 	创建时间
   */
  createTime?: string;
  /**
   * 	描述
   */
  description?: string;
  /**
   *
   */
  groupId?: string;
  /**
   * 	id
   */
  id?: string;
  /**
   * 	修改人
   */
  updateBy?: string;
  /**
   * 	修改时间
   */
  updateTime?: string;
};

export default {};
