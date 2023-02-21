import React, { useEffect } from 'react';
import { View, navigateBack, showToast } from 'remax/wechat';
import enums from '@/stores/enums';
import user from '@/stores/userInfo';
import BottomButton from '@/components/bottomButton';
import FormItem from '@/components/formItem';
import MapLocation from '@/components/mapLocation';
import { updateCampus } from '@/apis/user';
import { useRequest } from 'ahooks';
import Form, { useForm, Field } from 'rc-field-form';
import { Cell } from 'anna-remax-ui';
import LoginLayout from '@/layout/loginLayout';
import { usePageEvent } from 'remax/macro';
import ModailMultipleSelect from '@/components/modailMultipleSelect';

const Index = () => {
  const [form] = useForm();
  const { userInfo, getUserInfo } = user.useContainer();
  const { run, loading } = useRequest(updateCampus, {
    manual: true,
    onSuccess: () => {
      showToast({
        title: '修改成功',
        duration: 2000,
        icon: 'success',
        success: () => {
          getUserInfo();
          navigateBack();
        },
      });
    },
  });

  const { getCampusPage, campus } = enums.useContainer();

  usePageEvent('onShow', () => {
    getCampusPage();
  });

  useEffect(() => {
    if (!userInfo) return;
    form.setFieldsValue({
      merAddress: userInfo.province
        ? `${userInfo.province}-${userInfo.city || ''}`
        : undefined,
      campusId: userInfo.campusId ? [userInfo.campusId] : undefined,
      province: userInfo.province,
      city: userInfo.city,
    });
  }, [form, userInfo]);

  return (
    <LoginLayout>
      <Form component={false} form={form}>
        <View>
          <Field name='province' />
          <Field name='city' />

          <Cell label='区域'>
            <FormItem
              name='campusId'
              trigger='onChange'
              rules={[{ required: true }]}>
              <ModailMultipleSelect
                title='请选择校区'
                maxLength={1}
                placeholder='请选择校区'
                options={campus?.data}
              />
            </FormItem>
          </Cell>
          <Cell label='地址'>
            <FormItem
              name='merAddress'
              trigger='onSelect'
              validateTrigger='onSelect'
              normalize={(val) => {
                form.setFieldsValue({
                  province: val.province,
                  city: val.city,
                });
                return `${val.province}-${val.city}`;
              }}
              rules={[{ required: true }]}>
              <MapLocation />
            </FormItem>
          </Cell>
        </View>

        <BottomButton
          loading={loading}
          size='large'
          onTap={() => {
            form.validateFields().then((value) => {
              run({
                campusId: value?.campusId?.[0],
                city: value?.city,
                country: value?.country,
                province: value?.province,
                userId: userInfo?.id,
              });
            });
          }}
          type='primary'
          shape='square'
          block>
          完善个人信息
        </BottomButton>
      </Form>
    </LoginLayout>
  );
};
export default Index;
