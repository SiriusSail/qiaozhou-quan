import React from 'react';
import { View, navigateTo } from 'remax/wechat';
import styles from './index.less';
import Textarea from '@/components/Textarea';
import BottomButton from '@/components/bottomButton';
import Block from '@/components/block';
import Form, { Field, useForm } from 'rc-field-form';
import { Tabs, Picker, Input, Button } from 'anna-remax-ui';

const tabs = [
  {
    key: '0',
    title: '进行中',
  },
  {
    key: '1',
    title: '已过期',
  },
];

const { TabContent } = Tabs;

const options = [
  { key: '1', value: '现金红包' },
  { key: '2', value: '折扣券' },
  { key: '3', value: '代金券' },
];

const Index = () => {
  const [form] = useForm();
  const [stateKey, setStateKey] = React.useState('0');
  return (
    <View className={styles.setting}>
      <Form component={false} form={form}>
        <View>
          <Field name='a' trigger='onChange'>
            <Picker
              label='活动类型'
              options={options}
              border
              placeholder='请输入活动类型'
            />
          </Field>
          <Field name='b' trigger='onChange'>
            <Input label='金额' placeholder='请输入金额' />
          </Field>
          <Field name='c' trigger='onChange'>
            <Input label='红包个数' placeholder='请输入红包个数' />
          </Field>
          <Field name='f' trigger='onChange'>
            <Input
              label='同时拥有个数'
              placeholder='请输入单个用户同时拥有红包个数'
            />
          </Field>
          <Field name='d' trigger='onChange'>
            <Textarea
              label='优惠券使用规则'
              placeholder='请输入优惠券使用规则'
            />
          </Field>
          <Field name='e' trigger='onChange'>
            <Textarea label='活动文案阐述' placeholder='请输入活动文案阐述' />
          </Field>
        </View>
        <View className={styles.text}>
          注：商家活动设置时间为每天00：00-09：30, 过期当日不能设置活动,
          活动有效至当晚24：00 自动失效
        </View>

        <BottomButton
          size='large'
          onTap={() => {
            console.log(form.getFieldsValue());
          }}
          type='primary'
          shape='square'
          block>
          确认创建
        </BottomButton>
      </Form>
    </View>
  );
};
export default Index;
