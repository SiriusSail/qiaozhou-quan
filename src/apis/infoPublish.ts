import { request } from '@/apis';

export type PublishInfo = {
  id?: string;
  /**
   * 地址
   */
  address?: string;
  /**
   * 联系人
   */
  contact?: string;
  /**
   * 发布内容
   */
  content?: string;
  /**
   * 店铺照片
   */
  file?: string[];
  /**
   * 联系电话
   */
  phone?: string;
  /**
   * 交易类型(1:我要买,2:我要卖)
   */
  tradeType?: 1 | 2;
  /**
   * 类型(1:店铺转让,2、二手设备,3、供应采购,4、招商加盟)
   */
  type?: 1 | 2 | 3 | 4;
};

/**
 * 首页-根据校区和类型分页查询信息发布
 */
export const publishInfoPage = (data: API.PageListReq<PublishInfo>) =>
  request<API.PageListRes<PublishInfo>>({
    method: 'POST',
    dataType: 'json',
    data,
    url: '/wx/api/infoPublish/findInfoPublishPageByCampusId',
  });

/**
 * 根据当前用户分页查询信息发布列表
 */
export const findInfoPublishPageByUserId = (data: API.PageListReq) =>
  request<API.PageListRes<PublishInfo>>({
    method: 'POST',
    dataType: 'json',
    data,
    url: '/wx/api/infoPublish/findInfoPublishPageByUserId',
  });

/**
 * 新增发布信息
 */

export const addPublishInfo = (data: PublishInfo) =>
  request<string>({
    method: 'POST',
    dataType: 'json',
    url: '/wx/api/infoPublish/add',
    data,
  });

/**
 * 查询发布信息
 */

export const getPublishInfo = (id: string) =>
  request<PublishInfo>({
    method: 'POST',
    url: `/wx/api/infoPublish/getInfoPublishById/${id}`,
  });

export const updatePublishInfo = (data: PublishInfo) =>
  request({
    method: 'POST',
    dataType: 'json',
    url: '/wx/api/infoPublish/update',
    data,
  });

/**
 * 删除
 */
export const delPublishInfo = (id: string) =>
  request({
    method: 'DELETE',
    dataType: 'json',
    url: `/wx/api/infoPublish/delete/${id}`,
  });

export default {};
