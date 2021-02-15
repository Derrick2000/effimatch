import React from 'react'
import './ReferSectionCardStyle.less';
import ReferPositionCard from './ReferPositionCard';
import {Row, Col, Button, Divider, Comment, Avatar} from 'antd';


interface ReferPositionData {
    jobTitle: string,
    localtion: string,
    graduationDate: string,
    postDate: string
}

interface ReferSectionData {
    sectionTitle: string,
    jobs: ReferPositionData[]
}

const ReferSectionData:React.FC<ReferSectionData> = (props: ReferSectionData) => {
    return (
        <div className='ReferSectionWrapper'>
            <Row justify='space-between' style={{width: '90%'}}>
                <h2 className="sectionTitle">{props.sectionTitle}</h2>
                {props.jobs.map((item: ReferPositionData, i: number) => (
                    <Col md={12} xs={24} className='home-card-block' span={12} key={i.toString()}>
                        <ReferPositionCard
                            jobTitle={item.jobTitle}
                            localtion={item.localtion}
                            graduationDate={item.graduationDate}
                            postDate={item.postDate}
                        />
                    </Col>
                ))}
            </Row>
        </div>
    )
}

// const ReferSectionData:React.FC<ReferSectionData> = (props: ReferSectionData) => {
//     return (
//         <a className='appcard-block-group' href='/#'>
//             <div className='appcard-info-wrapper'>
//
//                 <div className='appcard-info-block'>
//                     <img src={props.logo} className='appcard-info-block-image'alt='logo' />
//                     <div className='appcard-info-block-title'>
//                       <p>{props.localtion}</p>
//                       <p>{props.graduationDate}</p>
//                       <p>{props.postDate}</p>
//                     </div>
//                 </div>
//
//                 <p className='appcard-info-date'>{props.date}</p>
//             </div>
//
//         </a>
//     )
// }

export default ReferSectionData;
