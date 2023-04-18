import { request } from '@/apis';

/**
 * 通过商家id查询商品列表
 */
export const findGoodsListByMerchantId = (merchantId: string) =>
  request<FindGoods>({
    method: 'GET',
    url: `/wx/api/goods/findGoodsListByMerchantId/${merchantId}`,
  });
/**
 * 下架商品
 */
export const goodsDisable = (goodsId: string) =>
  request({
    method: 'GET',
    url: `/wx/api/goods/disable/${goodsId}`,
  });
/**
 * 上架商品
 */
export const goodsEnable = (goodsId: string) =>
  request({
    method: 'GET',
    url: `/wx/api/goods/enable/${goodsId}`,
  });
/**
 * 查询商品详情
 */
export const findGoodsByGoodsId = (goodsId: string) =>
  request<Find>({
    method: 'POST',
    url: `/wx/api/goods/findGoodsByGoodsId/${goodsId}`,
  });
/**
 * 新增商品
 */
export const goodsAdd = (data: Find) =>
  request({
    method: 'POST',
    data,
    url: `/wx/api/goods/add`,
  });
/**
 * 修改商品
 */
export const goodsUpdate = (data: Find) =>
  request({
    method: 'POST',
    data,
    url: `/wx/api/goods/update`,
  });
/**
 * 判断商品库存
 */
export const decideGoodsOverNum = (goodsId: string) =>
  request<number>({
    method: 'GET',
    url: `/wx/api/goods/decideGoodsOverNum/${goodsId}`,
  });
/**
 * 删除商品
 */
export const goodsDelete = (goodsId: string) =>
  request({
    method: 'DELETE',
    url: `/wx/api/goods/delete/${goodsId}`,
  });

export type FindGoods = {
  // 门头照
  doorPhotoUrl: '';
  goodsCategoryListResList: Category[];
  merAddress: '';
  merAvatarurl: '';
  merDescribe: '';
  merName: '';
  merPerson: '';
  merPersonTel: '';
  merchantId: '';
  merchantPhotoList: [];
  sellNum: 0;
};

type Category = {
  categoryId: string;
  categoryName: string;
  goodsListResList: Find[];
};

export type Find = {
  /**
   * 	商家分类id
   */
  categoryId: string;
  /**
   * 	商品图片
   */
  cover: string;
  /**
   * 	商品id
   */
  goodsId: string;
  /**
   * 	商品名称
   */
  goodsName: string;
  /**
   * 	剩余数量
   */
  overNum: number;
  /**
   * 	价格
   */
  price: number;
  /**
   * 	描述
   */
  remarks: string;
  /**
   * 	状态 0 上架 1 下架
   */
  status: 0 | 1;
  /**
   * 	状态
   */
  statusDesc: string;
  /**
   * 	标签
   */
  tags: string;
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
