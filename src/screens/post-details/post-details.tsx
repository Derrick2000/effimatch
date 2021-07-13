import React from 'react';
import './styles/post-details-Style.less';
// screens and componets
import TweenOne from 'rc-tween-one';

// antd
import {Button, Card} from 'antd';

// material ui
import Grid from '@material-ui/core/Grid';

// assets (temp)
import icon from 'images/avatar.png';

interface PostDetailData {
  jobTitle: string;
  location: string;
  gradYear: string;
  minQualification: string;
  preferQualification: string;
}

const RenderDetailSection: React.FC<PostDetailData> = (
  postInfo: PostDetailData,
) => (
  <div>
    <h1 className="post-details-title-header">{postInfo.jobTitle}</h1>
    <p className="post-details-title-description">
      {postInfo.location} | {postInfo.gradYear} Grad
    </p>
    <h3>Minimum qualifications:</h3>
    <p className="post-details-title-description">
      {postInfo.minQualification}
    </p>
    <h3>Preferred qualifications:</h3>
    <p>{postInfo.preferQualification}</p>
  </div>
);

const AvatarAndButtons = () => (
  <div className="post-details-side">
    <Card
      className="post-details-side-card"
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
      className="post-details-side-button post-details-primary-button"
      style={{borderRadius: '10px', width: '140px'}}>
      Get Referred
    </Button>
    <br />
    <Button
      className="post-details-side-button"
      style={{borderRadius: '10px', width: '140px'}}>
      View my Linkedin
    </Button>
  </div>
);

const Referers = () => (
  <div className="post-details-pagewrapper">
    <div className="post-details-content-wrapper">
      <TweenOne animation={{x: -200, type: 'from', ease: 'easeOutQuad'}}>
        <Grid container>
          <Grid item md={4} className="post-details-side-wrapper">
            <AvatarAndButtons />
          </Grid>

          <Grid item md={8} className="post-details-main-wrapper">
            <div>{RenderDetailSection(dummy)}</div>
          </Grid>
        </Grid>
      </TweenOne>
    </div>
  </div>
);

const dummy: PostDetailData = {
  jobTitle: 'Software Development Engineer',
  location: 'San Francisco',
  gradYear: '2021',
  minQualification:
    "Bachelor's degree in Computer Science, related technical field or equivalent practical experience.\nExperience in computer science, data structures, algorithms and software design.\nExperience in Software Development and coding in a general purpose programming language.",
  preferQualification:
    'Extensive experience programming in C, C++, Java and/or Python.\nExperience with UNIX/Linux or Windows environments, distributed systems, machine learning, information retrieval and TCP/IP.',
};

export default Referers;
