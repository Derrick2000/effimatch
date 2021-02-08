import React from 'react';
import './searchBar.less'
import { AutoComplete, Button } from 'antd';

const SearchBar: React.FC<any> = (props) => {

    const [value, setValue] = React.useState('');
    const [options, setOptions] = React.useState<{ value: string }[]>([]);

    // 假的 没啥用 用来演示auto complete的效果
    const mockVal = (str: string, repeat: number = 1) => {
        return {
          value: str.repeat(repeat),
        };
    };

    const onSearch = (searchText: string) => {
        setOptions(
          !searchText ? [] : [mockVal(searchText), mockVal(searchText, 2), mockVal(searchText, 3)],
        );
    };
    
    const onSelect = (data: string) => {
        console.log('onSelect', data);
    };

    const onChange = (data: string) => {
        setValue(data);
    };

    const onClick = () => {
        props.search();
    };



    return (
        <div className='search-bar-wrapper'>
            <AutoComplete
                className='search-bar-autocomplete'
                value={value}
                options={options}
                onSelect={onSelect}
                onSearch={onSearch}
                onChange={onChange}
                placeholder='Search your favorite company'
            />

            <Button type='primary' className='search-bar-button' onClick={onClick}>Search</Button>
        </div>
    )
}   

export default SearchBar;