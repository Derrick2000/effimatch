import React from 'react';
import './styles/ReferersStyle.less'
// screens and componets
import TweenOne from 'rc-tween-one';
import ReferSectionCard from '../../components/Card/ReferSectionCard';

// antd
import QueueAnim from 'rc-queue-anim';
import {Row, Col, Button, Divider, Comment, Avatar, Card} from 'antd';

// assets (temp)
import MS_logo from '../../images/MS_logo.png';
import icon from '../../images/avatar.png';


interface Props {}

interface ReferPositionData {
    jobTitle: string,
    localtion: string,
    graduationDate: string,
    postDate: string
}

interface ReferSectionData {
    sectionTitle: string,
    jobs: ReferPositionData[]
}

interface ReferCommentData {
    name: string,
    icon: string,
    date: string,
    content: string
}

const RenderReferSection: React.FC<ReferSectionData[]> = (allSectionData: ReferSectionData[]) => {
    return (
        <div className=''>

                <Col>
                    <Row><h1 className=''>Hi, I'm Jake Rotmil</h1></Row>
                    <Row><p>I work at Google as a data scientist</p></Row>
                    <Row><h1 className=''>I can refer</h1></Row>
                </Col>


                {allSectionData.map((section: ReferSectionData, i: number) => (
                  <Col md={8} xs={24} className='' key={i.toString()}>
                    <ReferSectionCard
                    sectionTitle={section.sectionTitle}
                    jobs={section.jobs}
                    />
                  </Col>
                ))}

        </div>
    )
}

const RenderCommentSection: React.FC<ReferCommentData> = (commentData: ReferCommentData) => {
    return (
        <div className=''>

                <div className=''>
                    <p className='reviewTitle'>Reviews from other job seekers</p>
                    <Button>Add a Review</Button>
                </div>
                <Comment
                  author={commentData.name}
                  avatar={
                    <Avatar
                        src={commentData.icon}
                        alt={commentData.name}
                    />
                  }
                  content={
                    <p>{commentData.content}</p>
                  }
                  datetime={
                    <p>{commentData.date}</p>
                  }
                />
        </div>
    )
}



const Referers: React.FC<any> = (props) => {
  return (
      <div className='pagewrapper'>

              <TweenOne
                  animation={{ x: -200, type: 'from', ease: 'easeOutQuad' }}
              >

                  <div className="side">
                  <Card
                    className="side-card"
                    hoverable
                    style={{ width: '37%',height: '15%', float:"right"}}
                    cover={<img alt="avatar" src={icon} style={{borderRadius: "50px"}}/>}
                    bordered={false}
                    bodyStyle={{padding: '0 10'}}
                  >
                    <Button className="sideButton" style={{borderRadius: '10px',width: '100%'}}>Get Refered</Button>
                    <Button className="sideButton" style={{borderRadius: '10px',width: '100%'}}>View my Linkedin</Button>
                  </Card>
                  </div>

                  <div className='main'>
                    {RenderReferSection(sectionData)}
                    {RenderCommentSection(CommentData)}
                  </div>

              </TweenOne>
      </div>

  )
}



// dummy data for "get referral cards"
const referDSData: ReferPositionData[] = [];
for (let iii = 0; iii < 3; iii++) {
    referDSData.push(
        {
          jobTitle: "Data Scientist",
          localtion: "San Diego",
          graduationDate: "2021 Grad",
          postDate: "Jan 28,2021"
        }
    )
}

const referEData: ReferPositionData[] = [];
for (let iii = 0; iii < 3; iii++) {
    referEData.push(
        {
          jobTitle: "Software Development Engineer",
          localtion: "San Diego",
          graduationDate: "2021 Grad",
          postDate: "Jan 28,2021"
        }
    )
}


const sectionData: ReferSectionData[] = [];
sectionData.push(
    {
      sectionTitle: "Data Science",
      jobs: referDSData
    }
)

sectionData.push(
    {
      sectionTitle: "Engineering",
      jobs: referEData
    }
)



const CommentData: ReferCommentData = {
  name: "Alex",
  icon: icon,
  date: "Nov 27 2020",
  content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. "
};






export default Referers;
