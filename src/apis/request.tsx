import { request } from 'remax/wechat';

type RequestOptions = WechatMiniprogram.RequestOption & {
  path?: string;
} & import('@remax/framework-shared').PromisifyArgs<
    WechatMiniprogram.RequestSuccessCallbackResult['data'],
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
    | Promise<WechatMiniprogram.RequestSuccessCallbackResult['data'] | void>
    | WechatMiniprogram.RequestSuccessCallbackResult['data']
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
    showLoading?: boolean
  ): Promise<T> =>
    // Omit<WechatMiniprogram.RequestSuccessCallbackResult, 'data'> & { data: T }>
    {
      let requestOptions = this.getRequestOptions(options);
      for (const item of this.requestInterceptors) {
        requestOptions = await item(requestOptions, showLoading);
      }
      let result = await request(requestOptions);
      for (const item of this.responseInterceptors) {
        result = (await item(result, requestOptions, showLoading)) || result;
      }
      return result as any;
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
