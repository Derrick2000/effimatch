import React from 'react';

// screens and componets
import Header from './Header';
import TweenOne from 'rc-tween-one';
import Footer from 'components/Footer/Footer';
import Companies from './Companies';
import Card from 'components/Card/Card';
import {useRequest} from 'apis/useRequest';
import {getAllJobsUsingGet} from 'apis/effimatch';

// antd
import QueueAnim from 'rc-queue-anim';
import {Row, Col, Button} from 'antd';

// assets (temp)
import MS_logo from 'images/MS_logo.png';
import Avatar from 'images/avatar.png';

import '../styles/home.less';

interface CardData {
  title: string;
  company: string;
  avatar: string;
  logo: string;
  name: string;
  id: number;
}

const RenderCards = (cardsData: CardData[]) => {
  return (
    <div className="home-cards-wrapper">
      <QueueAnim key="queue" type="bottom" leaveReverse interval={50}>
        <div className="home-cards-title">
          <h1 className="home-cards-title-h1">Recent jobs</h1>
          <a className="home-cards-title-link" href="/search">
            Explore more
          </a>
        </div>
        <Row justify="space-between">
          {cardsData.map((item: CardData, i: number) => (
            <Col md={6} xs={24} className="home-card-block" key={i.toString()}>
              <Card
                title={item.title}
                company={item.company}
                logo={item.logo}
                avatar={item.avatar}
                name={item.name}
                id={item.id}
              />
            </Col>
          ))}
        </Row>
      </QueueAnim>
    </div>
  );
};

const GuestHome = () => {
  const [cardData, setCardData] = React.useState<CardData[]>([]);

  const [getCardData] = useRequest(getAllJobsUsingGet, {
    onSuccess: d => {
      const cards: CardData[] = [];
      console.log(d.data);
      for (let ii = 0; ii < d.data.length; ii++) {
        cards.push({
          title: d.data[ii].jobTitle || 'Design Positions',
          company: d.data[ii].companyName || 'Microsoft',
          name: 'referer 1',
          logo: d.data[ii].companyLogo || MS_logo,
          avatar: Avatar,
          id: d.data[ii].id || 0,
        });
      }
      setCardData(cards);
    },
    onFail: e => {
      console.log(e);
    },
  });

  React.useEffect(() => {
    const fetchData = async () => {
      await getCardData({pageNum: undefined, pageSize: 3, search: undefined});
    };
    fetchData();
  }, [getCardData]);

  return (
    <div className="home-wrapper">
      <div className="home-content-wrapper">
        <Header />
        <TweenOne animation={{x: -200, type: 'from', ease: 'easeOutQuad'}}>
          <Companies />
          {RenderCards(cardData)}
        </TweenOne>
      </div>
      <Footer />
    </div>
  );
};

export default GuestHome;
