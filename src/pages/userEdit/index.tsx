import React, { useEffect, useState } from 'react';
import { View, navigateBack, showToast } from 'remax/wechat';
import enums from '@/stores/enums';
import user from '@/stores/userInfo';
import { Cell, Input, Radio } from 'anna-remax-ui';
import BottomButton from '@/components/bottomButton';
import FormItem from '@/components/formItem';
import { updateUserInfo } from '@/apis/user';
import { useRequest } from 'ahooks';
import Form, { useForm, Field } from 'rc-field-form';
import styles from './index.less';
import AvatarUpload from '@/components/avatarUpload';
import LoginLayout from '@/layout/loginLayout';
import Shadow from '@/components/shadow';
import { usePageEvent } from 'remax/macro';
import ModailMultipleSelect from '@/components/modailMultipleSelect';
import storage from '@/utils/storage';

const Index = () => {
  const [form] = useForm();
  const [gender, setGender] = useState<1 | 2>(1);
  const { userInfo, getUserInfo } = user.useContainer();
  const { runAsync, loading } = useRequest(updateUserInfo, {
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
      campusId: userInfo.campusId ? [userInfo.campusId] : undefined,
      province: userInfo.province,
      avatarUrl: userInfo.avatarurl,
      nickname: userInfo.nickname,
    });
    if (userInfo?.gender) {
      setGender(userInfo?.gender);
    }
  }, [form, userInfo]);

  return (
    <LoginLayout>
      <Form component={false} form={form}>
        <View>
          <Field name='province' />
          <Shadow addstyle='padding: 0'>
            <Cell>
              <View className={styles.avatar}>
                <FormItem name='avatarUrl' rules={[{ required: true }]}>
                  <AvatarUpload size='184' />
                </FormItem>
                <View className={styles['avatar-title']}>上传头像</View>
              </View>
            </Cell>
            <Cell label='昵称'>
              <FormItem
                name='nickname'
                trigger='onChange'
                rules={[{ required: true }]}>
                <Input border={false} placeholder='请输入昵称' />
              </FormItem>
            </Cell>
            <Cell label='性别' border={false}>
              <View>
                <Radio.Group
                  style={{ justifyContent: 'flex-end' }}
                  value={gender}
                  onChange={setGender}>
                  <Radio value={1}>男</Radio>
                  <Radio value={2}>女</Radio>
                </Radio.Group>
              </View>
            </Cell>
          </Shadow>
          <Shadow label='区域' contentstyle='width: auto'>
            <FormItem
              name='campusId'
              trigger='onChange'
              rules={[{ required: true }]}>
              <ModailMultipleSelect
                title='请选择区域'
                maxLength={1}
                placeholder='请选择区域'
                options={campus?.data}
              />
            </FormItem>
          </Shadow>
        </View>

        <BottomButton
          loading={loading}
          size='large'
          onTap={() => {
            form.validateFields().then((value) => {
              runAsync({
                campusId: value?.campusId?.[0],
                avatarUrl: value?.avatarUrl,
                nickname: value?.nickname,
                gender,
                province: value?.province,
                userId: userInfo?.id,
              }).then((res) => {
                storage.set('campu', value?.campusId?.[0]);
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
