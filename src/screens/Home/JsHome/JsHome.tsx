import React, {useEffect, useState} from 'react';
import TweenOne from 'rc-tween-one';
import Footer from '../../../components/Footer/Footer';
import Card from '../../../components/Card/Card';
import ApplicationCard from '../../../components/Card/ApplicationCard';
import JSHomeOnBoarding from '../../../components/JSHomeOnBoarding/JSHomeOnBoarding';
import {Row, Col, Empty} from 'antd';
import MS_logo from 'images/MS_logo.png';
import Avatar from 'images/avatar.png';
import LoadCard from 'components/LoadCard/LoadCard';
import './styles/JsHome.less';
import {useRequest} from 'apis/useRequest';
import {
  getAllJobsUsingGet,
  JobCardResponse,
  getAllApplicationsUsingGet,
  ApplicationResponse as Application,
  GetAllApplicationsUsingGetStatus as ApplicationStatusType,
} from 'apis/effimatch';

const RenderCards = (cardsData?: JobCardResponse[]) => {
  return (
    <div className="jsHome-cards-wrapper">
      <div className="jsHome-cards-title">
        <h1 className="jsHome-cards-title-h1">
          Positions you might be interested in
        </h1>
      </div>
      <Row justify="space-between">
        {cardsData
          ? cardsData?.map((item: JobCardResponse, i: number) => (
              <Col
                md={6}
                xs={24}
                className="jsHome-card-block"
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
              <Col md={6} xs={24} className="jsHome-card-block" key={ii}>
                <LoadCard key={ii} />
              </Col>
            ))}
      </Row>
    </div>
  );
};

const RenderApplicationCards = (cardsData?: Application[]) => {
  return cardsData?.length !== 0 ? (
    <div className="application-cards-wrapper">
      <Row justify="space-between" gutter={[16, 16]}>
        {cardsData?.map((item: Application, i: number) => (
          <Col md={12} xs={24} className="jsHome-card-block" key={i.toString()}>
            <ApplicationCard
              id={item.jobId}
              title={item.jobTitle}
              logo={item.companyLogo ?? MS_logo}
              name={item.companyName}
              date={item.createdAt}
            />
          </Col>
        ))}
      </Row>
    </div>
  ) : (
    <div className="application-cards-empty">
      <Empty />
    </div>
  );
};

const JsHome = () => {
  const [
    applicationStatus,
    setApplicationStatus,
  ] = React.useState<ApplicationStatusType>(ApplicationStatusType.SENT);
  const [allApplicationData, setAllApplicationData] = useState({
    [ApplicationStatusType.SENT]: [],
    [ApplicationStatusType.ACCEPTED]: [],
    [ApplicationStatusType.CLOSED]: [],
  });

  const [getPositionsData, positionsData] = useRequest(getAllJobsUsingGet);

  const [getApplicationsByStatus] = useRequest(getAllApplicationsUsingGet, {
    onSuccess: res => {
      setAllApplicationData(data => ({
        ...data,
        [applicationStatus]: res.data,
      }));
    },
  });

  useEffect(() => {
    getPositionsData({limit: 3});
  }, []);

  useEffect(() => {
    if (allApplicationData[applicationStatus].length === 0) {
      getApplicationsByStatus({status: applicationStatus});
    }
  }, [applicationStatus]);

  return (
    <div className="JsHome-wrapper">
      <div className="jsHome-content-wrapper">
        <TweenOne animation={{x: -200, type: 'from', ease: 'easeOutQuad'}}>
          {RenderCards(positionsData?.data)}

          <div className="jsHome-cards-title">
            <h1 className="jsHome-cards-title-h1">Your Applications</h1>
          </div>
          <div className="application-button-row">
            <Row justify="start">
              <Col>
                <div
                  className="application-button"
                  style={{
                    textDecoration:
                      applicationStatus === 'SENT' ? 'underline' : 'none',
                  }}
                  onClick={() => {
                    setApplicationStatus(ApplicationStatusType.SENT);
                  }}>
                  Sent
                </div>
              </Col>

              <Col>
                <div
                  className="application-button"
                  style={{
                    textDecoration:
                      applicationStatus === 'ACCEPTED' ? 'underline' : 'none',
                  }}
                  onClick={() => {
                    setApplicationStatus(ApplicationStatusType.ACCEPTED);
                  }}>
                  Accepted
                </div>
              </Col>

              <Col>
                <div
                  className="application-button"
                  style={{
                    textDecoration:
                      applicationStatus === 'CLOSED' ? 'underline' : 'none',
                  }}
                  onClick={() => {
                    setApplicationStatus(ApplicationStatusType.CLOSED);
                  }}>
                  Closed
                </div>
              </Col>
            </Row>
          </div>
          {RenderApplicationCards(allApplicationData[applicationStatus])}
        </TweenOne>
      </div>
      <Footer />
      <JSHomeOnBoarding />
    </div>
  );
};

export default JsHome;
