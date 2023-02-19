import React, { useCallback, useRef } from 'react';
import List from '../list';
import { usePageEvent } from 'remax/macro';

export type PropsType<D = any> = {
  getList: (params: API.PageListReq) => Promise<API.PageListRes<D>>;
  renderItem: (data: D, index: number, list: D[]) => React.ReactElement;
  isDownRefresh?: boolean;
  cacheKey?: string;
  ref?:
    | React.Ref<{
        refreshList: (retainList?: boolean | undefined) => Promise<void>;
      }>
    | undefined;
  renderItemHeight?: (data: D, index: number) => number;
  /**
   * 加载中的提示元素
   * @default <Loading top/>
   */
  loadingTip?: React.ReactNode;
};

const Index = <D,>({
  getList,
  isDownRefresh = true,
  renderItem,
  renderItemHeight,
  loadingTip,
  cacheKey,
}: PropsType<D>) => {
  const ref = useRef<{
    refreshList: (retainList?: boolean | undefined) => Promise<void>;
  }>(null);
  // 下拉刷新
  usePageEvent('onPullDownRefresh', () => {
    if (isDownRefresh) {
      return ref.current?.refreshList(true);
    }
    return Promise.resolve({});
  });

  usePageEvent('onShow', () => {
    if (isDownRefresh) {
      ref.current?.refreshList(true);
    }
  });

  const requestList = useCallback(
    (page, limit) =>
      getList({
        pageNo: page,
        pageSize: limit,
      }).then((data) => {
        return {
          list: data.records,
          pageNum: data.current,
          pageSize: data.size,
          total: data.total,
        };
      }),
    [getList]
  );
  return (
    <List<D>
      ref={ref}
      renderItemHeight={renderItemHeight}
      defaultLimit={20}
      loadingTip={loadingTip}
      getList={requestList}
      renderItem={renderItem}
      cacheKey={cacheKey}
    />
  );
};

export default Index;
