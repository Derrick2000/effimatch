// TODO: 根据要求完成这个page
// 你应该会需要用到 components 里面的 Card
import React from 'react';

// screens and componets
import TweenOne from 'rc-tween-one';
import Footer from '../../components/Footer/Footer';
import Card from '../../components/Card/Card';

// antd
import QueueAnim from 'rc-queue-anim';
import {Row, Col, Button} from 'antd';

// assets (temp)
import MS_logo from '../../images/MS_logo.png';
import Avatar from '../../images/avatar.png';

import '../GuestHome/styles/home.less';

interface Props {

}

interface CardData {
    title: string,
    company: string,
    avatar: string,
    logo: string,
    name: string
}

interface applicationData {
    title: string,
    avatar: string,
    logo: string,
    name: string,
    date: string
}

const applicationCard:React.FC<applicationData> = (props: applicationData) => {
    return (
        <a className='card-block-group' href='/#'>
            <div className='card-header-wrapper'>
                <div className='card-header-title'>
                    <h1>{props.title}</h1>
                    <p>{props.name}</p>
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


const RenderCards: React.FC<CardData[]> = (cardsData: CardData[]) => {
    return (
        <div className='home-cards-wrapper'>

                <div className='home-cards-title'>
                    <h1 className='home-cards-title-h1'>Positions you might be interested in</h1>
                </div>
                <Row justify='space-between'>
                    {cardsData.map((item: CardData, i: number) => (
                        <Col md={6} xs={24} className='home-card-block' key={i.toString()}>
                            <Card
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
const RenderApplicationCards: React.FC<CardData[]> = (cardsData: CardData[]) => {
    return (
        <div className='home-cards-wrapper'>

            <div className='home-cards-title'>
                <h1 className='home-cards-title-h1'>Positions you might be interested in</h1>
            </div>
            <Row justify='space-between'>
                {cardsData.map((item: CardData, i: number) => (
                    <Col md={6} xs={24} className='home-card-block' key={i.toString()}>
                        <Card
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



const JsHome: React.FC<Props> = (props: Props) => {


    return (
        <div className='home-wrapper'>
            <div className='home-content-wrapper'>

                <TweenOne
                    animation={{ x: -200, type: 'from', ease: 'easeOutQuad' }}
                >
                    {RenderCards(referralCardData)}
                </TweenOne>
            </div>
            <Footer />
        </div>
    )
}

// dummy data for "get referral cards"
const referralCardData: CardData[] = [];
for (let ii = 0; ii < 3; ii++) {
    referralCardData.push(
        {
            title: 'Design Positions',
            company: 'Microsoft',
            name: 'referer 1',
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
const sentCardData: applicationData[] = [];
for (let ii = 0; ii < 2; ii++) {
    sentCardData.push(
        {
            title: 'Frontend Engineer',
            avatar: Avatar,
            logo: MS_logo,
            name: 'referer 2',
            date: 'Jan 23'

        }
    )
}
// dummy data for viewed:
const viewedCardData: applicationData[] = [];
for (let ii = 0; ii < 1; ii++) {
    viewedCardData.push(
        {
            title: 'Software Engineer',
            avatar: Avatar,
            logo: MS_logo,
            name: 'referer 1',
            date: 'Jan 23'
        }
    )
}
// dummy data for accepted:
const acceptedCardData: applicationData[] = [];
for (let ii = 0; ii < 1; ii++) {
    acceptedCardData.push(
        {
            title: 'Software Engineer',
            avatar: Avatar,
            logo: MS_logo,
            name: 'referer 3',
            date: 'Jan 23'
        }
    )
}



export default JsHome;