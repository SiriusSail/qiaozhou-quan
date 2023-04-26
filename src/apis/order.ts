import { request } from '@/apis';

/**
 * 分页查询订单
 */
export const orderPage = (data: API.PageListReq<{ status?: string }>) =>
  request<API.PageListRes<ResOrder>>({
    method: 'POST',
    dataType: 'json',
    data,
    url: `/wx/api/order/page`,
  });
/**
 * 完成订单
 */
export const completeOrder = (orderId: string) =>
  request({
    method: 'GET',
    url: `/wx/api/order/completeOrder/${orderId}`,
  });
/**
 * 订单明细
 */
export const findOrderInfoByOrderId = (orderId: string) =>
  request<ResOrder>({
    method: 'GET',
    url: `/wx/api/order/findOrderInfoByOrderId/${orderId}`,
  });
/**
 * 下单
 */
export const placeOrder = (data: ReqOrder) =>
  request(
    {
      method: 'POST',
      data,
      dataType: 'json',
      url: `/wx/api/order/placeOrder`,
    },
    true
  );

/**
 * 取消订单
 */
export const cancelOrder = (data: { cancelRemarks: string; orderId: string }) =>
  request({
    method: 'POST',
    data,
    url: `/wx/api/order/cancelOrder`,
  });

export type ResOrder = {
  /**
   * 	取消备注
   */
  cancelRemarks: string;
  /**
   * 	取消备注
   */
  merAvatarurl: string;
  /**
   * 	取消时间
   */
  cancelTime: string;
  /**
   * 	完成时间
   */
  completeTime: string;
  /**
   * 	红包金额
   */
  couponMoney: number;
  /**
   * 	下单时间
   */
  createTime: string;
  /**
   * 	取餐时间
   */
  departTime: string;
  /**
   * 	优惠金额
   */
  discountMoney: number;
  /**
   * 	商铺名称
   */
  merName: string;
  /**
   * 	商铺id
   */
  merchantId: string;
  /**
   * 	订单id
   */
  orderId: string;
  /**
   * 	订单编号
   */
  orderNum: string;
  /**
   * 	实付金额
   */
  payMoney: number;
  /**
   * 	下单备注
   */
  remarks: string;
  /**
   * 	订单状态
   */
  statusDesc: string;
  wxOrderGoodsDetailResList: OrderGoods[];
};

export type OrderGoods = {
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
   * 	订单商品数量
   */
  number: number;
  /**
   * 	订单id
   */
  orderId: string;
  /**
   * 	价格
   */
  price: number;
  /**
   * 	描述
   */
  remarks: string;
  /**
   * 	标签
   */
  tags: string;
};

export type ReqOrder = {
  couponId?: string;
  departTime?: string;
  merchantId?: string;
  placeOrderGoodsReqList?: Order[];
  remarks?: string;
};

export type Order = {
  goodsId: string;
  number: number;
  price: number;
};

export default {};
