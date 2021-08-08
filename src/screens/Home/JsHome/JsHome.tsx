import React, {useEffect, useState} from 'react';
import TweenOne from 'rc-tween-one';
import Footer from '../../../components/Footer/Footer';
import Card from '../../../components/Card/Card';
import ApplicationCard from '../../../components/Card/ApplicationCard';
import JSHomeOnBoarding from '../../../components/JSHomeOnBoarding/JSHomeOnBoarding';
import {Row, Col} from 'antd';
import MS_logo from 'images/MS_logo.png';
import Avatar from 'images/avatar.png';
import './styles/JsHome.less';
import {useRequest} from 'apis/useRequest';
import {
  finishedTutorialUsingPost,
  getOwnInformationUsingGet,
  getAllJobsUsingGet,
  Job,
  getAllApplicationsUsingGet,
  ApplicationResponse as Application,
  GetAllApplicationsUsingGetStatus as ApplicationStatusType,
} from 'apis/effimatch';

interface applicationData {
  title: string;
  logo: string;
  name: string;
  date: string;
}

const RenderCards = (cardsData?: Job[]) => {
  return (
    <div className="home-cards-wrapper">
      <div className="home-cards-title">
        <h1 className="home-cards-title-h1">
          Positions you might be interested in
        </h1>
      </div>
      <Row justify="space-between">
        {cardsData?.map((item: Job, i: number) => (
          <Col md={6} xs={24} className="home-card-block" key={i.toString()}>
            <Card
              title={item.jobTitle}
              company={item.companyName}
              logo={MS_logo}
              avatar={Avatar}
              name={'Referrer 1'}
              id={item.id}
            />
          </Col>
        ))}
      </Row>
    </div>
  );
};

const RenderApplicationCards = (cardsData?: Application[]) => {
  return (
    <div className="application-cards-wrapper">
      <Row justify="space-between" gutter={[16, 16]}>
        {cardsData?.map((item: Application, i: number) => (
          <Col md={12} xs={24} className="home-card-block" key={i.toString()}>
            <ApplicationCard
              title={item.companyName}
              logo={MS_logo}
              name={item.companyName}
              date={item.createdAt}
            />
          </Col>
        ))}
      </Row>
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

  const [finishTutorial] = useRequest(finishedTutorialUsingPost);
  const [getOwnInformation, userInfo] = useRequest(getOwnInformationUsingGet);

  const [getPositionsDataAndOwnInformation, positionsData] = useRequest(
    getAllJobsUsingGet,
    {
      onSuccess: () => {
        getOwnInformation(undefined);
      },
    },
  );

  const [getApplicationsByStatus] = useRequest(getAllApplicationsUsingGet, {
    onSuccess: res => {
      setAllApplicationData(data => ({
        ...data,
        [applicationStatus]: res.data,
      }));
    },
  });

  useEffect(() => {
    getPositionsDataAndOwnInformation({pageSize: 3});
  }, []);

  useEffect(() => {
    if (allApplicationData[applicationStatus].length === 0) {
      getApplicationsByStatus({status: applicationStatus});
    }
  }, [applicationStatus]);

  const handleOnBoardingClose = () => {
    finishTutorial(null);
  };

  return (
    <div className="JsHome-wrapper">
      <div className="home-content-wrapper">
        <TweenOne animation={{x: -200, type: 'from', ease: 'easeOutQuad'}}>
          {RenderCards(positionsData?.data)}

          <div className="home-cards-title">
            <h1 className="home-cards-title-h1">Your Applications</h1>
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
      {userInfo?.data.finishedTutorial ? null : (
        <JSHomeOnBoarding handleClose={handleOnBoardingClose} />
      )}
    </div>
  );
};

export default JsHome;
