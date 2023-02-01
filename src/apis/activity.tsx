import { request } from '@/apis';
/**
 * 活动管理接口
 */
export const createActivity = (data) =>
  request<string>({
    method: 'POST',
    url: '/wx/api/auth/login',
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
/**
 * 活动管理接口
 */
export const getActivityListByUserId = (
  data: API.PageListParamas<GetActivityListByUserIdParam>
) =>
  request<API.PageListRes<any>>({
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

export default {};
