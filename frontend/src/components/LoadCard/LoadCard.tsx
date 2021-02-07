import React from 'react'
import { Button } from 'antd/lib'
import { Skeleton, Space, Divider, Switch, Form, Radio } from 'antd';
import './loadcardStyles.less';


const LoadCard:React.FC<any> = () => {
    return (
        <a className='loadcard-block-group' href='#'>
            <div className='card-header-wrapper'>
                <div className='loadcard-header-title'>
                    <Skeleton.Input className='loadcard-header-title-head' style={{ width: 150, height: 15}} active size={"small"}/>
                    <Skeleton.Input className='loadcard-header-title-desciption' style={{ width: 100, height: 10}} active size={"small"}/>
                </div>
                <Skeleton.Image className='loadcard-header-img' style={{width: 30, height: 20}} />
            </div>

            <div className='loadcard-avatar-wrapper'>
                <Skeleton.Image className='loadcard-avatar-img' style={{width: 40, height: 70}} />
                <Skeleton.Input className='loadcard-avatar-text' active size={"small"} style={{ height: 15}}/>
            </div>

            <Button type='primary' className='loadcard-button'>Get Referral</Button>
        </a>
    )
}

export default LoadCard;