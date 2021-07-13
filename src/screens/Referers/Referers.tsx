import React from 'react';
import './styles/ReferersStyle.less';
// screens and componets
import TweenOne from 'rc-tween-one';
import ReferSectionCard from '../../components/Card/ReferSectionCard';

// antd
import {Col, Button, Comment, Avatar, Card} from 'antd';

// assets (temp)
import icon from 'images/avatar.png';

import Grid from '@material-ui/core/Grid';

interface ReferPositionData {
  jobTitle: string;
  localtion: string;
  graduationDate: string;
  postDate: string;
}

interface ReferSectionData {
  sectionTitle: string;
  jobs: ReferPositionData[];
}

interface ReferCommentData {
  name: string;
  icon: string;
  date: string;
  content: string;
}

const RenderReferSection: React.FC<ReferSectionData[]> = (
  allSectionData: ReferSectionData[],
) => {
  return (
    <div className="">
      <div>
        <h1>Hi, I'm Jake Rotmil</h1>
        <h3 className="referers-title-description">
          I work at <span className="referers-header-bold">Google</span> as a{' '}
          <span className="referer-header-bold">data scientist</span>
        </h3>
        <h1>I can refer:</h1>
      </div>

      {allSectionData.map((section: ReferSectionData, i: number) => (
        <Col md={8} xs={24} className="" key={i.toString()}>
          <ReferSectionCard
            sectionTitle={section.sectionTitle}
            jobs={section.jobs}
          />
        </Col>
      ))}
    </div>
  );
};

const RenderCommentSection: React.FC<ReferCommentData> = (
  commentData: ReferCommentData,
) => {
  return (
    <div className="referers-comment-wrapper">
      <div className="referers-review-header">
        <p className="reviewTitle">Reviews from other job seekers</p>
        <Button
          type="primary"
          className="referers-primary-button"
          style={{borderRadius: '10px'}}>
          Add a Review
        </Button>
      </div>
      <Comment
        author={commentData.name}
        avatar={<Avatar src={commentData.icon} alt={commentData.name} />}
        content={<p>{commentData.content}</p>}
        datetime={<p>{commentData.date}</p>}
      />
    </div>
  );
};

const AvatarAndButtons: React.FC<any> = () => (
  <div className="referers-side">
    <Card
      className="referers-side-card"
      cover={
        <img
          alt="avatar"
          src={icon}
          style={{borderRadius: '50px', width: '140px'}}
        />
      }
      bordered={false}
      hoverable={false}
      bodyStyle={{padding: '0 10'}}
    />

    <Button
      type="primary"
      className="referers-side-button referers-primary-button"
      style={{borderRadius: '10px', width: '140px'}}>
      Get Referred
    </Button>
    <br />
    <Button
      className="referers-side-button"
      style={{borderRadius: '10px', width: '140px'}}>
      View my Linkedin
    </Button>
  </div>
);

const Referers: React.FC<any> = () => {
  return (
    <div className="post-details-pagewrapper">
      <TweenOne animation={{x: -200, type: 'from', ease: 'easeOutQuad'}}>
        <Grid container>
          <Grid item md={4} className="referers-side-wrapper">
            <AvatarAndButtons />
          </Grid>

          <Grid item md={8}>
            <div className='className="post-details-main-wrapper"'>
              {RenderReferSection(sectionData)}
              {RenderCommentSection(CommentData)}
            </div>
          </Grid>
        </Grid>
      </TweenOne>
    </div>
  );
};

// dummy data for "get referral cards"
const referDSData: ReferPositionData[] = [];
for (let iii = 0; iii < 3; iii++) {
  referDSData.push({
    jobTitle: 'Data Scientist',
    localtion: 'San Diego',
    graduationDate: '2021 Grad',
    postDate: 'Jan 28,2021',
  });
}

const referEData: ReferPositionData[] = [];
for (let iii = 0; iii < 3; iii++) {
  referEData.push({
    jobTitle: 'Software Development Engineer',
    localtion: 'San Diego',
    graduationDate: '2021 Grad',
    postDate: 'Jan 28,2021',
  });
}

const sectionData: ReferSectionData[] = [];
sectionData.push({
  sectionTitle: 'Data Science',
  jobs: referDSData,
});

sectionData.push({
  sectionTitle: 'Engineering',
  jobs: referEData,
});

const CommentData: ReferCommentData = {
  name: 'Alex',
  icon: icon,
  date: 'Nov 27 2020',
  content:
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. ',
};

export default Referers;
