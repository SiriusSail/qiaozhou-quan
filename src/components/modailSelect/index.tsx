import React, {
  useMemo,
  useState,
  useRef,
  useEffect,
  useCallback,
} from 'react';
import { View } from 'remax/wechat';
import { Popup, SearchBar, Cell } from 'anna-remax-ui';
import NoData from '../no-data';
import './index.less';
import type { PopupProps } from 'anna-remax-ui/esm/popup';

export interface NewPopupProps extends PopupProps {
  buttonRender?: (value?: string, item?: API.OptionsType) => React.ReactNode;
  value?: string;
  onChange?: (value?: string) => void;
  onClick?: () => void;
  onSelect?: (
    value: string | undefined,
    item?: API.OptionsType,
    ref: { close: () => void }
  ) => void;
  options: API.OptionsType[];
  initOpen?: boolean;
}

export const Img: React.FC<NewPopupProps> = ({
  position = 'bottom',
  value: _value,
  onChange,
  options: _options,
  onClose,
  onSelect,
  onClick,
  initOpen = false,
  buttonRender,
  ...props
}) => {
  const [show, setShow] = useState(initOpen);

  // 选择结果
  const [value, setValue] = useState<string>();

  const [key, setKey] = useState(0);

  const updateKey = useCallback(() => {
    setKey(key + 1);
  }, [key]);
  const valueRef = useRef(_value);
  // 输入文字的结果
  const [thenValue, setThenValue] = useState<string>();

  // 可选择项
  const options = useMemo(() => {
    if (!thenValue) {
      return _options || [];
    }
    return _options?.filter(
      (item) =>
        item?.key?.includes(thenValue) || item?.value?.includes(thenValue)
    );
  }, [_options, thenValue]);

  // 选择项
  const select = useMemo(() => {
    if (!value) {
      return undefined;
    }
    return (
      _options?.find(
        (item) => item?.key?.includes(value) || item?.value?.includes(value)
      ) || { key: value, value: value }
    );
  }, [_options, value]);

  useEffect(() => {
    if (valueRef.current !== _value) {
      setValue(_value);
    }
  }, [_value]);

  const close = useCallback(() => {
    setShow(false);
    onClose?.();
  }, [onClose]);

  const clearThenValue = useCallback(() => {
    setThenValue(undefined);
    updateKey();
  }, [updateKey]);

  return (
    <View className={'modail-select'}>
      <View
        onTap={() => {
          onClick?.();
          setShow(true);
        }}>
        {buttonRender?.(value, select) || select?.value}
      </View>
      <Popup
        position={position}
        closeable
        {...props}
        open={show}
        onClose={close}>
        <View>
          <SearchBar
            key={key}
            placeholder='搜索'
            value={thenValue}
            hideActionButton
            onInput={(e) => setThenValue(e)}
            onClear={clearThenValue}
            inputStyle={{
              border: '2px solid #FF7777',
              backgroundColor: '#FDFFFD',
            }}
            style={{ marginBottom: '30px' }}
          />
          <View>
            {options?.length === 0 ? (
              <NoData />
            ) : (
              options?.map((item) => {
                return (
                  <Cell
                    label={item.value}
                    border
                    onTap={() => {
                      const val = item.key || item.value;
                      clearThenValue();
                      setValue(val);
                      valueRef.current = val;
                      onChange?.(val);
                      onSelect?.(val, item, {
                        close,
                      });
                      updateKey();
                    }}
                  />
                );
              })
            )}
          </View>
        </View>
      </Popup>
    </View>
  );
};

export default Img;
