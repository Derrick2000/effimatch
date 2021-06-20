import React from 'react';
import './inputBar.less';
import {AutoComplete, Input} from 'antd';

interface Props {
  topic?: string | '';
  input?: (string) => void;
  placehold?: string | '';
  autocomplete?: boolean | true;
}

const InputBar: React.FC<Props> = (props: Props) => {
  const [value, setValue] = React.useState('');
  const [options, setOptions] = React.useState<{value: string}[]>([]);

  const mockVal = (str: string, repeat = 1) => {
    return {
      value: str.concat(props.topic ? ' ' + props.topic : '').repeat(repeat),
    };
  };

  const onSearch = (searchText: string) => {
    setOptions(
      !searchText
        ? []
        : [mockVal(searchText), mockVal(searchText, 2), mockVal(searchText, 3)],
    );
  };

  // newly added, to save values
  const saveValue = (value: string) => {
    if (props.input) {
      props.input(value);
      if (props.autocomplete) setValue('');
    }
  };

  const onSelect = (data: string) => {
    saveValue(data);
  };

  const onChange = (data: string) => {
    setValue(data);
  };

  // detect user key down input
  const onDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Enter') {
      saveValue(value);
    }
  };

  const onInput = (value: string) => {
    setValue(value);
    saveValue(value);
  };

  return (
    <div className="inputbar-wrapper" onKeyDown={onDown}>
      {props.autocomplete ? (
        <AutoComplete
          className="inputbar-autocomplete"
          value={value}
          options={options}
          onSelect={onSelect}
          onSearch={onSearch}
          onChange={onChange}
          placeholder={props.placehold}
        />
      ) : (
        <Input
          className="inputbar-text"
          placeholder={props.placehold}
          value={value}
          onChange={e => onInput(e.target.value)}
        />
      )}
    </div>
  );
};

export default InputBar;
