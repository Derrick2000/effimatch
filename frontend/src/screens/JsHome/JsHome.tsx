// TODO: 根据要求完成这个page
// 你应该会需要用到 components 里面的 Card
import React from 'react';

// screens and componets
import TweenOne from 'rc-tween-one';
import Footer from '../../components/Footer/Footer';
import Card from '../../components/Card/Card';
import ApplicationCard from '../../components/Card/ApplicationCard';
import JSHomeOnBoarding from '../../components/JSHomeOnBoarding/JSHomeOnBoarding'
// antd
import QueueAnim from 'rc-queue-anim';
import {Row, Col, Button,Divider,Modal} from 'antd';

// assets (temp)
import MS_logo from '../../images/MS_logo.png';
import Avatar from '../../images/avatar.png';

import './styles/JsHome.less';
import axios from 'axios';

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
    logo: string,
    name: string,
    date: string
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

// title: string,
//     avatar: string,
//     logo: string,
//     name: string,
//     date: string

const RenderApplicationCards: React.FC<applicationData[]> = (cardsData: applicationData[]) => {
    return (
        <div className='application-cards-wrapper'>

            <Row justify='space-between' gutter={[16,16]}>
                {cardsData.map((item: applicationData, i: number) => (
                    <Col md={12} xs={24} className='home-card-block' key={i.toString()}>
                        <ApplicationCard
                            title={item.title}
                            logo={item.logo}
                            name={item.name}
                            date={item.date}
                        />
                    </Col>
                ))}
            </Row>

        </div>
    )
}



const JsHome: React.FC<Props> = (props: Props) => {
    const [renderdata, setrenderdata] = React.useState(sentCardData);
    const [underlineButton, setUnderlineButton] = React.useState(1);
    const [ finishedOnBoarding, setFinishedOnboarding ] = React.useState(true);

    React.useEffect(() => {
        axios.get('http://localhost:8080/v1/users/get-own')
        .then(r => {
            setFinishedOnboarding(r.data.finishedTutorial);
        })
    }, [])

    const handleOnBoardingClose = () => {
        axios.post('http://localhost:8080/v1/users/finished-tutorial')
    }

    return (

        <div className='JsHome-wrapper'>
            <div className='home-content-wrapper'>

                <TweenOne
                    animation={{ x: -200, type: 'from', ease: 'easeOutQuad' }}
                >
                    {RenderCards(referralCardData)}

                        <div className='home-cards-title'>
                            <h1 className='home-cards-title-h1' >Your Applications</h1>
                        </div>
                        <div className='application-button-row'>
                        <Row justify='start'>
                            <Col>
                              <div className='application-button'
                                style={{textDecoration: underlineButton==1 ? 'underline' : 'none'}}
                                onClick={() => {
                                  setrenderdata(sentCardData);
                                  setUnderlineButton(1);
                                }}>
                              Sent
                              </div>
                            </Col>

                            <Col>
                              <div className='application-button'
                                style={{textDecoration: underlineButton==2 ? 'underline' : 'none'}}
                                onClick={() => {
                                  setrenderdata(viewedCardData);
                                  setUnderlineButton(2);
                                }}>
                              Viewed
                              </div>
                            </Col>

                            <Col>
                              <div className='application-button'
                                style={{textDecoration: underlineButton==3 ? 'underline' : 'none'}}
                                onClick={() => {
                                  setrenderdata(acceptedCardData);
                                  setUnderlineButton(3);
                                }}>
                              Accepted
                              </div>
                            </Col>
                        </Row>
                        </div>
                    {RenderApplicationCards(renderdata)}

                </TweenOne>
            </div>
            <Footer />
            {finishedOnBoarding ? null : <JSHomeOnBoarding handleClose={handleOnBoardingClose}/>}
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
            logo: MS_logo,
            name: 'referer 2',
            date: 'Jan 23'

        }
    )
}
// dummy data for viewed:
const viewedCardData: applicationData[] = [];
for (let ii = 0; ii < 3; ii++) {
    viewedCardData.push(
        {
            title: 'Software Engineer',
            logo: MS_logo,
            name: 'referer 1',
            date: 'Jan 23'
        }
    )
}
// dummy data for accepted:
const acceptedCardData: applicationData[] = [];
for (let ii = 0; ii < 4; ii++) {
    acceptedCardData.push(
        {
            title: 'Software Engineer',
            logo: MS_logo,
            name: 'referer 3',
            date: 'Jan 23'
        }
    )
}



export default JsHome;
