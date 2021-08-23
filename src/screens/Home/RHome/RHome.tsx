import {Button, Card} from 'antd';
import RequestCard from 'components/Card/RequestCard';
import Footer from 'components/Footer/Footer';
import MS_logo from 'images/MS_logo.png';
import TweenOne from 'rc-tween-one';
import React, {useEffect} from 'react';
import {getOwnJobsUsingGet, JobCardResponse} from 'apis/effimatch';
import { useRequest } from 'apis/useRequest';
import './styles/RHome.less';

interface requestCardData {
  logo: string;
  name: string;
  description: string;
}

const RenderRequestCards = (jobs?: JobCardResponse[]) => {
  return (
    <Card className="RHome-Signed-In-application-section">
      {jobs?.map((item: JobCardResponse, i: number) => (
        <Card.Grid
          className="RHome-Signed-In-application-section-card"
          key={i.toString()}
          style={{width: '100%', height: '100%'}}>
          <RequestCard
            jobId={item.id}
            logo={item.company_logo ?? MS_logo}
            name={item.company_name ?? 'Company Name'}
            description={'Open now'}
            closable={true}
          />
        </Card.Grid>
      ))}
    </Card>
  );
};

const RHomeSignedIn = () => {

  const [getOwnJobs, ownJobsData] = useRequest(getOwnJobsUsingGet);

  useEffect(() => {
    getOwnJobs(undefined);
  }, []);

  return (
    <div className="RHome-Signed-In-all-wrapper">
      <div className="RHome-Signed-In-content-wrapper">
        <TweenOne animation={{x: -200, type: 'from', ease: 'easeOutQuad'}}>
          <div className="RHome-Signed-In-cards-title">
            <h1 className="RHome-Signed-In-cards-title-h1">My Postings</h1>
            <Button
              type="primary"
              onClick={() => {
                window.location.href = '/new-job';
              }}
              className="RHome-Signed-In-cards-title-button">
              Post New Opportunity
            </Button>
          </div>

          {RenderRequestCards(ownJobsData?.data)}
        </TweenOne>
      </div>
      <Footer />
    </div>
  );
};

// dummy data for sent:
const dummuRequestCardData: requestCardData[] = [];
for (let ii = 0; ii < 2; ii++) {
  dummuRequestCardData.push({
    logo: MS_logo,
    name: 'Software Developer',
    description: 'Open now',
  });
}


export default RHomeSignedIn;
