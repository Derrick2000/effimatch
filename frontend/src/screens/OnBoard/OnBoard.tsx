import React from 'react';

// componenet
import Card from '../../components/Card/Card';
import LoadCard from '../../components/LoadCard/LoadCard';
import SearchBar from '../../components/SearchBar/SearchBar';

// antd
import { Row, Col } from 'antd';
import { Tag } from 'antd';
import { Skeleton } from 'antd';
import TweenOne from 'rc-tween-one';
import { TweenOneGroup } from 'rc-tween-one';

// style
import './styles/onboard.less';


const OnBoard: React.FC<any> = () => {

    return (
        <div className='onboard-wrapper'>
            <h1>On Boarding Page</h1>
        </div>
    )
}



export default OnBoard;