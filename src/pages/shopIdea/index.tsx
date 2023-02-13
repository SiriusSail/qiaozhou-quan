import React, { useEffect } from 'react';
import { navigateBack, showToast } from 'remax/wechat';
import enums from '@/stores/enums';
import user from '@/stores/userInfo';
import BottomButton from '@/components/bottomButton';
import FormItem from '@/components/formItem';
import ModailMultipleSelect from '@/components/modailMultipleSelect';
import { updateMerchantCampus, getMerchantByUserId } from '@/apis/merchant';
import { useRequest } from 'ahooks';
import Form, { useForm } from 'rc-field-form';
import { Cell } from 'anna-remax-ui';
import LoginLayout from '@/layout/loginLayout';
import { usePageEvent } from 'remax/macro';

const Index = () => {
  const [form] = useForm();
  const { run, loading } = useRequest(updateMerchantCampus, {
    manual: true,
    onSuccess: () => {
      showToast({
        title: '修改成功',
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
  const { data } = useRequest(() => getMerchantByUserId(userInfo!.id), {
    manual: !userInfo?.id,
  });

  useEffect(() => {
    form.setFieldsValue({
      campusId: data?.list?.map((item) => item.id!),
    });
  }, [data, form]);

  usePageEvent('onShow', () => {
    getCampusPage();
    getMerchant();
  });

  return (
    <LoginLayout>
      <Form component={false} form={form}>
        <Cell label='区域'>
          <FormItem
            name='campusId'
            trigger='onChange'
            rules={[{ required: true }]}>
            <ModailMultipleSelect
              title='请选择校区'
              placeholder='请选择校区'
              options={campus?.data}
            />
          </FormItem>
        </Cell>

        <BottomButton
          loading={loading}
          size='large'
          onTap={() => {
            form.validateFields().then((value) => {
              console.log(value);
              run({ userId: userInfo?.id, ...value });
            });
          }}
          type='primary'
          shape='square'
          block>
          修改信息
        </BottomButton>
      </Form>
    </LoginLayout>
  );
};
export default Index;
