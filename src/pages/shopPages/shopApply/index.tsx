import React, { useEffect } from 'react';
import { navigateBack, showToast, showModal } from 'remax/wechat';
import enums from '@/stores/enums';
import user from '@/stores/userInfo';
import Switch from '@/components/switch';
import BottomButton from '@/components/bottomButton';
import FormItem from '@/components/formItem';
import ImageUpload from '@/components/imageUpload';
import AvatarUpload from '@/components/avatarUpload';
import ModailMultipleSelect from '@/components/modailMultipleSelect';
import MapLocation from '@/components/mapLocation';
import { merchantApply, reApplyMerchant } from '@/apis/merchant';
import type { MerchantApplyParams } from '@/apis/merchant';
import { useRequest } from 'ahooks';
import Picker from '@/components/picker';
import WechatPicker from '@/components/wechatPicker';
import Form, { useForm } from 'rc-field-form';
import { Input, Cell } from 'anna-remax-ui';
import LoginLayout from '@/layout/loginLayout';
import { usePageEvent } from 'remax/macro';
import { Field } from 'rc-field-form';
import { useQuery } from 'remax';
import Shadow from '@/components/shadow';

const Index = () => {
  const { isReApply } = useQuery<{ isReApply: string }>();
  const [form] = useForm();
  const { getCampusPage, getMerchantType, merchantType, campus } =
    enums.useContainer();
  const { userInfo, merchant, getUserInfo } = user.useContainer();
  const { run, loading } = useRequest(
    (params: MerchantApplyParams) => {
      if (isReApply) {
        params.merchantId = userInfo?.merchantId || merchant?.merchantId;
        return reApplyMerchant(params);
      }
      return merchantApply(params);
    },
    {
      manual: true,
      onSuccess: () => {
        showToast({
          title: '商加申请成功',
          duration: 2000,
          icon: 'success',
        });
        getUserInfo();
        setTimeout(() => {
          navigateBack();
        }, 2000);
      },
      onError: (e) => {
        showModal({
          title: '提示',
          content: e.message || '商家申请失败，请联系客服 18883350586',
          showCancel: false,
        });
      },
    }
  );

  useEffect(() => {
    if (isReApply) {
      form.setFieldsValue({
        ...merchant,
        merAvatarurl: undefined,
        file: undefined,
        doorPhoto: undefined,
        aptitude: undefined,
        campusId: undefined,
      });
    }
  }, [merchant, form, isReApply]);

  usePageEvent('onShow', () => {
    getCampusPage();
    getMerchantType();
  });

  return (
    <LoginLayout>
      <Form component={false} form={form}>
        <Shadow addstyle='padding:0'>
          <Field name='merLat' />
          <Field name='merLng' />
          <Cell label='店铺名称'>
            <FormItem
              name='merName'
              trigger='onChange'
              rules={[{ required: true }]}>
              <Input border={false} placeholder='请输入店铺名称' />
            </FormItem>
          </Cell>
          <Cell label='头像'>
            <FormItem
              name='merAvatarurl'
              trigger='onChange'
              rules={[{ required: true }]}>
              <AvatarUpload size={100} />
            </FormItem>
          </Cell>
          <Cell label='店铺门牌照'>
            <FormItem
              padding={20}
              name='doorPhoto'
              trigger='onChange'
              rules={[{ required: true, message: '请选择店铺门牌照' }]}>
              <AvatarUpload
                size={100}
                style={{ borderRadius: '10rpx', border: 'none' }}
                icon=''
              />
            </FormItem>
          </Cell>
          <Cell label='经营类目'>
            <FormItem
              name='merType'
              trigger='onChange'
              rules={[{ required: true }]}>
              <Picker
                border={false}
                options={merchantType?.data}
                placeholder='请输入经营类别'
              />
            </FormItem>
          </Cell>
          <Cell label='区域选择'>
            <FormItem
              name='campusIds'
              trigger='onChange'
              rules={[{ required: true }]}>
              <ModailMultipleSelect
                title='请选择校区'
                placeholder='请选择校区'
                options={campus?.data}
              />
            </FormItem>
          </Cell>
          <Cell label='联系人'>
            <FormItem
              name='merPerson'
              trigger='onChange'
              rules={[{ required: true }]}>
              <Input border={false} placeholder='请输入联系人' />
            </FormItem>
          </Cell>
          <Cell label='联系电话'>
            <FormItem
              name='merPersonTel'
              trigger='onChange'
              rules={[
                { required: true },
                {
                  max: 11,
                  pattern: /^1[3456789]\d{9}$/,
                  message: '手机号格式错误',
                  // validator: this.checkValue
                },
              ]}>
              <Input
                border={false}
                type='number'
                placeholder='请输入联系电话'
              />
            </FormItem>
          </Cell>
          <Cell label='店铺地址'>
            <FormItem
              name='merAddress'
              trigger='onChange'
              rules={[{ required: true }]}>
              <MapLocation
                onSelect={(e) => {
                  form.setFieldsValue({
                    merLat: e.latitude,
                    merLng: e.longitude,
                  });
                  console.log(e);
                }}
              />
            </FormItem>
          </Cell>
          <Cell label='营业开始时间'>
            <FormItem
              name='businessEndTime'
              initialValue='07:00'
              rules={[{ required: true }]}>
              <WechatPicker mode='time' placeholder='请输入营业时间'>
                时间
              </WechatPicker>
            </FormItem>
          </Cell>
          <Cell label='营业结束时间'>
            <FormItem
              name='businessStartTime'
              initialValue='22:00'
              rules={[{ required: true }]}>
              <WechatPicker mode='time' placeholder='请输入结束时间'>
                时间
              </WechatPicker>
            </FormItem>
          </Cell>
          <Cell label='最低订单价'>
            <FormItem
              name='minOrderAmount'
              trigger='onChange'
              rules={[{ required: true }]}>
              <Input border={false} placeholder='请输入最低订单价' />
            </FormItem>
          </Cell>
          <Cell label='店铺简介'>
            <FormItem
              padding={130}
              name='merDescribe'
              trigger='onChange'
              rules={[{ required: true }]}>
              <Input border={false} placeholder='请输入店铺简介' />
            </FormItem>
          </Cell>
          <Cell label='支付方式'>
            <FormItem padding={130} name='payType' trigger='onChange'>
              <Picker
                border={false}
                options={[
                  {
                    key: 1,
                    value: '线上',
                  },
                  {
                    key: 2,
                    value: '线下',
                  },
                ]}
                placeholder='请选择用户支付方式'
              />
            </FormItem>
          </Cell>
          <Cell label='邀请码'>
            <FormItem name='inviteCode' trigger='onChange'>
              <Input border={false} placeholder='请输入业务员邀请码' />
            </FormItem>
          </Cell>

          <Cell border={false} label='店铺状态'>
            <FormItem name='status' initialValue={1} trigger='onChange'>
              <Switch
                onChange={(e) => {
                  console.log(e);
                }}
              />
            </FormItem>
          </Cell>
        </Shadow>
        <Shadow addstyle='padding:0'>
          <FormItem
            padding={20}
            name='aptitude'
            trigger='onChange'
            rules={[{ required: true, message: '营业资质上传' }]}>
            <ImageUpload maxCount={2} label='店铺资质上传(最多两张)' />
          </FormItem>
        </Shadow>
      </Form>

      <BottomButton
        loading={loading}
        size='large'
        onTap={() => {
          form.validateFields().then(async (value) => {
            const { doorPhoto, ...params } = value;
            run({
              ...params,
              userId: userInfo?.id,
              doorPhoto: doorPhoto?.[0],
            });
          });
        }}
        type='primary'
        shape='square'
        block>
        提交申请
      </BottomButton>
    </LoginLayout>
  );
};
export default Index;
