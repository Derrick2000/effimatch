import React from 'react'
import './ApplicationCardStyle.less';

interface applicationData {
    title: string,
    logo: string,
    name: string,
    date: string
}

const ApplicationCard:React.FC<applicationData> = (props: applicationData) => {
    return (
        <a className='appcard-block-group' href='/#'>
            <div className='appcard-info-wrapper'>


                <div className='appcard-info-block'>
                    <img src={props.logo} className='appcard-info-block-image'alt='logo' />
                    <div className='appcard-info-block-title'>
                      <h1>{props.title}</h1>
                      <p>{props.name}</p>
                    </div>
                </div>

                <p className='appcard-info-date'>{props.date}</p>
            </div>

        </a>
    )
}

export default ApplicationCard;
