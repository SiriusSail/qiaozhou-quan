import { request } from 'remax/wechat';

type RequestOptions = WechatMiniprogram.RequestOption & {
  path?: string;
} & import('@remax/framework-shared').PromisifyArgs<
    WechatMiniprogram.RequestSuccessCallbackResult,
    WechatMiniprogram.GeneralCallbackResult
  >;

interface RequestInterceptor {
  (options: RequestOptions, isHideError?: boolean):
    | Promise<RequestOptions>
    | RequestOptions;
}

interface ResponseInterceptor {
  (
    result: WechatMiniprogram.RequestSuccessCallbackResult,
    options: RequestOptions,
    isHideError?: boolean
  ):
    | Promise<WechatMiniprogram.RequestSuccessCallbackResult | void>
    | WechatMiniprogram.RequestSuccessCallbackResult
    | void;
}

export default class Request {
  constructor(
    private config: {
      baseUrl: string | undefined;
    }
  ) {}
  private getRequestOptions(options: RequestOptions): RequestOptions {
    if (
      options.url.indexOf('http://') >= 0 ||
      options.url.indexOf('https://') >= 0
    ) {
      return {
        ...options,
      };
    }
    return {
      ...options,
      url: `${this.config.baseUrl}${options.url}`,
      path: options.url,
    };
  }
  public request = async <T,>(
    options: RequestOptions,
    isHideError?: boolean
  ): Promise<
    Omit<WechatMiniprogram.RequestSuccessCallbackResult, 'data'> & { data: T }
  > => {
    let requestOptions = this.getRequestOptions(options);
    for (const item of this.requestInterceptors) {
      requestOptions = await item(requestOptions, isHideError);
    }
    let result = await request(requestOptions);
    for (const item of this.responseInterceptors) {
      result = (await item(result, requestOptions, isHideError)) || result;
    }
    return result;
  };
  private responseInterceptors: ResponseInterceptor[] = [];
  private requestInterceptors: RequestInterceptor[] = [];
  interceptors = {
    request: {
      use: (fn: RequestInterceptor) => {
        this.requestInterceptors.push(fn);
      },
    },
    response: {
      use: (fn: ResponseInterceptor) => {
        this.responseInterceptors.push(fn);
      },
    },
  };
}
