import React, {useEffect} from 'react';
import {useParams} from 'react-router-dom';
import {getApplicationDetailsByIdUsingGet} from 'apis/effimatch';
import {useRequest} from 'apis/useRequest';
import {Avatar, Divider, Skeleton, Button} from 'antd';
import parse from 'html-react-parser';
import './styles/applicationDetails.less';

const ApplicationDetails = () => {
  const {jobId, applicationId} = useParams();
  const [getApplicationDetails, applicationDetails, isLoading] = useRequest(
    getApplicationDetailsByIdUsingGet,
  );

  useEffect(() => {
    getApplicationDetails({applicationId});
  }, [applicationId]);

  return (
    <div className="application-details-wrapper">
      <div className="application-details-content">
        <a className="application-details-back" href={`/postings/${jobId}`}>
          ← Back
        </a>
        <div className="application-details-info">
          <div className="application-details-box">
            {applicationDetails?.data.avatar ? (
              <Avatar
                shape="square"
                src={applicationDetails?.data.avatar}
                size={{xs: 40, sm: 40, md: 40, lg: 64, xl: 64, xxl: 64}}
              />
            ) : (
              <Avatar
                shape="square"
                size={{xs: 40, sm: 40, md: 40, lg: 64, xl: 64, xxl: 64}}>
                {applicationDetails?.data.username![0].toUpperCase()}
              </Avatar>
            )}
            <div className="application-details-box-info">
              <h1 className="application-details-info-title">
                {isLoading ? (
                  <Skeleton.Button active size={'large'} />
                ) : (
                  applicationDetails?.data.username
                )}
              </h1>
            </div>
          </div>
          <Divider />
          <h1 className="application-details-box-note">Note</h1>
          <div className="application-details-box" style={{width: '100%'}}>
            <div>{parse(applicationDetails?.data.note ?? '')}</div>
          </div>
        </div>
        <div className="application-details-button-wrapper">
          <Button
            type="primary"
            className="card-button application-details-button-refer">
            Refer
          </Button>
          <Button
            type={'default'}
            className="card-button application-details-button-reject"
            danger>
            Reject
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ApplicationDetails;
