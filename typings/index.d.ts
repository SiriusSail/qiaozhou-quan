declare module '*.png';
declare module '*.gif';
declare module '*.jpg';
declare module '*.jpeg';
declare module '*.svg';
declare module '*.css';
declare module '*.less';
declare module '*.scss';
declare module '*.sass';
declare module '*.styl';

declare module 'wxbarcode';

declare namespace API {
  type PropsType<T = any> = {
    code: keyof typeof codeMessage;
    data: T;
    message: string;
    success: boolean;
    timestamp: number;
  };
  type OptionsType = { key?: string; value: string };

  type PageListParamas<T = any> = {
    /**
     * 当前页
     */
    pageNo?: number;
    /**
     * 分页大小
     */
    pageSize?: number;
  } & T;
  type PageListReq<T = any> = {
    /**
     * 当前页
     */
    pageNo?: number;
    /**
     * 分页大小
     */
    pageSize?: number;
  } & T;

  type PageListRes<T = any> = {
    countId?: string;
    current?: number;
    maxLimit?: number;
    pages?: number;
    size?: number;
    total?: number;
    optimizeCountSql?: boolean;
    searchCount?: boolean;
    orders?: { asc: boolean; column: stirng }[];
    records: T[];
  };

  type UserInfo = {
    /**
     * 头像地址
     */
    avatarurl: string;
    /**
     * 城市
     */
    city: string;
    /**
     * 国家
     */
    country: string;
    /**
     * 性别
     */
    gender: string;
    /**
     * 是否有资格创建商户
     */
    isApply: string;
    /**
     * 用户id
     */
    id: string;
    /**
     * 区域
     */
    campusId: string;
    /**
     * 会员到期时间
     */
    memberEndTime: string;
    /**
     * 会员名称
     */
    memberName: string;
    /**
     * 手机号
     */
    mobile: string;
    /**
     * 用户区域
     */
    campusName: string;
    /**
     * 用户昵称
     */
    nickname: string;
    /**
     * 省份
     */
    province: string;
    /**
     * 角色
     */
    roleName: string;
    /**
     * 商户ID
     */
    merchantId: string;
    /**
     * 用户号码
     */
    userNo: string;
  };

  type ReqOptions = {
    dataCode: string;
    dataValue: string;
  };
}
