import React, { useCallback } from 'react';
import { View, showToast, navigateBack, showModal } from 'remax/wechat';
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
import TabsSelect, { TabContent } from '@/components/tabsSelect';
import ImageUpload from '@/components/imageUpload';
import VisibleFormItem from '@/components/visibleFormItem';
import { Input, Cell } from 'anna-remax-ui';
import { useRequest } from 'ahooks';
import userInfoStores from '@/stores/userInfo';

const Index = () => {
  const [form] = useForm();
  const { userInfo } = userInfoStores.useContainer();
  useRequest(
    () => {
      if (!userInfo?.merchantId) return Promise.resolve(undefined);
      return getActivityByMerchantId(userInfo?.merchantId);
    },
    {
      refreshDeps: [userInfo?.merchantId],
      onSuccess: (e) => {
        if (!e) return;
        const newData = Object.entries(e)
          .filter(([, val]) => !!val || val === 0)
          .reduce(
            (previousValue, currentValue) => ({
              ...previousValue,
              [currentValue[0]]: currentValue[1],
            }),
            {}
          );
        form.setFieldsValue(newData);
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

  const submit = useCallback(() => {
    const value = form.getFieldsValue();
    const { id, pics, type } = value;
    const params = {
      ...value,
      type: parseInt(type),
      pics: pics,
      merchantId: userInfo?.merchantId,
    };
    if (id) {
      return update(params);
    }
    params.userId = userInfo?.id;
    create(params);
  }, [create, form, update, userInfo?.id, userInfo?.merchantId]);
  return (
    <View>
      <Form component={false} form={form}>
        <Field name='id' />
        <FormItem
          padding={130}
          name='actDescribe'
          trigger='onChange'
          rules={[{ required: true }]}>
          <Textarea
            style={{ padding: '10rpx' }}
            label='活动文案'
            placeholder='请输入活动文案'
          />
        </FormItem>
        <FormItem padding={20} name='pics' trigger='onChange'>
          <ImageUpload maxCount={9} label='活动图片' />
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
        <Cell
          label='发放红包'
          valueStyle={{
            display: 'flex',
            justifyContent: 'flex-end',
          }}>
          <FormItem
            padding={130}
            name='couponStatus'
            initialValue={1}
            trigger='onChange'>
            <Switch />
          </FormItem>
        </Cell>
        <VisibleFormItem name='couponStatus'>
          <FormItem
            padding={130}
            name='minAmount'
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
        </VisibleFormItem>

        <BottomButton
          size='large'
          loading={createLoading || updateLoading}
          onTap={() => {
            const value = form.getFieldsValue();
            const { type } = value;
            form
              .validateFields()
              .then(() => {
                submit();
              })
              .catch(({ errorFields }) => {
                const noreName: string[] = [];
                if (parseInt(type) === 2) {
                  noreName.push('maxAmount', 'minAmount');
                }
                if (parseInt(type) === 1) {
                  noreName.push('pics');
                }
                const newFields = errorFields.filter(
                  (item: any) => !noreName.includes(item?.name?.[0])
                );
                if (newFields.length > 0) return;
                submit();
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
