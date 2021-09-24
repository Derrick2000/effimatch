import React from 'react';

// screens and componets
import Header from './Header';
import TweenOne from 'rc-tween-one';
import Footer from 'components/Footer/Footer';
import Companies from './Companies';
import Card from 'components/Card/Card';
import {useRequest} from 'apis/useRequest';
import {getAllJobsUsingGet, JobCardResponse} from 'apis/effimatch';
import LoadCard from 'components/LoadCard/LoadCard';

// antd
import QueueAnim from 'rc-queue-anim';
import {Row, Col} from 'antd';

// assets (temp)
import MS_logo from 'images/MS_logo.png';

import '../styles/home.less';

const RenderCards = (cardsData?: JobCardResponse[]) => {
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
          {cardsData
            ? cardsData?.map((item: JobCardResponse, i: number) => (
                <Col
                  md={6}
                  xs={24}
                  className="home-card-block"
                  key={i.toString()}>
                  <Card
                    title={item.jobTitle}
                    company={item.companyName}
                    logo={item.companyLogo ?? MS_logo}
                    avatar={item.avatar}
                    name={item.username ?? 'Referrer name'}
                    id={item.id}
                    applied={item.applicationStatus !== null ? true : false}
                  />
                </Col>
              ))
            : [1, 2, 3].map(ii => (
                <Col md={6} xs={24} className="home-card-block" key={ii}>
                  <LoadCard key={ii} />
                </Col>
              ))}
        </Row>
      </QueueAnim>
    </div>
  );
};

const GuestHome = () => {
  const [getCardData, cardData] = useRequest(getAllJobsUsingGet);

  React.useEffect(() => {
    const fetchData = async () => {
      await getCardData({limit: 3});
    };
    fetchData();
  }, [getCardData]);

  return (
    <div className="home-wrapper">
      <div className="home-content-wrapper">
        <Header />
        <TweenOne animation={{x: -200, type: 'from', ease: 'easeOutQuad'}}>
          <Companies />
          {RenderCards(cardData?.data)}
        </TweenOne>
      </div>
      <Footer />
    </div>
  );
};

export default GuestHome;
