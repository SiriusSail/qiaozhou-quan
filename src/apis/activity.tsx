import { request } from '@/apis';
/**
 * 活动管理接口
 */
export const createActivity = (data: any) =>
  request<string>({
    method: 'POST',
    url: '/wx/api/activity/createActivity',
    data,
    dataType: 'json',
  });
/**
 * 活动管理接口
 */
export const getActivityById = (activityId: string) =>
  request<string>({
    method: 'GET',
    url: `/wx/api/auth/logout${activityId}`,
  });

type GetActivityListByUserIdParam = {
  userId?: string;
};

export type ActivityInfo = {
  /**	活动内容	*/
  actContent: string;
  /**	活动ID	*/
  actId: string;
  /**	领取的优惠券id	*/
  couponId: string;
  /**	随机红包	array	*/
  list: ActivetyAmountInfo[];
  /**	红包最高金额	*/
  maxAmount: number;
  /**	红包最低金额	*/
  minAmount: number;
  /**	领取状态	*/
  pickUpStatus: string;
  /**	简介  */
  description: string;
  /**	用户id  */
  userId: string;
};

export type ActivetyAmountInfo = {
  activityId: string;
  favorable: number;
};

export type ActivetyUser = {
  actContent: string;
  actId: string;
  campusName: string;
  list: ActivetyAmountInfo[];
  maxAmount: number;
  merAvatarurl: string;
  doorPhoto: string;
  getNum: string;
  description: string;
  merNo: string;
  merchantAddress: string;
  merchantId: string;
  merchantName: string;
  actDescribe: string;
  merDescribe: string;
  minAmount: number;
  pickUpStatus: string;
};

export type ActionShopInfo = {
  /**	活动列表	*/
  activityListResList: ActivityInfo[];
  /**	商家头像	*/
  merAvatarurl: string;
  /**	商家编号	*/
  merNo: string;
  /**	商家地址	*/
  merchantAddress: string;
  /**	商家id	*/
  merchantId: string;
  /**	商家名称	*/
  merchantName: string;
  /**	商家电话	*/
  merPersonTel: string;
  /**	商家背景	*/
  doorPhoto: string;
  /**	描述	*/
  merDescribe: string;
};
/**
 * 活动管理接口
 */
export const getActivityListByUserId = (
  data: API.PageListParamas<GetActivityListByUserIdParam>
) =>
  request<API.PageListRes<ActivetyUser>>({
    method: 'POST',
    url: '/wx/api/activity/getActivityListByUserId',
    data,
    dataType: 'json',
  });
/**
 * 活动管理接口
 */
export const getHistoryActivity = (userId: string) =>
  request<string>({
    method: 'GET',
    url: `/wx/api/auth/wxClickLogin/${userId}`,
  });

/**
 * 通过商户id查询商家活动
 */
export const getActivityListByMerchantId = (
  merchantId: string,
  userId?: string
) => {
  return request<ActionShopInfo>({
    method: 'GET',
    url: `/wx/api/activity/getActivityListByMerchantId/${merchantId}${
      userId ? `?userId=${userId}` : ''
    }`,
  });
};

export default {};
