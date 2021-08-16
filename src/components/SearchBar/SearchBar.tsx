import React from 'react';
import './searchBar.less';
import {Button, Input} from 'antd';

interface Props {
  buttonWidth?: number | string;
  search?: (string) => void;
}

const SearchBar: React.FC<Props> = (props: Props) => {
  const [value, setValue] = React.useState('');

  const onChange = (ev: React.ChangeEvent<HTMLInputElement>) => {
    setValue(ev.target.value);
  };

  const handleSearch = () => {
    // to avoid exception when 'search()' is undefined
    if (props.search) {
      props.search(value);
      setValue('');
    }
  };

  // detect user key down input
  const onDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Enter') {
      handleSearch();
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
        onClick={handleSearch}>
        Search
      </Button>
    </div>
  );
};

export default SearchBar;
