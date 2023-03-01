import React, { useMemo, useCallback } from 'react';
import { Switch } from 'anna-remax-ui';
import { useControllableValue } from 'ahooks';

const Index: React.FC<{
  value?: 0 | 1;
  defaultValue?: 0 | 1;
  onChange?: (e: any) => void;
}> = (props) => {
  const [value, setValue] = useControllableValue<0 | 1>(props);

  const setChecked = useCallback(
    (e: boolean) => {
      if (e) {
        setValue(1);
      } else {
        setValue(0);
      }
    },
    [setValue]
  );

  const checked = useMemo(() => {
    return !!value;
  }, [value]);
  return <Switch small={true} checked={checked} onChange={setChecked} />;
};
export default Index;
