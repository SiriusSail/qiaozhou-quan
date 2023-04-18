import React, { useCallback } from 'react';
import { View, showToast, navigateBack, showModal } from 'remax/wechat';
import Textarea from '@/components/Textarea';
import {
  findGoodsByGoodsId,
  goodsAdd,
  goodsDelete,
  goodsUpdate,
  goodsDisable,
  goodsEnable,
} from '@/apis/goods';
import BottomButton from '@/components/bottomButton';
import Switch from '@/components/switch';
import Form, { useForm, Field } from 'rc-field-form';
import FormItem from '@/components/formItem';
import ImageUpload from '@/components/imageUpload';
import { Input, Cell, Picker } from 'anna-remax-ui';
import { useRequest } from 'ahooks';
import { useQuery } from 'remax';
import userInfoStores from '@/stores/userInfo';

const Index = () => {
  const { id } = useQuery<{ id: string }>();
  const [form] = useForm();
  const { userInfo } = userInfoStores.useContainer();
  useRequest(
    () => {
      if (!id) return Promise.resolve(undefined);
      return findGoodsByGoodsId(id);
    },
    {
      onError: (e) => {
        console.log(e);
        showModal({
          title: '提示',
          content: '活动信息获取失败',
          showCancel: false,
        });
      },
    }
  );
  const { run: update, loading: updateLoading } = useRequest(goodsUpdate, {
    manual: true,
    onSuccess: () => {
      showToast({
        title: '操作成功',
        duration: 2000,
        icon: 'success',
      });
      setTimeout(() => {
        navigateBack();
      }, 2000);
    },
    onError: (e) => {
      console.log(e);
      showModal({
        title: '提示',
        content: e.message || '操作失败',
        showCancel: false,
      });
    },
  });
  const { run: create, loading: createLoading } = useRequest(goodsAdd, {
    manual: true,
    onSuccess: () => {
      showToast({
        title: '活动创建成功',
        duration: 2000,
        icon: 'success',
      });
      setTimeout(() => {
        navigateBack();
      }, 2000);
    },
    onError: (e) => {
      console.log(e);
      showModal({
        title: '提示',
        content: e.message || '活动创建失败',
        showCancel: false,
      });
    },
  });

  const submit = useCallback(() => {
    const value = form.getFieldsValue();
    const { id, pics, type } = value;
    const params = {
      ...value,
    };
    if (id) {
      return update(params);
    }
    create(params);
  }, [create, form, update]);
  return (
    <View>
      <Form component={false} form={form}>
        <Field name='id' />
        <FormItem
          padding={20}
          name='cover'
          trigger='onChange'
          rules={[{ required: true, message: '请选择商品图' }]}>
          <ImageUpload maxCount={1} label='商品图' />
        </FormItem>
        <FormItem
          padding={130}
          name='goodsName'
          trigger='onChange'
          rules={[{ required: true }]}>
          <Input label='	商品名称' placeholder='请输入商品名称' />
        </FormItem>
        <FormItem
          padding={130}
          name='overNum'
          trigger='onChange'
          rules={[{ required: true }]}>
          <Input label='数量' type='digit' placeholder='请输入商品数量' />
        </FormItem>
        <FormItem
          padding={130}
          name='price'
          trigger='onChange'
          rules={[{ required: true }]}>
          <Input
            label='价格'
            type='digit'
            extra='元'
            placeholder='请输入价格'
          />
        </FormItem>
        <Cell
          label='上架商品'
          valueStyle={{
            display: 'flex',
            justifyContent: 'flex-end',
          }}>
          <FormItem
            padding={130}
            name='actStatus'
            initialValue={1}
            trigger='onChange'>
            <Switch />
          </FormItem>
        </Cell>
        <FormItem
          padding={130}
          name='remarks'
          trigger='onChange'
          rules={[{ required: true }]}>
          <Textarea
            style={{ padding: '10rpx' }}
            label='商品描述'
            placeholder='请输入商品描述'
          />
        </FormItem>
        <FormItem
          padding={20}
          name='categoryId'
          trigger='onChange'
          rules={[{ required: true, message: '请选择商品图' }]}>
          <Picker
            label='商品分类'
            options={[]}
            placeholder='Please choose'
            pickerAlign='right'
          />
        </FormItem>

        <BottomButton
          size='large'
          loading={createLoading || updateLoading}
          onTap={() => {
            const value = form.getFieldsValue();
            const { type } = value;
            form
              .validateFields()
              .then(() => {
                submit();
              })
              .catch(({ errorFields }) => {
                const noreName: string[] = [];
                if (parseInt(type) === 2) {
                  noreName.push('maxAmount', 'minAmount');
                }
                if (parseInt(type) === 1) {
                  noreName.push('pics');
                }
                const newFields = errorFields.filter(
                  (item: any) => !noreName.includes(item?.name?.[0])
                );
                if (newFields.length > 0) return;
                submit();
              });
          }}
          type='primary'
          shape='square'
          block>
          保存商品信息
        </BottomButton>
      </Form>
    </View>
  );
};
export default Index;
