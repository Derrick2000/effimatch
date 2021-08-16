import React from 'react';

// assets
import logo from 'images/temp_icon.png';

// style
import './styles/reviewDetails.less';

const ReviewDetails = () => {
  return (
    <div className="reviewdetails-wrapper">
      <div className="reviewdetails-content">
        <a className="reviewdetails-back" href="/jobs">
          Back
        </a>
        <div className="reviewdetails-info">
          <div className="reviewdetails-box">
            <img src={logo} className="reviewdetails-box-icon" alt="logo" />
            <div className="reviewdetails-box-info">
              <h1 className="reviewdetails-info-title">Name</h1>
              <p className="reviewdetails-info-description">UCSD 23' | CS</p>
            </div>
          </div>
          <h1 className="reviewdetails-box-exp">Experience</h1>
          <div className="reviewdetails-box">
            <img src={logo} className="reviewdetails-box-icon" alt="logo" />
            <div className="reviewdetails-box-info">
              <h1>XXX Inc.</h1>
              <p>
                Nulla Lorem mollit cupidatat irure. Laborum magna nulla duis
                ullamco cillum dolor. Voluptate exercitation incididunt aliquip
                deserunt reprehenderit elit laborum. Aliqua id fugiat nostrud
                irure ex duis ea quis id quis ad et. Sunt qui esse pariatur duis
                deserunt mollit dolore cillum minim tempor enim. Elit aute irure
                tempor cupidatat incididunt sint deserunt ut voluptate aute id
                deserunt nisi.
              </p>
            </div>
          </div>
          <div className="reviewdetails-box">
            <img src={logo} className="reviewdetails-box-icon" alt="logo" />
            <div className="reviewdetails-box-info">
              <h1>XXX</h1>
              <p>Description</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReviewDetails;
