import React from 'react';
import { View, redirectTo } from 'remax/one';
import { useQuery } from 'remax';
import { usePageEvent } from 'remax/macro';

const Index: React.SFC = () => {
  const { q, suburl } = useQuery();
  console.log('suburl', suburl, decodeURIComponent(suburl || ''));
  console.log('q', q, decodeURIComponent(q || ''));
  usePageEvent('onShow', () => {
    let url = '';
    if (suburl) {
      url = decodeURIComponent(suburl);
    } else if (!suburl && q) {
      const path = decodeURIComponent(q).split('/qrcode/')[1];
      const [page, query] = path?.split('?') || [];
      url = `/pages/${page}/index?${query}`;
    }

    url && redirectTo({ url });
  });
  return <View>正在跳转...</View>;
};

export default Index;
