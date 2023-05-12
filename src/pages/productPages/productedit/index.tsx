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
import { Input, Cell, Picker, Button } from 'anna-remax-ui';
import { useRequest } from 'ahooks';
import { useQuery } from 'remax';
import userInfoStores from '@/stores/userInfo';
import { findGoodsListByMerchantId } from '@/apis/goods';
import type { FindGoods } from '@/apis/goods';

const Index = () => {
  const { id, categoryId } = useQuery<{ id: string; categoryId: string }>();
  const [form] = useForm();
  const { userInfo } = userInfoStores.useContainer();
  const { data: categoryList } = useRequest(
    () => {
      if (!userInfo?.merchantId) return Promise.resolve({} as FindGoods);
      return findGoodsListByMerchantId(userInfo?.merchantId);
    },
    {
      refreshDeps: [userInfo],
    }
  );

  useRequest(
    () => {
      if (!id) return Promise.resolve(undefined);
      return findGoodsByGoodsId(id);
    },
    {
      onSuccess: (e) => {
        form.setFieldsValue({
          ...e,
          cover: [e?.cover].filter((item) => !!item),
        });
      },
      onError: (e) => {
        console.log(e);
        showModal({
          title: '提示',
          content: '商品信息获取失败',
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
        title: '商品添加成功',
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
        content: e.message || '商品添加失败',
        showCancel: false,
      });
    },
  });
  const { run: del, loading: delLoading } = useRequest(goodsDelete, {
    manual: true,
    onSuccess: () => {
      showToast({
        title: '商品删除成功',
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
  const { run: toggling, loading: toggleLoading } = useRequest(
    (open: boolean) => {
      if (!id) return Promise.resolve(false);
      if (open) return goodsEnable(id);
      return goodsDisable(id);
    },
    {
      manual: true,
    }
  );

  const submit = useCallback(() => {
    const { id, cover, ...value } = form.getFieldsValue();
    if (id) {
      toggling(value.actStatus);
      return update({
        id,
        cover: cover[0],
        ...value,
      });
    }
    create({
      cover: cover[0],
      ...value,
    });
  }, [create, form, toggling, update]);

  return (
    <View>
      <Form component={false} form={form}>
        <Field name='id' initialValue={id} />
        <FormItem
          padding={20}
          name='cover'
          trigger='onChange'
          rules={[{ required: true, message: '请选择商品图' }]}>
          <ImageUpload maxCount={1} label='商品图' />
        </FormItem>
        <FormItem
          padding={20}
          name='categoryId'
          initialValue={categoryId}
          trigger='onChange'
          normalize={(e) => e?.key}
          rules={[{ required: true, message: '请选择分类信息' }]}>
          <Picker
            label='商品分类'
            options={categoryList?.goodsCategoryListResList?.map((item) => ({
              key: item.categoryId,
              value: item.categoryName,
            }))}
            placeholder='请选择分类信息'
            pickerAlign='right'
          />
        </FormItem>
        <FormItem
          padding={130}
          name='goodsName'
          trigger='onChange'
          rules={[{ required: true }]}>
          <Input label='商品名称' maxLength={10} placeholder='请输入商品名称' />
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
          padding={130}
          name='tags'
          trigger='onChange'
          normalize={(e) => e?.replace?.('，', ',')}
          rules={[{ required: true }]}>
          <Textarea
            style={{ padding: '10rpx' }}
            label='商品标签'
            placeholder='请输入商品标签用逗号(,)分隔'
          />
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
                content: '请在再次确认是否删除该商品',
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
            删除商品
          </Button>
        )}

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
