import React, { useMemo, useState, useRef, useCallback } from 'react';
import {
  showModal,
  showShareMenu,
  createSelectorQuery,
  navigateTo,
  getSystemInfo,
  View,
} from 'remax/wechat';
import styles from './index.less';
import BottomButton from '@/components/bottomButton';
import BackImage from '@/components/backImage';
import RedEnvelope from '@/components/redEnvelope';
import { getActivityListByMerchantId } from '@/apis/activity';
import type { ActivityInfo, ActivetyAmountInfo } from '@/apis/activity';
import classnames from 'classnames';
import { receiveCoupon } from '@/apis/usercoupon';
import user from '@/stores/userInfo';
import { Space, Card, Grid, Icon, Tag, Popup, Button } from 'anna-remax-ui';
import { useRequest } from 'ahooks';
import Form, { useForm, Field } from 'rc-field-form';
import './global.less';
import { useQuery } from 'remax';
import { createContainer } from 'unstated-next';
import { usePageEvent } from 'remax/macro';
import avatarSrc from '@/components/userCard/images/avatar.jpg';
import Qrcode from '@/components/qrcode';
import invitationShare from '@/utils/invitationShare';
import { findGoodsListByMerchantId } from '@/apis/goods';
import type { Find } from '@/apis/goods';
// import { placeOrderConfirm } from '@/apis/order';
import IconFont from '@/components/iconfont';
import ProductMenu from '@/components/productMenu';
import GoodsList from '@/components/goodsList';
import Favorable from '@/components/favorable';
import currency from 'currency.js';
import storage from '@/utils/storage';

const Store = createContainer(() => {
  const { id } = useQuery<{ id: string }>();
  const [form] = useForm();
  const { userInfo } = user.useContainer();
  const { data, run: updateData } = useRequest(
    () => getActivityListByMerchantId(id, userInfo?.id),
    {
      refreshDeps: [userInfo?.id],
    }
  );

  const { runAsync: receive, loading } = useRequest(
    (params: ActivetyAmountInfo) => {
      return receiveCoupon({
        ...params,
        merNo: data?.merNo,
        merchantId: id,
        userId: userInfo?.id,
      });
    },
    {
      manual: true,
      onSuccess: () => {
        updateData();
      },
      onError: (e) => {
        showModal({
          showCancel: false,
          title: '提示',
          content: e.message,
        });
      },
    }
  );

  const getSelectProduct = useCallback(() => {
    const value = form.getFieldsValue();
    const valueArr = Object.entries(value)
      .filter(([, item]) => (item as any)?.value > 0)
      .map(([, item]) => item);
    return valueArr as Find[];
  }, [form]);

  return {
    data,
    id,
    getSelectProduct,
    form,
    receive,
  };
});

const ShoppingCart = () => {
  const [open, setOpen] = useState(false);
  const { getSelectProduct, id } = Store.useContainer();
  return (
    <>
      <View className={styles['shopping-cart']}>
        <View className={styles.row}>
          <View
            onTap={() => {
              setOpen(true);
            }}>
            <Space>
              <View className={styles['cart-icon']}>
                <IconFont name='qz-canju' size={60} />
                <Field>
                  {({ value }) => {
                    const tal = Object.entries(value).reduce((a, [, b]) => {
                      return currency(a)
                        .add((b as any)?.value || 0)
                        .toJSON();
                    }, 0);
                    if (tal === 0) {
                      return '';
                    }
                    return (
                      <View className={styles['cart-tal']}>
                        {tal > 99 ? 99 : tal}
                      </View>
                    );
                  }}
                </Field>
              </View>
              <View>
                <Field>
                  {({ value }) => {
                    const tal = Object.entries(value).reduce((a, [, b]) => {
                      return currency((b as any)?.value || 0)
                        .multiply((b as any)?.price || 0)
                        .add(a)
                        .toJSON();
                    }, 0);
                    return <Favorable favorable={tal} />;
                  }}
                </Field>
              </View>
            </Space>
          </View>
          <View>
            <Button
              look='orange'
              onTap={() => {
                const valueArr = getSelectProduct().map((item) => ({
                  goodsId: (item as any).goodsId,
                  value: (item as any).value,
                }));
                if (valueArr.length <= 0) return;
                navigateTo({
                  url: `/pages/orderConfirmation/index?merchantId=${id}`,
                });
              }}>
              选好了
            </Button>
          </View>
        </View>
      </View>
      <Popup
        position='bottom'
        title='已选商品'
        closeable
        open={open}
        onClose={() => {
          setOpen(false);
        }}>
        {open && (
          <View className={styles['cart-popup']}>
            <View>
              {getSelectProduct().map((item) => {
                return (
                  <GoodsList key={(item as any).goodsId} data={[item] as any} />
                );
              })}
            </View>
          </View>
        )}
      </Popup>
    </>
  );
};

// 店铺二维码
const ShopQrCode = () => {
  const { id } = Store.useContainer();
  const { userInfo } = user.useContainer();
  const [openQr, setOpenQr] = useState(false);
  return (
    <>
      {id === userInfo?.merchantId && (
        <BottomButton
          noHeight
          size='large'
          onTap={() => {
            setOpenQr(true);
          }}
          type='primary'
          shape='square'
          block>
          查看店铺二维码
        </BottomButton>
      )}
      <Popup
        open={openQr}
        onClose={() => {
          setOpenQr(false);
        }}>
        <View
          style={{
            padding: '80px',
          }}>
          {openQr && (
            <Qrcode
              url={`https://www.chqheiyou.com/qrcode/shop?id=${id}`}
              logo={avatarSrc}
              logoSize={80}
            />
          )}
        </View>
      </Popup>
    </>
  );
};

// 红包
const Item = (props: ActivityInfo) => {
  const { receive } = Store.useContainer();
  return (
    <Card
      style={{ padding: '0 0 20rpx' }}
      shadow={true}
      cover={
        <Card
          title={props.actDescribe}
          description={props.description}
          extra={
            props?.type === 1 && (
              <View className={styles['cover-extra']}>
                {props?.pickUpStatus ? (
                  <Tag color='yellow'>{props.pickUpStatus}</Tag>
                ) : (
                  <Tag color='red'>未领取</Tag>
                )}
              </View>
            )
          }
          direction='horizontal'>
          <View className={styles.coverRow}>
            <div></div>
          </View>
        </Card>
      }>
      {props?.type === 2 ? (
        <Grid data={props.pics} columns={3} gutter={16}>
          {(col) => (
            <BackImage
              preview={props.pics}
              style={{ margin: '6px 0', borderRadius: '10rpx' }}
              src={col}
              height='30vw'
              width='100%'
            />
          )}
        </Grid>
      ) : (
        <Grid data={props.list} columns={3} gutter={16}>
          {(col) => (
            <RedEnvelope
              receive={() => receive(col)}
              couponName={props.actContent}
              {...col}
            />
          )}
        </Grid>
      )}
    </Card>
  );
};

const Shop = () => {
  const { data, id, receive, form } = Store.useContainer();
  const pageHeight = useRef(0);
  const clientHight = useRef(0);
  const [show, setShow] = useState(false);

  const [openScroll, setOpenScroll] = useState(false);

  const { data: goodsInfo } = useRequest(() => {
    return findGoodsListByMerchantId(id);
  });

  // const getSelectProduct = useCallback(() => {
  //   const values = form.getFieldsValue();
  //   return goodsList?.goodsCategoryListResList.map(item => item.goodsListResList)
  // } ,[])

  useMemo(() => {
    if (goodsInfo) {
      const orderCache = storage.get('orderCache');
      console.log(orderCache);
      form.setFieldsValue(orderCache[id] || {});
    }
  }, [form, goodsInfo, id]);

  usePageEvent('onLoad', () => {
    // 分享内容
    showShareMenu({
      withShareTicket: true,
      menus: ['shareAppMessage', 'shareTimeline'],
    });

    // 获取可视区域高度
    getSystemInfo({
      success: (res) => {
        clientHight.current = res.windowHeight;
      },
    });
  });
  const cache = useCallback(() => {
    const values = form.getFieldsValue();
    const orderCache = storage.get('orderCache');
    storage.set('orderCache', {
      ...orderCache,
      [id]: values,
    });
  }, [form, id]);

  usePageEvent('onHide', () => {
    cache();
  });
  usePageEvent('onShareAppMessage', () => {
    return invitationShare({
      title: data?.merchantName,
      imageUrl: data?.doorPhoto,
    });
  });
  usePageEvent('onPageScroll', (e) => {
    if (pageHeight.current === 0) {
      createSelectorQuery()
        .select('#home')
        .boundingClientRect((rect) => {
          pageHeight.current = rect.height;
        })
        .exec();
    }
    if (pageHeight.current - clientHight.current <= e.scrollTop) {
      if (!openScroll) {
        setOpenScroll(true);
      }
    } else {
      if (openScroll) {
        setOpenScroll(false);
      }
    }
  });

  const activity = useMemo(() => {
    return data?.activityListResList?.[0];
  }, [data?.activityListResList]);

  return (
    <View id='home' className={classnames(styles.shop, 'shop')}>
      <Form component={false} form={form}>
        <View
          className={styles.back}
          style={{ backgroundImage: `url(${data?.doorPhoto})` }}
        />
        <View className={styles.info}>
          <View className={styles.content}>
            <Space direction='vertical'>
              <View className={styles.title}>{data?.merchantName}</View>
              <View
                onTap={() => setShow(!show)}
                className={classnames({
                  [styles.description]: !show,
                })}>
                店铺简介：{data?.merDescribe || '暂无简介'}
              </View>
              <View>联系电话：{data?.merPersonTel || '-'}</View>
              <View>
                地址：{data?.merchantAddress} <Icon type='location' />
              </View>
            </Space>
          </View>
        </View>
        <Space>
          <View className={styles['menu-title']}>点餐</View>
          {activity?.couponStatus === 1 ? (
            activity?.pickUpStatus === '未领取' ? (
              <RedEnvelope
                receive={() => receive(activity.list[0])}
                // couponName={activity?.actDescribe || ''}
                {...(activity?.list[0] || {})}>
                <Space>
                  <IconFont name='qz-hongbao' color='red' />
                  点击领取红包
                </Space>
              </RedEnvelope>
            ) : (
              <Space>
                <IconFont name='qz-hongbao' color='red' />
                <Tag color='yellow'>{activity.pickUpStatus}</Tag>
              </Space>
            )
          ) : (
            ''
          )}
        </Space>
        <ProductMenu
          openScroll={openScroll}
          render={(d) => <GoodsList data={d} />}
          data={goodsInfo?.goodsCategoryListResList}
        />
        {/* <Block title='店铺活动'>
          <View className={styles.welfare}>
            {data?.activityListResList?.map((item) => (
              <Item key={item.actId} {...item} />
            ))}
          </View>
        </Block> */}
        {/* <ShopQrCode /> */}
        <ShoppingCart />
      </Form>
    </View>
  );
};

const Index = () => {
  return (
    <Store.Provider>
      <Shop />
    </Store.Provider>
  );
};
export default Index;
