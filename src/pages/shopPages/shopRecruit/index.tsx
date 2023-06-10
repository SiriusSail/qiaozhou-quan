import React, { useState } from 'react';
import { navigateBack, showToast, showModal, View } from 'remax/wechat';
import Switch from '@/components/switch';
import BottomButton from '@/components/bottomButton';
import Textarea from '@/components/textarea';
import FormItem from '@/components/formItem';
import type { Jobinfo } from '@/apis/jobInfo';
import { addJobinfo, getJobinfo, updateJobinfo } from '@/apis/jobInfo';
import { useRequest } from 'ahooks';
import Form, { useForm } from 'rc-field-form';
import { Input, Cell, Radio } from 'anna-remax-ui';
import LoginLayout from '@/layout/loginLayout';
import { usePageEvent } from 'remax/macro';
import { useQuery } from 'remax';
import Shadow from '@/components/shadow';

const Index = () => {
  const { id } = useQuery<{ id: string }>();
  const [form] = useForm();
  const [jobType, setJobType] = useState<1 | 2 | undefined>(1);
  const { run, loading } = useRequest(
    (params: Jobinfo) => {
      if (id) {
        return updateJobinfo({
          id,
          jobType,
          ...params,
        });
      }
      return addJobinfo({ jobType, ...params });
    },
    {
      manual: true,
      onSuccess: () => {
        showToast({
          title: '发布成功',
          duration: 2000,
          icon: 'success',
        });
        setTimeout(() => {
          navigateBack();
        }, 2000);
      },
      onError: (e) => {
        showModal({
          title: '提示',
          content: e.message || '发布失败',
          showCancel: false,
        });
      },
    }
  );

  usePageEvent('onLoad', () => {
    if (!id) return;
    getJobinfo(id).then((res) => {
      form.setFieldsValue(res);
      setJobType(res.jobType);
    });
  });

  return (
    <LoginLayout>
      <Form component={false} form={form}>
        <Shadow addstyle='padding:0'>
          <Cell label='岗位类型'>
            <Radio.Group
              style={{ justifyContent: 'flex-end' }}
              value={jobType}
              onChange={setJobType}>
              <Radio value={1}>兼职</Radio>
              <Radio value={2}>全职</Radio>
            </Radio.Group>
          </Cell>
          <Cell border={false} label='招聘人数'>
            <FormItem
              name='jobNumber'
              trigger='onChange'
              rules={[{ required: true }]}>
              <Input border={false} type='number' placeholder='招聘人数' />
            </FormItem>
          </Cell>
        </Shadow>
        <Shadow addstyle='padding:0'>
          <View>
            <FormItem
              padding={20}
              name='jobDesc'
              trigger='onChange'
              rules={[{ required: true, message: '请输入岗位介绍' }]}>
              <Textarea
                border={false}
                label='岗位介绍'
                placeholder='请输入岗位介绍'
              />
            </FormItem>
          </View>
        </Shadow>
        <Shadow addstyle='padding:0'>
          <Cell border={false} label='开启招聘'>
            <FormItem name='status' initialValue={1} trigger='onChange'>
              <Switch
                onChange={(e) => {
                  console.log(e);
                }}
              />
            </FormItem>
          </Cell>
        </Shadow>
      </Form>

      <BottomButton
        loading={loading}
        size='large'
        onTap={() => {
          form.validateFields().then(async (value) => {
            run(value);
          });
        }}
        type='primary'
        shape='square'
        block>
        发布信息
      </BottomButton>
    </LoginLayout>
  );
};
export default Index;
