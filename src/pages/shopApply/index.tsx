import React from 'react';
import { View, navigateTo, navigateBack, showToast } from 'remax/wechat';
import styles from './index.less';
import Textarea from '@/components/Textarea';
import enums from '@/stores/enums';
import user from '@/stores/userInfo';
import BottomButton from '@/components/bottomButton';
import FormItem from '@/components/formItem';
import ImageUpload from '@/components/imageUpload';
import AvatarUpload from '@/components/avatarUpload';
import ModailMultipleSelect from '@/components/modailMultipleSelect';
import MapLocation from '@/components/mapLocation';
import { merchantApply } from '@/apis/merchant';
import { useRequest } from 'ahooks';
import Picker from '@/components/picker';
import Form, { useForm, Field } from 'rc-field-form';
import { Tabs, Input, Cell } from 'anna-remax-ui';
import LoginPlugin from '@/plugins/loginPlugin';
import { usePageEvent } from 'remax/macro';

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
  const { run, loading } = useRequest(merchantApply, {
    manual: true,
    onSuccess: () => {
      showToast({
        title: '商加申请成功',
        duration: 2000,
        icon: 'success',
        success: () => {
          navigateBack();
        },
      });
    },
  });

  const { getCampusPage, getMerchant, merchant, campus } = enums.useContainer();
  const { userInfo } = user.useContainer();

  usePageEvent('onShow', () => {
    getCampusPage();
    getMerchant();
  });

  return (
    <LoginPlugin>
      <Form component={false} form={form}>
        <Field name='userId' initialValue={userInfo?.id} />
        <Cell label='头像'>
          <FormItem
            name='avatarurl'
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
            options={merchant?.data}
            border
            placeholder='请输入活动类型'
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
          <FormItem name='file' trigger='onChange' rules={[{ required: true }]}>
            <MapLocation />
          </FormItem>
        </Cell>
        <FormItem
          name='merAddress'
          trigger='onChange'
          rules={[{ required: true }]}>
          <ImageUpload label='店铺照片上传(至少三张)' />
        </FormItem>
        <FormItem
          name='aptitude'
          trigger='onChange'
          rules={[{ required: true }]}>
          <ImageUpload label='店铺资质上传' />
        </FormItem>

        <BottomButton
          loading={loading}
          size='large'
          onTap={() => {
            form.validateFields().then((value) => {
              console.log(value);
              run(value);
            });
          }}
          type='primary'
          shape='square'
          block>
          确认修改
        </BottomButton>
      </Form>
    </LoginPlugin>
  );
};
export default Index;
