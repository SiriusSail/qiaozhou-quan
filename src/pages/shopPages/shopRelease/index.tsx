import React, { useState } from 'react';
import { navigateBack, showToast, showModal, View } from 'remax/wechat';
import BottomButton from '@/components/bottomButton';
import Textarea from '@/components/textarea';
import FormItem from '@/components/formItem';
import type { PublishInfo } from '@/apis/infoPublish';
import {
  addPublishInfo,
  updatePublishInfo,
  getPublishInfo,
} from '@/apis/infoPublish';
import { useRequest } from 'ahooks';
import Form, { useForm, Field } from 'rc-field-form';
import { Input, Cell, Radio } from 'anna-remax-ui';
import MapLocation from '@/components/mapLocation';
import LoginLayout from '@/layout/loginLayout';
import { usePageEvent } from 'remax/macro';
import { useQuery } from 'remax';
import Picker from '@/components/picker';
import Shadow from '@/components/shadow';
import ImageUpload from '@/components/imageUpload';
import user from '@/stores/userInfo';

const Index = () => {
  const { id } = useQuery<{ id: string }>();
  const [form] = useForm();
  const { userInfo } = user.useContainer();
  const [tradeType, setTradeType] = useState<1 | 2 | undefined>(1);
  const { run, loading } = useRequest(
    (params: PublishInfo) => {
      if (id) {
        return updatePublishInfo({
          id,
          tradeType,
          ...params,
        });
      }
      return addPublishInfo({ tradeType, ...params });
    },
    {
      manual: true,
      onSuccess: () => {
        showToast({
          title: '发布成功',
          duration: 2000,
          icon: 'success',
        });
        setTimeout(() => {
          navigateBack();
        }, 2000);
      },
      onError: (e) => {
        showModal({
          title: '提示',
          content: e.message || '发布失败',
          showCancel: false,
        });
      },
    }
  );

  usePageEvent('onLoad', () => {
    if (!id) return;
    getPublishInfo(id).then((res) => {
      form.setFieldsValue(res);
      setTradeType(res.tradeType);
    });
  });

  return (
    <LoginLayout>
      <Form component={false} form={form}>
        {/* <Field name='merLat' />
        <Field name='merLng' /> */}
        <Shadow addstyle='padding:0'>
          <Cell label='类别'>
            <FormItem padding={130} name='type' trigger='onChange'>
              <Picker
                border={false}
                options={[
                  {
                    key: 1,
                    value: '店铺转让',
                  },
                  {
                    key: 2,
                    value: '二手设备',
                  },
                  {
                    key: 3,
                    value: '供应采购',
                  },
                  {
                    key: 4,
                    value: '招商加盟',
                  },
                ]}
                placeholder='请选择发布类别'
              />
            </FormItem>
          </Cell>
          <Cell label='类型'>
            <Radio.Group
              style={{ justifyContent: 'flex-end' }}
              value={tradeType}
              onChange={setTradeType}>
              <Radio value={1}>我要买</Radio>
              <Radio value={2}>我要卖</Radio>
            </Radio.Group>
          </Cell>
          <Cell label='联系人'>
            <FormItem
              name='contact'
              initialValue={userInfo?.nickname}
              trigger='onChange'
              rules={[{ required: true }]}>
              <Input border={false} type='number' placeholder='请输入联系人' />
            </FormItem>
          </Cell>
          <Cell label='联系电话'>
            <FormItem
              name='phone'
              initialValue={userInfo?.mobile}
              trigger='onChange'
              rules={[{ required: true }]}>
              <Input
                border={false}
                type='number'
                placeholder='请输入联系电话'
              />
            </FormItem>
          </Cell>
          <Cell label='地址' border={false}>
            <FormItem
              name='address'
              trigger='onChange'
              rules={[{ required: true }]}>
              <MapLocation
              // onSelect={(e) => {
              //   form.setFieldsValue({
              //     merLat: e.latitude,
              //     merLng: e.longitude,
              //   });
              // }}
              />
            </FormItem>
          </Cell>
        </Shadow>
        <Shadow addstyle='padding:0'>
          <View>
            <FormItem
              padding={20}
              name='content'
              trigger='onChange'
              rules={[{ required: true, message: '请输入需要发布的信息内容' }]}>
              <Textarea
                border={false}
                label='发布内容'
                placeholder='请输入需要发布的信息内容'
              />
            </FormItem>
          </View>
        </Shadow>
        <Shadow addstyle='padding:0'>
          <FormItem padding={20} name='file' trigger='onChange'>
            <ImageUpload maxCount={6} columns={4} label='上传图片' />
          </FormItem>
        </Shadow>
      </Form>

      <BottomButton
        loading={loading}
        size='large'
        onTap={() => {
          form.validateFields().then(async (value) => {
            run(value);
          });
        }}
        type='primary'
        shape='square'
        block>
        发布信息
      </BottomButton>
    </LoginLayout>
  );
};
export default Index;
