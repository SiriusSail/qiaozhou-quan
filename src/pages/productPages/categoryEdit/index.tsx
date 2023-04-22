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
import { usePageEvent } from 'remax/macro';
import { categoryAdd, categoryUpdate, categoryDelete } from '@/apis/category';

const Index = () => {
  const [form] = useForm();
  const { id, name, remarks } = useQuery();

  usePageEvent('onShow', () => {
    form.setFieldsValue({ id, name, remarks });
  });

  const { run: add } = useRequest(categoryAdd, {
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

  const { run: update } = useRequest(categoryUpdate, {
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

  const { run: del } = useRequest(categoryDelete, {
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

  return (
    <View>
      <Form component={false} form={form}>
        <FormItem
          padding={130}
          name='name'
          trigger='onChange'
          rules={[{ required: true }]}>
          <Input label='分类名称' placeholder='请输入分类名称' />
        </FormItem>
        <FormItem
          padding={130}
          name='remarks'
          trigger='onChange'
          rules={[{ required: true }]}>
          <Input label='分类信息' placeholder='请输入分类信息' />
        </FormItem>
        {id && (
          <Button
            block
            danger
            ghost
            size='large'
            onTap={() => {
              showModal({
                title: '提示',
                content: '请在再次确认是否删除分类',
                cancelText: '取消',
                confirmColor: '#ff4d4f',
                confirmText: '删除',
                success: (e) => {
                  if (e.confirm) {
                    del(id);
                  }
                },
              });
            }}
            shape='square'>
            删除分类
          </Button>
        )}
        <BottomButton
          onTap={() => {
            form.validateFields().then(async (value) => {
              if (id) {
                update(value);
              } else {
                add(value);
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
