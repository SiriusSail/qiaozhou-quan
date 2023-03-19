import * as React from 'react';
import { View } from 'remax/one';
import styles from './index.less';
export interface GridItemProps {
  children?: any;
}
const GridItem = (props: GridItemProps) => {
  const { children } = props;
  return <View className={styles.gridItem}>{children}</View>;
};
export default GridItem;
