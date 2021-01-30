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
        <a className='card-block-group' href='/#'>
            <div className='card-header-wrapper'>
                <img src={props.logo} alt='logo' />

                <div className='card-header-title'>
                    <h1>{props.title}</h1>
                    <p>{props.name}</p>
                </div>
                <p>{props.date}</p>
            </div>

        </a>
    )
}

export default ApplicationCard;