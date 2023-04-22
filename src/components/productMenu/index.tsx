// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import React from 'react';
import { ScrollView, View, createSelectorQuery } from 'remax/wechat';
import { useCallback, useRef, useState } from 'react';
import type { Category, Find } from '@/apis/goods';
import { Tabs } from 'anna-remax-ui';
import styles from './index.less';
import './global.less';
import { useEffect } from 'react';
import classnames from 'classnames';
const { TabContent } = Tabs;

interface Props {
  data?: Category[];
  openScroll?: boolean;
  render: (data: Find[]) => React.ReactNode;
}

const Index = ({ data = [], render, openScroll = true }: Props) => {
  const timeout = useRef<any>();
  const viewTop = useRef(0);
  const numberout = useRef(0);
  const [toView, setToView] = useState<string>();
  const [toViewClick, setToViewClick] = useState<string>();
  const mainList = useRef<
    {
      key: string;
      top: string;
      bottom: string;
    }[]
  >([]);

  useEffect(() => {
    // 只在初次滚动的时候计算每个节点的位置
    // if (!isFirstScroll.current) {
    const mainListI: any[] = [];
    data.forEach((item, index) => {
      // 添加节点的布局位置的查询请求。相对于显示区域，以像素为单位。其功能类似于 DOM 的 getBoundingClientRect。返回 NodesRef 对应的 SelectorQuery
      createSelectorQuery()
        .select(`#section-${item.categoryId}-${index}`)
        .boundingClientRect(function (rect) {
          mainListI[index] = {
            key: item.categoryId,
            top: rect.top,
            bottom: rect.bottom,
          };
        })
        .exec();
    });
    // isFirstScroll.current = true; // 确保该方法在下滑的时候触发且只触发一次
    mainList.current = mainListI;
    // }
  }, [data]);

  // const getMainItemHandler = useCallback(, [data]);

  const diffScrollIndex = useCallback(
    (top = viewTop.current) => {
      // 初始化获取每一个indexBar的 top 和 bottom
      // getMainItemHandler();
      // 当前高度为 所滑动top + 距顶部距离
      // if (event)
      if (!mainList.current[0]) return;
      const nowTop = top + mainList.current[0].top;

      mainList.current.forEach((item, index) => {
        let newView = toView;
        // 判断区间List是否完全取出
        if (mainList.current[index + 1]) {
          if (nowTop >= item.top && nowTop < mainList.current[index + 1].top) {
            newView = `section-${data[index].categoryId}-${index}`;
          }
        } else {
          if (nowTop >= item.top) {
            newView = `section-${data[index].categoryId}-${index}`;
          }
        }
        if (toView !== newView) {
          setToView(newView);
        }
      });
    },
    [data, toView]
  );

  const onPageScrollIndex = useCallback(
    (event) => {
      numberout.current++;
      viewTop.current = event.detail.scrollTop;
      if (numberout.current > 5) {
        numberout.current = 0;
        clearTimeout(timeout.current);
        timeout.current = null;
        diffScrollIndex(event.detail.scrollTop);
        return;
      }
      if (timeout.current) return;
      timeout.current = setTimeout(() => {
        diffScrollIndex();
        clearTimeout(timeout.current);
        timeout.current = null;
        numberout.current = 0;
      }, 100);
    },
    [diffScrollIndex]
  );
  return (
    <View className={styles['product-menu']}>
      <View className={classnames(styles.menu, 'product-content')}>
        <ScrollView
          className={styles['scroll-view']}
          scrollY={openScroll}
          enhanced>
          <Tabs
            onTabClick={({ key }) => {
              setToView(key);
              setToViewClick(key);
            }}
            activeKey={toView}
            direction='vertical'>
            {data?.map((tab, i) => (
              <TabContent
                key={`section-${tab.categoryId}-${i}`}
                tab={tab.categoryName}
              />
            ))}
          </Tabs>
          <View className={styles.bottom} />
        </ScrollView>
      </View>
      <View className={styles.content}>
        <ScrollView
          className={styles['scroll-view']}
          scrollY={openScroll}
          onScroll={(e) => {
            onPageScrollIndex(e);
          }}
          enhanced
          scrollIntoView={toViewClick}>
          <View className='contain'>
            {data.map((item, i) => {
              return (
                <View key={i} id={`section-${item.categoryId}-${i}`}>
                  {render(item.goodsListResList)}
                </View>
              );
            })}
          </View>
          <View className={styles.bottom} />
        </ScrollView>
      </View>
    </View>
  );
};
export default Index;
