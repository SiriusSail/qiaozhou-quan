import { request } from '@/apis';

/**
 * 通过商家id查询商品分类列表
 */
export const findGoodsCategoryList = (merchantId: string) =>
  request<CategoryInfo[]>({
    method: 'POST',
    url: `/wx/api/category/findGoodsCategoryList`,
  });
/**
 * 新增商品类别
 */
export const categoryAdd = (data: CategoryInfo) =>
  request({
    method: 'POST',
    data,
    dataType: 'json',
    url: `/wx/api/category/add`,
  });
/**
 * 修改商品类别
 */
export const categoryUpdate = (data: CategoryInfo) =>
  request({
    method: 'POST',
    data,
    dataType: 'json',
    url: `/wx/api/category/update`,
  });
/**
 * 删除商品
 */
export const categoryDelete = (goodsId: string) =>
  request({
    method: 'DELETE',
    url: `/wx/api/category/delete/${goodsId}`,
  });

export type CategoryInfo = {
  /**
   * ID
   */
  id?: string;
  /**
   * 分类名称
   */
  name: string;
  /**
   * 描述
   */
  remarks: string;
};

export default {};
