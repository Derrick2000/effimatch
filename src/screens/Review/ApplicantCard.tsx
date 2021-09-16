import React from 'react';
import {Button} from 'antd/lib';
interface ApplicationCardProps {
  jobId: number;
  applicationId: number;
  avatar: string;
  name?: string;
  description: string;
}

const ApplicantCard = (props: ApplicationCardProps) => {
  const {jobId, avatar, name, description, applicationId} = props;

  return (
    <a
      className="request-card-block-group"
      href={`/postings/${jobId}/applications/${applicationId}`}>
      <div className="request-card-info-wrapper">
        <div className="request-card-info-block">
          <img
            src={avatar}
            className="request-card-info-block-image"
            alt="avatar"
            style={{maxWidth: 65, maxHeight: 45}}
          />
          <div className="request-card-info-block-title">
            <h1>{name}</h1>
            <p>{description}</p>
          </div>
        </div>

        <div className="request-card-info-section">
          <Button type="default" className="request-card-info-section-button">
            View
          </Button>
        </div>
      </div>
    </a>
  );
};

export default ApplicantCard;
