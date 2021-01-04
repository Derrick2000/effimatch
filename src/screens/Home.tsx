import React from 'react';

// screens and componets 
import NavBar from '../components/NavBar';
import SearchBar from '../components/SearchBar';
import TweenOne from 'rc-tween-one';
import Footer from '../components/Footer';

// antd
import OverPack from 'rc-scroll-anim/lib/ScrollOverPack';
import QueueAnim from 'rc-queue-anim';
import { Row, Col } from 'antd';
import { Button } from 'antd/lib'

// assets (temp)
import MS_logo from '../images/MS_logo.png';
import Avatar from '../images/avatar.png';

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
        <OverPack playScale={0.3} className='home-card-wrapper'>
            <QueueAnim
                key="queue"
                type="bottom"
                leaveReverse
                interval={50}
            >
                <Row justify='space-between'>
                    {cardsData.map((item: CardData, i: number) => (
                        <Col md={6} xs={24} className='home-card-block' key={i.toString()}>
                            <a className='home-card-block-group'>
                                <div className='home-card-header-wrapper'>
                                    <div className='home-card-header-title'>
                                        <h1>{item.title}</h1>
                                        <p>@ {item.company}</p>
                                    </div>
                                    <img src={item.logo} alt='logo' />
                                </div>

                                <div className='home-card-avatar-wrapper'>
                                    <img src={item.avatar} alt='avatar' />
                                    <p className='home-card-avatar-text'>{item.name}</p>
                                </div>

                                <Button type='primary' className='home-card-button'>Get Referral</Button>
                            </a>
                        </Col>
                    ))}
                </Row>

            </QueueAnim>
        </OverPack>
    )
}

// 还不知道这一坨card是干嘛的，暂时叫这个名字
const RenderBigCard: React.FC<any> = () => {
    return (
        <div className='home-card-big-card-wrapper'>
            <h2>Are you a referrer</h2>
        </div>
    )
}

const Home: React.FC<Props> = (props: Props) => {
    const [ isMobile, setIsMobile ] = React.useState(false);

    React.useEffect(() => {
        // responsive to mobile screen
        enquireScreen((mobileState: boolean) => {
            setIsMobile(mobileState);
          });
    }, [])

    return (
        <>  
            <NavBar 
                isMobile={isMobile}
            />

            <div className='home-content-wrapper'>
                <SearchBar />

                {/* 除了searchBar之外的所有内容 */}
                <TweenOne 
                    animation={{ x: -30, type: 'from', ease: 'easeOutQuad' }}
                >
                    {RenderCards(cardData)}
                    <RenderBigCard />
                </TweenOne>
            </div>

            <Footer />
            
        </>
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

export default Home;