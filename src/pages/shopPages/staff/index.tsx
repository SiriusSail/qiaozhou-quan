import React from 'react';
import { View, navigateTo } from 'remax/wechat';
import { Cell } from 'anna-remax-ui';
import styles from './index.less';
import { findSubAccountList } from '@/apis/merchant';
import type { AccontType } from '@/apis/merchant';
import { usePageEvent } from 'remax/macro';
import Block from '@/components/block';
import BottomButton from '@/components/bottomButton';
import { useRequest } from 'ahooks';

const AccountItem: React.FC<AccontType> = (props) => {
  return (
    <Cell
      label={props.nickName}
      arrow
      onTap={() => {
        navigateTo({
          url: `/pages/shopPages/staffEdit/index?id=${props.id}`,
        });
      }}>
      {props.mobile}
    </Cell>
  );
};

const Index = () => {
  const { data, run } = useRequest(findSubAccountList, {
    manual: true,
  });

  usePageEvent('onShow', () => {
    run();
  });
  return (
    <Block title='员工管理'>
      <View className={styles.bag}>
        {data?.map((item, index) => (
          <AccountItem key={index} {...item} />
        ))}
      </View>
      <BottomButton
        size='large'
        onTap={() => {
          navigateTo({
            url: `/pages/shopPages/staffEdit/index`,
          });
        }}
        type='primary'
        shape='square'
        block>
        添加员工
      </BottomButton>
    </Block>
  );
};

export default Index;
