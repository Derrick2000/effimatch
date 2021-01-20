import React from 'react'

// antd
import TweenOne from 'rc-tween-one';
import { AutoComplete, Button } from 'antd';

interface Props {

}

const SearchBar: React.FC<Props> = (props:Props) => {

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

    return (
        <TweenOne 
            className='search-bar'
            animation={{ x: 30, type: 'from', ease: 'easeOutQuad' }}
        >
            <h1 className='search-bar-title'>Get your dream job today</h1>

            <div className='search-bar-input-wrapper'>
                <AutoComplete
                    className='search-bar-autocomplete'
                    value={value}
                    options={options}
                    onSelect={onSelect}
                    onSearch={onSearch}
                    onChange={onChange}
                    placeholder='Search your favorite company'
                />

                <Button type='primary' className='search-bar-button'>Search</Button>
            </div>
            
        </TweenOne>
    )
}

export default SearchBar;