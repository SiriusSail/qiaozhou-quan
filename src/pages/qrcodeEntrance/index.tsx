import React from 'react';
import { View, redirectTo } from 'remax/one';
import { useQuery } from 'remax';
import { usePageEvent } from 'remax/macro';

const Index: React.SFC = () => {
  const { q, suburl } = useQuery();
  console.log('suburl', suburl);
  console.log('q', q);
  // usePageEvent('onShow', () => {
  //   let url = '';
  //   if (suburl) {
  //     url = decodeURIComponent(suburl);
  //   } else if (!suburl && q) {
  //     const query = decodeURIComponent(q).split('qrPrescription?suburl=')[1];
  //     url = query;
  //   }
  //   console.log(url);
  //   url && redirectTo({ url });
  // });
  return <View>正在跳转...</View>;
};

export default Index;
