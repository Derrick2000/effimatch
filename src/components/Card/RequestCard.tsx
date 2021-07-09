import React from 'react';
import './RequestCardStyle.less';
import {Button} from 'antd/lib';
interface requestCardData {
  logo: string;
  name: string;
  description: string;
  closable: boolean;
}

const RequestCard: React.FC<requestCardData> = (props: requestCardData) => {
  return (
    <a className="request-card-block-group" href="/#">
      <div className="request-card-info-wrapper">
        <div className="request-card-info-block">
          <img
            src={props.logo}
            className="request-card-info-block-image"
            alt="logo"
          />
          <div className="request-card-info-block-title">
            <h1>{props.name}</h1>
            <p>{props.description}</p>
          </div>
        </div>

        <div className="request-card-info-section">
          <Button type="default" className="request-card-info-section-button">
            View
          </Button>
          {props.closable ? (
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
