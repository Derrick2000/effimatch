import React from 'react';
import './RequestCardStyle.less';
import {Button} from 'antd/lib';
interface requestCardData {
  jobId?: number;
  logo: string;
  name: string;
  description: string;
  closable: boolean;
}

const RequestCard: React.FC<requestCardData> = (props: requestCardData) => {
  const {jobId, logo, name, description, closable} = props;

  return (
    <a className="request-card-block-group" href={`/jobs/${jobId}`}>
      <div className="request-card-info-wrapper">
        <div className="request-card-info-block">
          <img
            src={logo}
            className="request-card-info-block-image"
            alt="logo"
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
          {closable ? (
            <Button type="default" className="request-card-info-section-button">
              Close
            </Button>
          ) : null}
        </div>
      </div>
    </a>
  );
};

export default RequestCard;
