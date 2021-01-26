import React from 'react';

// screens and componets 
import NavBar from '../../components/NavBar/NavBar';
import Header from './Header';
import TweenOne from 'rc-tween-one';
import Footer from '../../components/Footer';
import Companies from './Companies'
import Card from '../../components/Card/Card';

// antd
import QueueAnim from 'rc-queue-anim';
import { Row, Col } from 'antd';

// assets (temp)
import MS_logo from '../../images/MS_logo.png';
import Avatar from '../../images/avatar.png';

import './styles/home.less';

import { enquireScreen } from 'enquire-js';

interface Props {

}

interface CardData {
    title: string,
    company: string,
    avatar: string,
    logo: string,
    name: string
}

const RenderCards: React.FC<CardData[]> = (cardsData: CardData[]) => {
    return (
        <div className='home-cards-wrapper'>
            <QueueAnim
                key="queue"
                type="bottom"
                leaveReverse
                interval={50}
            >   
                <div className='home-cards-title'>
                    <h1 className='home-cards-title-h1'>Jobs by Category</h1>
                    <a className='home-cards-title-link' href='/#'>Explore more</a>
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

            </QueueAnim>
        </div>
    )
}

const GuestHome: React.FC<Props> = (props: Props) => {
    const [ isMobile, setIsMobile ] = React.useState(false);

    React.useEffect(() => {
        // responsive to mobile screen
        enquireScreen((mobileState: boolean) => {
            setIsMobile(mobileState);
          });
    }, [])

    return (
        <div className='home-wrapper'>  
            <NavBar 
                isMobile={isMobile}
            />

            <div className='home-content-wrapper'>
                <Header />

                {/* 除了searchBar之外的所有内容 */}
                <TweenOne 
                    animation={{ x: -200, type: 'from', ease: 'easeOutQuad' }}
                >   
                    <Companies />
                    {RenderCards(cardData)}
                    {/* <RenderBigCard /> */}
                </TweenOne>
            </div>

            <Footer />
        </div>
    )
}

const cardData: CardData[] = [];

for (let ii = 0; ii < 3; ii++) {
    cardData.push(
        {
            title: 'Design Positions',
            company: 'Microsoft',
            name: 'referer 1',
            logo: MS_logo,
            avatar: Avatar
        }
    )
}

export default GuestHome;