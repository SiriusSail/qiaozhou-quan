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
  button?:
    | ((value?: string, item?: API.OptionsType) => React.ReactNode)
    | React.ReactNode;
  value?: string[];
  placeholder?: string;
  onChange?: (value?: string[]) => void;
  onClick?: () => void;
  disabled?: boolean;
  options?: API.OptionsType[];
}

export const Img: React.FC<NewPopupProps> = ({
  position = 'bottom',
  value: _value,
  placeholder,
  onChange: _onChange,
  options: _options = [],
  onClose,
  disabled,
  onClick,
  button,
  ...props
}) => {
  const [show, setShow] = useState(false);

  // 选择结果
  const [value, setValue] = useState<string[]>();

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

  const onChange = useCallback((v: string[]) => {}, []);

  const addValues = useCallback(
    (v: API.OptionsType) => {
      if (disabled) {
        return;
      }
      const val = v.key || v.value;
      const newValues = value?.concat(val) || [val];
      onChange(newValues);
    },
    [disabled, onChange, value]
  );

  return (
    <View className={'modail-select'}>
      <View
        onTap={() => {
          onClick?.();
          setShow(true);
        }}>
        {value ? (
          value
        ) : (
          <View className='anna-form-value-placeholder'>{placeholder}</View>
        )}
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
