import React from 'react';
import { View, navigateTo, navigateBack, showToast } from 'remax/wechat';
import enums from '@/stores/enums';
import user from '@/stores/userInfo';
import BottomButton from '@/components/bottomButton';
import FormItem from '@/components/formItem';
import AvatarUpload from '@/components/avatarUpload';
import MapLocation from '@/components/mapLocation';
import { merchantApply } from '@/apis/merchant';
import { useRequest } from 'ahooks';
import Form, { useForm, Field } from 'rc-field-form';
import { Input, Cell } from 'anna-remax-ui';
import LoginPlugin from '@/plugins/loginPlugin';
import { usePageEvent } from 'remax/macro';

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

  console.log(1123123);
  return (
    <LoginPlugin>
      <Form component={false} form={form}>
        <View>
          <Field name='userId' initialValue={userInfo?.id} />
          {/* <Cell label='头像'>
            <FormItem
              name='avatarurl'
              trigger='onChange'
              rules={[{ required: true }]}>
              <AvatarUpload />
            </FormItem>
          </Cell> */}

          <FormItem
            name='nickname'
            trigger='onChange'
            rules={[{ required: true }]}>
            <Input label='昵称' placeholder='请输入联系人' />
          </FormItem>
          <FormItem
            name='mobile'
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
            <Input label='手机号' placeholder='请输入联系电话' />
          </FormItem>
          <FormItem name='file' trigger='onChange' rules={[{ required: true }]}>
            <MapLocation />
          </FormItem>
        </View>

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
          修改信息
        </BottomButton>
      </Form>
    </LoginPlugin>
  );
};
export default Index;
