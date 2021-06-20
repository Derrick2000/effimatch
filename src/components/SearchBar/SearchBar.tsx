import React from 'react';
import './searchBar.less';
import {Button, Input} from 'antd';

interface Props {
  buttonWidth?: number | string;
  search?: (string) => void;
}

const SearchBar: React.FC<Props> = (props: Props) => {
  const [value, setValue] = React.useState('');
  // const [, setOptions] = React.useState<{ value: string }[]>([]);

  // 假的 没啥用 用来演示auto complete的效果
  // const mockVal = (str: string, repeat = 1) => {
  //     return {
  //       value: str.repeat(repeat),
  //     };
  // };

  // const onSearch = (searchText: string) => {
  //     setOptions(
  //       !searchText ? [] : [mockVal(searchText), mockVal(searchText, 2), mockVal(searchText, 3)],
  //     );
  // };

  // const onSelect = (data: string) => {
  //     console.log('onSelect', data);
  // };

  const onChange = (ev: React.ChangeEvent<HTMLInputElement>) => {
    setValue(ev.target.value);
  };

  const onClick = () => {
    // to avoid exception when 'search()' is undefined
    if (props.search) {
      props.search(value);
      setValue('');
    }
  };

  // detect user key down input
  const onDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Enter') {
      onClick();
    }
  };

  return (
    <div className="search-bar-wrapper" onKeyDown={onDown}>
      <Input
        className="search-bar-autocomplete"
        value={value}
        onChange={onChange}
        placeholder="Search your favorite company"
      />

      <Button
        style={{width: props.buttonWidth}}
        type="primary"
        className="search-bar-button"
        onClick={onClick}>
        Search
      </Button>
    </div>
  );
};

export default SearchBar;
