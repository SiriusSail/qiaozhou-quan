import React, { useRef, useEffect } from 'react';
import { View, showToast, navigateBack, showModal } from 'remax/wechat';
import Switch from '@/components/switch';
import Form, { useForm, Field } from 'rc-field-form';
import FormItem from '@/components/formItem';
import BottomButton from '@/components/bottomButton';
import Block from '@/components/block';
import { useQuery } from 'remax';
import { Button, Input, Cell } from 'anna-remax-ui';
import { useRequest } from 'ahooks';
import {
  getSubAccountDetail,
  deleteSubAccount,
  updateSubAccount,
  saveSubAccount,
} from '@/apis/merchant';

const Index = () => {
  const [form] = useForm();
  const { id } = useQuery();

  const { data } = useRequest(() => getSubAccountDetail(id), {
    manual: !id,
  });

  const { run: saveAccount } = useRequest(saveSubAccount, {
    manual: true,
    onSuccess: () => {
      showToast({
        title: '操作成功',
      });
      setTimeout(() => {
        navigateBack();
      }, 2000);
    },
    onError: (e) => {
      showModal({
        title: '提示',
        content: e.message,
        showCancel: false,
      });
    },
  });

  useEffect(() => {
    if (!data) return;
    form.setFieldsValue({
      nickName: data.nickName || data.nickname,
      mobile: data.mobile,
      ...data.menuList.reduce((a, b) => {
        return {
          ...a,
          [b.id]: 1,
        };
      }, {}),
    });
  }, [data, form]);

  const { run: updateAccount } = useRequest(updateSubAccount, {
    manual: true,
    onSuccess: () => {
      showToast({
        title: '操作成功',
      });
      setTimeout(() => {
        navigateBack();
      }, 2000);
    },
    onError: (e) => {
      showModal({
        title: '提示',
        content: e.message,
        showCancel: false,
      });
    },
  });

  const { run: deleteAccount } = useRequest(deleteSubAccount, {
    manual: true,
    onSuccess: () => {
      showToast({
        title: '删除成功',
      });
      setTimeout(() => {
        navigateBack();
      }, 2000);
    },
  });

  const menuList = useRef([
    {
      code: '3000',
      name: '核销优惠券',
    },
    {
      code: '2000',
      name: '活动修改',
    },
    {
      code: '4000',
      name: '员工管理',
    },
    {
      code: '5000',
      name: '店铺修改',
    },
  ]);

  return (
    <View>
      <Form component={false} form={form}>
        <FormItem
          padding={130}
          name='nickName'
          trigger='onChange'
          rules={[{ required: true }]}>
          <Input label='昵称' placeholder='请输入员工昵称' />
        </FormItem>
        <FormItem
          padding={130}
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
          <Input label='手机号' placeholder='请输入员工手机号' />
        </FormItem>
        <Block title='权限'>
          {menuList.current.map((item) => {
            return (
              <Cell
                key={item.code}
                label={item.name}
                valueStyle={{
                  display: 'flex',
                  justifyContent: 'flex-end',
                }}>
                <FormItem
                  trigger='onChange'
                  padding={130}
                  name={item.code}
                  initialValue={0}>
                  <Switch />
                </FormItem>
              </Cell>
            );
          })}
        </Block>
        {id && (
          <Button
            block
            danger
            ghost
            size='large'
            onTap={() => {
              showModal({
                title: '提示',
                content: '请在再次确认是否删除员工',
                cancelText: '取消',
                confirmColor: '#ff4d4f',
                confirmText: '删除',
                success: (e) => {
                  if (e.confirm) {
                    deleteAccount(id);
                  }
                },
              });
            }}
            shape='square'>
            删除员工
          </Button>
        )}
        <BottomButton
          onTap={() => {
            form.validateFields().then(async (value) => {
              const { nickName, mobile, ...menu } = value;
              const menuIds = Object.entries(menu)
                .filter(([, item]) => {
                  return item === 1;
                })
                .map(([key]) => key);
              console.log(id);
              if (id) {
                updateAccount({
                  userId: id,
                  nickName,
                  mobile,
                  menuIds,
                });
              } else {
                saveAccount({
                  nickName,
                  mobile,
                  menuIds,
                });
              }
            });
          }}
          size='large'
          type='primary'
          shape='square'
          block>
          保存
        </BottomButton>
      </Form>
    </View>
  );
};
export default Index;
