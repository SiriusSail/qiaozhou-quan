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
 * 通过用户ID获取商户信息
 */
export const getMerchantByUserId = (userId: string) =>
  request<MerchantApplyParams>({
    method: 'GET',
    url: `/wx/api/merchant/getMerchantByUserId/${userId}`,
  });

/**
 * 重新申请商家
 */
export const reApplyMerchant = (data: MerchantApplyParams) => {
  return request({
    method: 'POST',
    url: '/wx/api/merchant/reApplyMerchant',
    data,
    dataType: 'json',
  });
};

/**
 * 商家申请
 */
export const merchantApply = (data: MerchantApplyParams) => {
  return request({
    method: 'POST',
    url: '/wx/api/merchant/merchantApply',
    data,
    dataType: 'json',
  });
};
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

export type MerchantApplyParams = {
  /**
   * 	校区id
   */
  campusIds?: string[];
  /**
   * 	商铺地址
   */
  merAddress?: string;
  /**
   * 	店铺简介
   */
  merDescribe?: string;
  /**
   * 	审批结果
   */
  examine?: 1 | 2 | 3;
  /**
   * 	审核状态
   */
  examineStatus?: string;
  /**
   * 	店铺资质
   */
  aptitudeUrl?: string[];
  /**
   * 	店铺照片
   */
  fileUrl?: string[];
  /**
   * 	门头照
   */
  doorPhotoUrl?: string;
  /**
   * 	商铺名称
   */
  merName?: string;
  /**
   * 	商铺头像
   */
  merAvatarUrl?: string;
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
   * 	商户ID
   */
  merchantId?: string;
  /**
   * 	用户id
   */
  userId?: string;
  /**
   * 	file
   */
  file?: string[];
  /**
   * 	file
   */
  list?: {
    campusName?: string;
    createTime?: string;
    id?: string;
  }[];
};

export default {};
