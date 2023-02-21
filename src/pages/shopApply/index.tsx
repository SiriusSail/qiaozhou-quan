import React from 'react';
import { navigateBack, showToast } from 'remax/wechat';
import enums from '@/stores/enums';
import user from '@/stores/userInfo';
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
import Form, { useForm } from 'rc-field-form';
import { Input, Cell } from 'anna-remax-ui';
import LoginLayout from '@/layout/loginLayout';
import { usePageEvent } from 'remax/macro';
import { useQuery } from 'remax';

const Index = () => {
  const { isReApply } = useQuery<{ isReApply: string }>();
  const [form] = useForm();
  const { getCampusPage, getMerchantType, merchantType, campus } =
    enums.useContainer();
  const { userInfo, merchant } = user.useContainer();
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

        setTimeout(() => {
          navigateBack();
        }, 2000);
      },
    }
  );

  usePageEvent('onShow', () => {
    getCampusPage();
    getMerchantType();
  });

  return (
    <LoginLayout>
      <Form component={false} form={form}>
        {/* <Field name='userId' /> */}
        <Cell label='头像'>
          <FormItem
            name='merAvatarurl'
            trigger='onChange'
            rules={[{ required: true }]}>
            <AvatarUpload />
          </FormItem>
        </Cell>
        <FormItem
          name='merName'
          trigger='onChange'
          rules={[{ required: true }]}>
          <Input label='店铺名称' placeholder='请输入店铺名称' />
        </FormItem>
        <FormItem
          name='merType'
          trigger='onChange'
          rules={[{ required: true }]}>
          <Picker
            label='经营类别'
            options={merchantType?.data}
            border
            placeholder='请输入经营类别'
          />
        </FormItem>
        <Cell label='区域'>
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
        <FormItem
          name='merPerson'
          trigger='onChange'
          rules={[{ required: true }]}>
          <Input label='联系人' placeholder='请输入联系人' />
        </FormItem>
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
          <Input label='联系电话' placeholder='请输入联系电话' />
        </FormItem>
        <Cell label='店铺地址'>
          <FormItem
            name='merAddress'
            trigger='onChange'
            rules={[{ required: true }]}>
            <MapLocation />
          </FormItem>
        </Cell>
        <FormItem
          padding={20}
          name='doorPhoto'
          trigger='onChange'
          rules={[{ required: true, message: '请选择店铺门牌照' }]}>
          <ImageUpload maxCount={1} label='店铺门牌照' />
        </FormItem>
        <FormItem
          padding={20}
          name='file'
          trigger='onChange'
          rules={[{ required: true, message: '请选择店铺相关照片上传' }]}>
          <ImageUpload maxCount={3} label='店铺相关照片上传(最多三张)' />
        </FormItem>
        <FormItem
          padding={20}
          name='aptitude'
          trigger='onChange'
          rules={[{ required: true, message: '请选择店铺资质上传' }]}>
          <ImageUpload maxCount={2} label='店铺资质上传(最多两张)' />
        </FormItem>

        <BottomButton
          loading={loading}
          size='large'
          onTap={() => {
            form.validateFields().then(async (value) => {
              console.log(value);
              const { file, merAvatarurl, doorPhoto, aptitude, ...params } =
                value;
              run({
                ...params,
                userId: userInfo?.id,
                file: file.map((item: any) => item.url),
                aptitude: aptitude.map((item: any) => item.url),
                merAvatarurl: merAvatarurl.url,
                doorPhoto: doorPhoto?.[0]?.url,
              });
            });
          }}
          type='primary'
          shape='square'
          block>
          提交申请
        </BottomButton>
      </Form>
    </LoginLayout>
  );
};
export default Index;
