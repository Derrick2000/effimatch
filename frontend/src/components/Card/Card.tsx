import React from 'react'
import { Button } from 'antd/lib'
import './cardStyle.less';

interface CardProps {
    title: string,
    company: string,
    logo: string,
    avatar: string,
    name: string,
}

const Card:React.FC<CardProps> = (props: CardProps) => {
    return (
        <a className='card-block-group' href='/#'>
            <div className='card-header-wrapper'>
                <div className='card-header-title'>
                    <h1>{props.title}</h1>
                    <p>@ {props.company}</p>
                </div>
                <img src={props.logo} alt='logo' />
            </div>

            <div className='card-avatar-wrapper'>
                <img src={props.avatar} alt='avatar' />
                <p className='card-avatar-text'>{props.name}</p>
            </div>

            <Button type='primary' className='card-button'>Get Referral</Button>
        </a>
    )
}

export default Card;