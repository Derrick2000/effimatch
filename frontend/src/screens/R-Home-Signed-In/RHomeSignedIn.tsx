// TODO: 根据要求完成这个page
// 你应该会需要用到 components 里面的 Card
import React from 'react';

// screens and componets
import TweenOne from 'rc-tween-one';
import Footer from '../../components/Footer/Footer';
import MyCard from '../../components/Card/Card';
import RequestCard from '../../components/Card/RequestCard';
// antd
import QueueAnim from 'rc-queue-anim';
import {Row, Card, Col, Button,Divider,Modal} from 'antd';

// assets (temp)
import MS_logo from '../../images/MS_logo.png';
import Avatar from '../../images/avatar.png';

import './styles/RHomeSignedInStyles.less';

interface Props {

}

interface CardData {
    title: string,
    company: string,
    avatar: string,
    logo: string,
    name: string
}

interface requestCardData {
    logo: string,
    name: string,
    description: string
}

interface requestSectionData {
  title:string,
  company:string,
  requests:requestCardData[]

}



const RenderCards: React.FC<CardData[]> = (cardsData: CardData[]) => {
    return (
        <div className='RHome-Signed-In-cards-wrapper'>

                <div className='RHome-Signed-In-cards-title'>
                    <h1 className='RHome-Signed-In-cards-title-h1'>Posts:</h1>
                    <Button type="primary" className = "RHome-Signed-In-cards-title-button">Add Position</Button>
                </div>
                <Row justify='space-between' className="RHome-Signed-In-cards-section">
                    {cardsData.map((item: CardData, i: number) => (
                        <Col md={6} xs={24} className='RHome-Signed-In-card-block' key={i.toString()}>
                            <MyCard
                                title={item.title}
                                company={item.company}
                                logo={item.logo}
                                avatar={item.avatar}
                                name={item.name}
                            />
                        </Col>
                    ))}
                </Row>

        </div>
    )
}

// title: string,
//     avatar: string,
//     logo: string,
//     name: string,
//     date: string

const RenderRequestCards: React.FC<requestSectionData[]> = (sectionData: requestSectionData[]) => {
    return (
        // Edited by William. 这样视觉效果更好
        <Card title={`${sectionData[0].title} @ ${sectionData[0].company}`} className='RHome-Signed-In-application-section'>
                {sectionData[0].requests.map((item: requestCardData, i: number) => (
                    <Card.Grid key={i.toString()} style={{width:'100%'}} >
                        <RequestCard
                            logo={item.logo}
                            name={item.name}
                            description={item.description}
                        />
                    </Card.Grid>
                ))}
        </Card>
    )
}



const RHomeSignedIn: React.FC<Props> = (props: Props) => {

    return (

        <div className='RHome-Signed-In-all-wrapper'>
            <div className='RHome-Signed-In-content-wrapper'>

                <TweenOne
                    animation={{ x: -200, type: 'from', ease: 'easeOutQuad' }}
                >

                        <div className='RHome-Signed-In-cards-title'>
                            <h1 className='RHome-Signed-In-cards-title-h1' >Referral Requests:</h1>
                        </div>

                    {RenderRequestCards(dummuRequestSectionData)}
                    {RenderCards(referralCardData)}
                </TweenOne>
            </div>
            <Footer />
        </div>

    )
}

// dummy data for "get referral cards"
const referralCardData: CardData[] = [];
for (let ii = 0; ii < 1; ii++) {
    referralCardData.push(
        {
            title: 'Software Engineer',
            company: 'Microsoft',
            name: 'referer 3',
            logo: MS_logo,
            avatar: Avatar
        }
    )
}

// interface applicationData {
//     title: string,
//     avatar: string,
//     logo: string,
//     name: string,
//     date: string
// }

// dummy data for sent:
const dummuRequestCardData: requestCardData[] = [];
for (let ii = 0; ii < 2; ii++) {
    dummuRequestCardData.push(
        {
            logo: MS_logo,
            name: 'Allen C',
            description: 'Looking for software developer position'

        }
    )
}

const dummuRequestSectionData: requestSectionData[] = [];
for (let ii = 0; ii < 1; ii++) {
    dummuRequestSectionData.push(
        {
            company: 'Microsoft',
            title: 'Software Engineer',
            requests: dummuRequestCardData

        }
    )
}


export default RHomeSignedIn;
