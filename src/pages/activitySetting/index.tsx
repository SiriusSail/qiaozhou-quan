import React from 'react';
import { View, showToast, navigateBack, showModal } from 'remax/wechat';
import styles from './index.less';
import Textarea from '@/components/Textarea';
import {
  createActivity,
  getActivityByMerchantId,
  updateActivity,
} from '@/apis/activity';
import BottomButton from '@/components/bottomButton';
import Switch from '@/components/switch';
import Form, { useForm, Field } from 'rc-field-form';
import FormItem from '@/components/formItem';
import { Input, Cell } from 'anna-remax-ui';
import { useRequest } from 'ahooks';
import userInfoStores from '@/stores/userInfo';

const Index = () => {
  const [form] = useForm();
  const { userInfo } = userInfoStores.useContainer();
  const { data } = useRequest(
    () => {
      if (!userInfo?.merchantId) {
        return Promise.resolve(undefined);
      }
      return getActivityByMerchantId(userInfo?.merchantId);
    },
    {
      refreshDeps: [userInfo?.merchantId],
      onSuccess: (e) => {
        if (e) {
          form.setFieldsValue(e);
        }
      },
      onError: (e) => {
        console.log(e);
        showModal({
          title: '提示',
          content: '活动信息获取失败',
          showCancel: false,
        });
      },
    }
  );
  const { run: update, loading: updateLoading } = useRequest(updateActivity, {
    manual: true,
    onSuccess: () => {
      showToast({
        title: '操作成功',
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
        content: e.message || '操作失败',
        showCancel: false,
      });
    },
  });
  const { run: create, loading: createLoading } = useRequest(createActivity, {
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
          <Field name='id' />
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
                  if (
                    value &&
                    minAmount &&
                    parseInt(value) >= parseInt(minAmount)
                  ) {
                    callback();
                  } else {
                    callback('不小低于最低金额');
                  }
                },
              },
            ]}>
            <Input label='最高金额' type='digit' placeholder='请输入最高金额' />
          </FormItem>

          <Cell
            label='开启活动'
            valueStyle={{
              display: 'flex',
              justifyContent: 'flex-end',
            }}>
            <FormItem
              padding={130}
              name='actStatus'
              initialValue={1}
              trigger='onChange'>
              <Switch />
            </FormItem>
          </Cell>
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

        <BottomButton
          size='large'
          loading={createLoading || updateLoading}
          onTap={() => {
            form.validateFields().then(async (value) => {
              if (value.id) {
                return update(value);
              }
              create({
                ...value,
                userId: userInfo?.id,
                merchantId: userInfo?.merchantId,
              });
            });
          }}
          type='primary'
          shape='square'
          block>
          保存活动信息
        </BottomButton>
      </Form>
    </View>
  );
};
export default Index;
