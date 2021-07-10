import React from 'react';

// screens and components
import RequestCard from 'components/Card/RequestCard';
import SummaryCard from 'components/Card/SummaryCard';

// antd
import {Button, Card} from 'antd';

// assets
import {ReactComponent as FacebookLogo} from 'images/facebook_logo.svg';
import Caldendar from 'images/calendar.png';
import Check from 'images/check.png';
import Person_logo from 'images/person.png';

// style
import './styles/review.less';

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

const dummuRequestCardData: requestCardData[] = [];
for (let ii = 0; ii < 2; ii++) {
  dummuRequestCardData.push({
    logo: Person_logo,
    name: 'First Name',
    description: "UCSD 23' CS",
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

const RenderRequestCards: React.FC<requestSectionData[]> = (
  sectionData: requestSectionData[],
) => {
  return (
    <Card className="review-content-cards">
      {sectionData[0].requests.map((item: requestCardData, i: number) => (
        <Card.Grid
          className="review-content-cards-card"
          key={i.toString()}
          style={{width: '100%'}}>
          <RequestCard
            logo={item.logo}
            name={item.name}
            description={item.description}
            closable={false}
          />
        </Card.Grid>
      ))}
    </Card>
  );
};

const Review = () => {
  return (
    <div className="review-wrapper">
      <div className="review-wrapper-content">
        <div className="review-title">
          <div>
            <FacebookLogo className="review-title-logo" />
            <p className="review-title-content">Software Developer</p>
          </div>

          <div>
            <Button type="primary" className="review-title-linkBut">
              Link to job post
            </Button>
            <a className="review-title-closeBut">Close</a>
          </div>
        </div>

        <div className="review-content">
          <div className="review-content-wrapper">
            <p className="review-content-title">About</p>
            <div className="review-content-about">
              <p>
                Amet minim mollit non deserunt ullamco est sit aliqua dolor do
                amet sint. Velit officia consequat duis enim velit mollit.
                Exercitation veniam consequat sunt nostrud amet.
              </p>
            </div>
            <p className="review-content-interst">Interested</p>
            {RenderRequestCards(dummuRequestSectionData)}
          </div>

          <div className="review-summary">
            <p>Summary</p>
            <div className="review-summary-box">
              <div className="review-summary-box-interest">
                <SummaryCard
                  logo={Caldendar}
                  numInterst={10}
                  description={'Interested'}
                />
              </div>
              <div className="review-summary-box-refer">
                <SummaryCard
                  logo={Check}
                  numInterst={1}
                  description={'Referred'}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Review;
