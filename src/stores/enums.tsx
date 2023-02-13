import { createContainer } from 'unstated-next';
import { getMerchantType } from '@/apis/merchant';
import { campusPage } from '@/apis/campus';
import storage from '@/utils/storage';
import { useRequest } from 'ahooks';

export default createContainer(() => {
  /**
   * @merchant
   * 经营类别
   */
  const { data: merchant, run: getMerchant } = useRequest(() =>
    getMerchantType().then((res) => ({
      data: res.map((item) => ({
        key: item.dataCode,
        value: item.dataValue,
      })),
    }))
  );
  /**
   * @campus
   * 校区
   */
  const { data: campus, run: getCampusPage } = useRequest(() =>
    campusPage().then((res) => ({
      data: res.map(
        (item) =>
          ({
            key: item.id,
            value: item.campusName,
          } as API.OptionsType)
      ),
    }))
  );
  return {
    /**
     * 经营类别
     */
    merchant,
    /**
     * 校区
     */
    campus,
    getCampusPage,
    getMerchant,
  };
});
