import React from 'react';
import './ApplicationCardStyle.less';
import moment from 'moment';

interface applicationData {
  id?: string;
  title?: string;
  logo?: string;
  name?: string;
  date?: string;
}

const ApplicationCard = (props: applicationData) => {
  const {id, title, logo, name, date} = props;

  return (
    <a className="appcard-block-group" href={`/jobs/${id}`}>
      <div className="appcard-info-wrapper">
        <div className="appcard-info-block">
          <img
            src={logo}
            className="appcard-info-block-image"
            alt="logo"
            style={{maxWidth: 60, maxHeight: 40}}
          />
          <div className="appcard-info-block-title">
            <h1>{title}</h1>
            <p>{`@ ${name}`}</p>
          </div>
        </div>

        <p className="appcard-info-date">
          {moment(date).format('DD MMM, YYYY')}
        </p>
      </div>
    </a>
  );
};

export default ApplicationCard;
