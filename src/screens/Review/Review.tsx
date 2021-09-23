import React, {useEffect} from 'react';
import {useParams} from 'react-router-dom';

// screens and components
import SummaryCard from 'components/Card/SummaryCard';
import {useRequest} from 'apis/useRequest';
import {
  getJobByIdUsingGet,
  getInterestedUsersCountUsingGet,
  getAcceptedApplicationsCountUsingGet,
  getApplicantCardsUsingGet,
  ApplicantCardResponse,
} from 'apis/effimatch';
import ApplicantCard from './ApplicantCard';

// antd
import {Button, Card} from 'antd';

// assets
import icon from 'images/avatar.png';
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

const RenderRequestCards = (
  sectionData: ApplicantCardResponse[],
  jobId: number,
) => {
  return (
    <Card className="review-content-cards">
      {sectionData?.map((item: ApplicantCardResponse) => (
        <Card.Grid
          className="review-content-cards-card"
          key={item.applicationId}
          style={{width: '100%'}}>
          <ApplicantCard
            jobId={jobId}
            applicationId={item.applicationId!}
            avatar={item.avatar ?? Person_logo}
            name={item.username}
            description={''}
          />
        </Card.Grid>
      ))}
    </Card>
  );
};

const Review = () => {
  const {id} = useParams();
  const [getJob, job] = useRequest(getJobByIdUsingGet);
  const [getNumUsers, numUsers] = useRequest(getInterestedUsersCountUsingGet);
  const [getNumReferred, numReferred] = useRequest(
    getAcceptedApplicationsCountUsingGet,
  );
  const [getApplicationCards, applicationCards] = useRequest(
    getApplicantCardsUsingGet,
  );

  useEffect(() => {
    const fetchData = async () => {
      getJob({id: id});
      getNumUsers({jobId: id});
      getNumReferred({jobId: id});
      getApplicationCards({jobId: id});
    };
    fetchData();
  }, []);

  const toJob = () => {
    window.location.href = '/jobs/' + id;
  };

  return (
    <div className="review-wrapper">
      <div className="review-wrapper-content">
        <div className="review-title">
          <div>
            <img
              alt="avatar"
              src={job?.data.companyLogo ?? icon}
              className="review-title-logo"
            />
            <p className="review-title-content">{job?.data.jobTitle ?? ''}</p>
          </div>

          <div>
            <Button
              type="primary"
              className="review-title-linkBut"
              onClick={toJob}>
              Job Details
            </Button>
            <a className="review-title-closeBut">Close</a>
          </div>
        </div>

        <div className="review-content">
          <div className="review-content-wrapper">
            <p className="review-content-title">Interested</p>
            {RenderRequestCards(applicationCards?.data ?? [], id)}
          </div>

          <div className="review-summary">
            <p>Summary</p>
            <div className="review-summary-box">
              <div className="review-summary-box-interest">
                <SummaryCard
                  logo={Caldendar}
                  numInterst={numUsers?.data ?? 0}
                  description={'Interested'}
                />
              </div>
              <div className="review-summary-box-refer">
                <SummaryCard
                  logo={Check}
                  numInterst={numReferred?.data ?? 0}
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
