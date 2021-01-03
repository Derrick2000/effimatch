import React from 'react';

// screens and componets 
import NavBar from '../components/NavBar';
import SearchBar from '../components/SearchBar'

// antd
import OverPack from 'rc-scroll-anim/lib/ScrollOverPack';
import QueueAnim from 'rc-queue-anim';
import { Row, Col } from 'antd';

import { enquireScreen } from 'enquire-js';

interface Props {

}

interface CardData {
    image: string,
    title: string,
    content: string
}



const RenderCards: React.FC<CardData[]> = (cardsData: CardData[]) => {

    return (
        <OverPack playScale={0.3}>
            <QueueAnim
                key="queue"
                type="bottom"
                leaveReverse
                interval={50}
                component={Row}
                // gutter={24}
                // className='main-card-block-wrapper'
            >
                {cardsData.map((item: CardData, i: number) => (
                        <Col md={6} xs={24} className='home-card-block' key={i.toString()}>
                            <a className='home-card-block-group'>
                                <img src={item.image} className='home-card-image' />
                                <p className='home-card-title'>{item.title}</p>
                                <p className='home-card-content'>{item.content}</p>
                            </a>
                        </Col>
                ))}
            </QueueAnim>
        </OverPack>
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

            <SearchBar />

            {RenderCards(cardData)}
        </>
    )
}

const cardData = [
    {
        image: 'https://gw.alipayobjects.com/zos/basement_prod/e339fc34-b022-4cde-9607-675ca9e05231.svg',
        title: 'card1',
        content: 'jdpoaijdpweajdiawj'
    },
    {
        image: 'https://gw.alipayobjects.com/zos/basement_prod/e339fc34-b022-4cde-9607-675ca9e05231.svg',
        title: 'card1',
        content: 'jdpoaijdpweajdiawj'
    },
    {
        image: 'https://gw.alipayobjects.com/zos/basement_prod/e339fc34-b022-4cde-9607-675ca9e05231.svg',
        title: 'card1',
        content: 'jdpoaijdpweajdiawj'
    }
]

export default Home;