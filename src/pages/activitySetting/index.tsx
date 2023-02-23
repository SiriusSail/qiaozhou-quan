import React from 'react';
import { View, showToast, navigateBack, showModal } from 'remax/wechat';
import styles from './index.less';
import Textarea from '@/components/Textarea';
import { createActivity } from '@/apis/activity';
import BottomButton from '@/components/bottomButton';
import Form, { useForm } from 'rc-field-form';
import FormItem from '@/components/formItem';
import { Input } from 'anna-remax-ui';
import { useRequest } from 'ahooks';
import userInfoStores from '@/stores/userInfo';

const Index = () => {
  const [form] = useForm();
  const { userInfo } = userInfoStores.useContainer();
  const { run, loading } = useRequest(createActivity, {
    manual: true,
    onSuccess: () => {
      showToast({
        title: '活动创建成功',
        duration: 2000,
        icon: 'success',
      });
      setTimeout(() => {
        navigateBack();
      }, 2000);
    },
    onError: (e) => {
      console.log(e);
      showModal({
        title: '提示',
        content: e.message || '活动创建失败',
        showCancel: false,
      });
    },
  });
  return (
    <View className={styles.setting}>
      <Form component={false} form={form}>
        <View>
          {/* <FormItem padding={130} name='a' trigger='onChange' rules={[{ required: true }]}>
            <Picker
              label='活动类型'
              options={options}
              border
              placeholder='请输入活动类型'
            />
          </FormItem> */}
          {/* <FormItem
            padding={130}
            name='actName'
            trigger='onChange'
            rules={[{ required: true }]}>
            <Input label='活动名称' placeholder='请输入活动名称' />
          </FormItem> */}
          <FormItem
            padding={130}
            name='minAmount'
            type='digit'
            trigger='onChange'
            rules={[
              { required: true },
              {
                required: true,
                message: '最低金额不得少于1元',
                validator: (rule, value, callback) => {
                  if (value >= 1) {
                    callback();
                  } else {
                    callback('最低金额不得少于1元');
                  }
                },
              },
            ]}>
            <Input
              label='最低金额'
              type='digit'
              placeholder='请输入最低金额 最低1元'
            />
          </FormItem>

          <FormItem
            padding={130}
            name='maxAmount'
            trigger='onChange'
            rules={[
              { required: true },
              {
                required: true,
                message: '不小低于最低金额',
                validator: (rule, value, callback) => {
                  const minAmount = form.getFieldValue('minAmount');
                  if (value >= minAmount) {
                    callback();
                  } else {
                    callback('不小低于最低金额');
                  }
                },
              },
            ]}>
            <Input label='最高金额' type='digit' placeholder='请输入最高金额' />
          </FormItem>
          {/* <FormItem
            padding={130}
            name='total'
            trigger='onChange'
            rules={[{ required: true }]}>
            <Input label='红包个数' placeholder='请输入红包个数' />
          </FormItem> */}
          {/* <FormItem
            padding={130}
            name='actContent'
            trigger='onChange'
            rules={[{ required: true }]}>
            <Textarea
              style={{ padding: '20rpx' }}
              label='优惠券使用规则'
              placeholder='请输入优惠券使用规则'
            />
          </FormItem> */}
          <FormItem
            padding={130}
            name='actDescribe'
            trigger='onChange'
            rules={[{ required: true }]}>
            <Textarea
              style={{ padding: '10rpx' }}
              label='活动文案阐述'
              placeholder='请输入活动文案阐述'
            />
          </FormItem>
        </View>
        <View className={styles.text}>
          注：
          {/* 商家活动设置时间为每天00：00-09：30, 过期当日不能设置活动, */}
          活动有效至当晚24：00 自动失效
        </View>

        <BottomButton
          size='large'
          loading={loading}
          onTap={() => {
            form.validateFields().then(async (value) => {
              run({
                ...value,
                userId: userInfo?.id,
                merchantId: userInfo?.merchantId,
              });
            });
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
