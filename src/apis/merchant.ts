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
  return request(
    {
      method: 'POST',
      url: '/wx/api/merchant/reApplyMerchant',
      data,
      dataType: 'json',
    },
    true
  );
};

/**
 * 商家申请
 */
export const merchantApply = (data: MerchantApplyParams) => {
  return request(
    {
      method: 'POST',
      url: '/wx/api/merchant/merchantApply',
      data,
      dataType: 'json',
    },
    true
  );
};
/**
 * 修改商家
 */
export const updateMerchantCampus = (data: MerchantApplyParams) =>
  request(
    {
      method: 'POST',
      url: '/wx/api/merchant/updateMerchantCampus',
      data,
      dataType: 'json',
    },
    true
  );

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
  doorPhoto?: string;
  /**
   * 	商铺名称
   */
  merName?: string;
  /**
   * 	商铺头像
   */
  merAvatarUrl?: string;
  merAvatar?: string;
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

export type AccontType = {
  menuIds?: string[];
  menuList?: string[];
  mobile?: string;
  nickName?: string;
  userId?: string;
  id?: string;
};

type RoutType = {
  code: string;
  id: string;
  name: string;
  sort: string;
};
export type AccontInfoType = {
  menuList: RoutType[];
  mobile: string;
  nickname: string;
  nickName: string;
  id: string;
};

/**
 * 查询员工详情
 */
export const getSubAccountDetail = (userId?: string) =>
  request<AccontInfoType>({
    method: 'GET',
    url: `/wx/api/merchant/getSubAccountDetail/${userId}`,
  });

/**
 * 删除员工信息
 */
export const deleteSubAccount = (userId?: string) =>
  request<MerchantApplyParams>({
    method: 'GET',
    url: `/wx/api/merchant/deleteSubAccount/${userId}`,
  });

/**
 * 修改查询员工
 */
export const updateSubAccount = (data: AccontType) =>
  request<MerchantApplyParams>({
    method: 'POST',
    data,
    url: `/wx/api/merchant/updateSubAccount`,
    dataType: 'json',
  });

/**
 * 保存员工信息
 */
export const saveSubAccount = (data: AccontType) =>
  request<MerchantApplyParams>({
    method: 'POST',
    data,
    url: `/wx/api/merchant/saveSubAccount`,
    dataType: 'json',
  });

/**
 * 查询员工列表
 */
export const findSubAccountList = () =>
  request<AccontType[]>({
    method: 'GET',
    url: `/wx/api/merchant/findSubAccountList`,
  });

export default {};
