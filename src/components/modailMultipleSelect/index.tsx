import React, {
  useMemo,
  useState,
  useRef,
  useEffect,
  useCallback,
} from 'react';
import { View } from 'remax/wechat';
import { Popup, SearchBar, Cell, Space, Tag, Icon } from 'anna-remax-ui';
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
  maxLength?: number;
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
  maxLength,
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
  const valueRef = useRef(JSON.stringify(_value));
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

  useEffect(() => {
    if (valueRef.current !== JSON.stringify(_value)) {
      setValue(_value);
    }
  }, [_value]);

  const clearThenValue = useCallback(() => {
    setThenValue(undefined);
    updateKey();
  }, [updateKey]);

  const close = useCallback(() => {
    setShow(false);
    onClose?.();
    clearThenValue?.();
  }, [clearThenValue, onClose]);

  const onChange = useCallback(
    (v: string[]) => {
      setValue(v);
      valueRef.current = JSON.stringify(v);
      _onChange?.(v);
    },
    [_onChange]
  );

  const addValues = useCallback(
    (v: API.OptionsType) => {
      if (disabled) {
        return;
      }
      const val = v.key || v.value;
      if (value?.includes(val)) return;
      const newValues = value?.concat(val) || [val];
      onChange(maxLength ? newValues.slice(-maxLength) : newValues);
    },
    [disabled, maxLength, onChange, value]
  );

  const delValues = useCallback(
    (v: string) => {
      if (disabled) {
        return;
      }
      const newValues = value?.filter((val) => val !== v) || [];
      onChange(newValues);
    },
    [disabled, onChange, value]
  );

  const selectCloseTab = useMemo(() => {
    return value?.map((key) => {
      const find = _options?.find((item) => item.key === key);
      return (
        <Tag key={key} size='large' onTap={() => delValues(key)}>
          <Space>
            <View>{find?.value || key}</View>
            <Icon type='close' />
          </Space>
        </Tag>
      );
    });
  }, [_options, delValues, value]);

  const selectTab = useMemo(() => {
    return value?.map((key) => {
      const find = _options?.find((item) => item.key === key);
      return (
        <Tag key={key} size='large' className='modail-multiple-select-tag'>
          {find?.value || key}
        </Tag>
      );
    });
  }, [_options, value]);

  return (
    <View className={'modail-select'}>
      <View
        onTap={() => {
          onClick?.();
          setShow(true);
        }}>
        {value ? (
          <Space>{selectTab}</Space>
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
          <Space style={{ width: '100vw' }}>{selectCloseTab}</Space>
          <View>
            {options?.length === 0 ? (
              <NoData />
            ) : (
              options?.map((item) => {
                return (
                  <Cell
                    key={item.key || item.value}
                    label={item.value}
                    border
                    onTap={() => {
                      addValues(item);
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
