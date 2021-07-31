import {Button, Card} from 'antd';
import RequestCard from 'components/Card/RequestCard';
import Footer from 'components/Footer/Footer';
import MS_logo from 'images/MS_logo.png';
import TweenOne from 'rc-tween-one';
import React from 'react';
import './styles/RHome.less';

interface requestCardData {
  logo: string;
  name: string;
  description: string;
}

interface requestSectionData {
  title: string;
  company: string;
  requests: requestCardData[];
}

const RenderRequestCards: React.FC<requestSectionData[]> = (
  sectionData: requestSectionData[],
) => {
  return (
    // Edited by William. 这样视觉效果更好
    <Card className="RHome-Signed-In-application-section">
      {sectionData[0].requests.map((item: requestCardData, i: number) => (
        <Card.Grid
          className="RHome-Signed-In-application-section-card"
          key={i.toString()}
          style={{width: '100%', height: '100%'}}>
          <RequestCard
            logo={item.logo}
            name={item.name}
            description={item.description}
            closable={true}
          />
        </Card.Grid>
      ))}
    </Card>
  );
};

const RHomeSignedIn = () => {
  return (
    <div className="RHome-Signed-In-all-wrapper">
      <div className="RHome-Signed-In-content-wrapper">
        <TweenOne animation={{x: -200, type: 'from', ease: 'easeOutQuad'}}>
          <div className="RHome-Signed-In-cards-title">
            <h1 className="RHome-Signed-In-cards-title-h1">Opportunities</h1>
            <Button
              type="primary"
              onClick={() => {
                window.location.href = '/new-job';
              }}
              className="RHome-Signed-In-cards-title-button">
              Post Opportunity
            </Button>
          </div>

          {RenderRequestCards(dummuRequestSectionData)}
        </TweenOne>
      </div>
      <Footer />
    </div>
  );
};

// interface applicationData {
//     title: string,
//     avatar: string,
//     logo: string,
//     name: string,
//     date: string
// }

// dummy data for sent:
const dummuRequestCardData: requestCardData[] = [];
for (let ii = 0; ii < 2; ii++) {
  dummuRequestCardData.push({
    logo: MS_logo,
    name: 'Software Developer',
    description: 'Open now',
  });
}

const dummuRequestSectionData: requestSectionData[] = [];
for (let ii = 0; ii < 1; ii++) {
  dummuRequestSectionData.push({
    company: 'Microsoft',
    title: 'Software Engineer',
    requests: dummuRequestCardData,
  });
}

export default RHomeSignedIn;
