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
            <div className='appcard-header-wrapper'>


                <div className='appcard-header-block'>
                    <img src={props.logo} alt='logo' />
                    <div className='appcard-header-block-title'>
                      <h1>{props.title}</h1>
                      <p>{props.name}</p>
                    </div>
                </div>

                <p className='appcard-header-date'>{props.date}</p>
            </div>

        </a>
    )
}

export default ApplicationCard;
