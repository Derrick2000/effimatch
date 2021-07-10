import React from 'react';
import './SummaryCardStyle.less';

interface summaryCardData {
  logo: string;
  numInterst: number;
  description: string;
}

const SummaryCard: React.FC<summaryCardData> = (props: summaryCardData) => {
  return (
    <div className="summary-card-block-group">
      <div className="summary-card-info-wrapper">
        <div className="summary-card-info-block">
          <img
            src={props.logo}
            className="summary-card-info-block-image"
            alt="logo"
          />
        </div>

        <div className="summary-card-info-block-title">
          <h1>{props.numInterst}</h1>
          <p>{props.description}</p>
        </div>
      </div>
    </div>
  );
};

export default SummaryCard;
