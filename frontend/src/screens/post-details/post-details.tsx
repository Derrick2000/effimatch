import React from 'react';
import './styles/post-details-Style.less'
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



interface PostDetailData {
    jobTitle: string,
    location: string,
    gradYear: string,
    minQualification: string,
    preferQualification: string
}




const RenderDetailSection: React.FC<PostDetailData> = (postInfo: PostDetailData) => {
    return (

                <div>
                    <h1 className='title-header'>{postInfo.jobTitle}</h1>
                    <p className='title-description'>{postInfo.location} | {postInfo.gradYear} Grad</p>
                    <h3>Minimum qualifications:</h3>
                    <p className='title-description'>{postInfo.minQualification}</p>
                    <h3>Preferred qualifications:</h3>
                    <p>{postInfo.preferQualification}</p>
                </div>


    )
}



const useViewport = () => {
  const [width, setWidth] = React.useState(window.innerWidth);

  React.useEffect(() => {
    const handleWindowResize = () => setWidth(window.innerWidth);
    window.addEventListener("resize", handleWindowResize);
    return () => window.removeEventListener("resize", handleWindowResize);
  }, []);

  // Return the width so we can use it in our components
  return { width };
}

const MyComponent: React.FC<any> = () => {
 const { width } = useViewport();
 const breakpoint = 900;

 return width < breakpoint ? <SideSmallScreen /> : <SideFullScreen />;
}

const SideFullScreen: React.FC<any> = () => {
    return (
      <div className="side">
      <Card
        className="side-card"
        style={{ width: '37%',height: '15%', float:"right"}}
        cover={<img alt="avatar" src={icon} style={{borderRadius: "50px", width:'140px'}}/>}
        bordered={false}
        hoverable={false}
        bodyStyle={{padding: '0 10'}}
      >
        <Button type='primary' className="sideButton primaryButton" style={{borderRadius: '10px',width: '140px'}}>Get Refered</Button>
      </Card>
      </div>
    )
}

const SideSmallScreen: React.FC<any> = () => {
    return (
      <div className="side">
      <Card
        className="side-card"
        style={{ width: '37%',height: '15%', float:"left",paddingLeft:'15px'}}
        cover={<img alt="avatar" src={icon} style={{borderRadius: "50px", width:'140px'}}/>}
        bordered={false}
        hoverable={false}
        bodyStyle={{padding: '0 10'}}
      >
        <Button type='primary' className="sideButton primaryButton" style={{borderRadius: '10px',width: '140px'}}>Get Refered</Button>
        <Button className="sideButton" style={{borderRadius: '10px',width: '140px'}}>View my Linkedin</Button>
      </Card>
      </div>
    )
}



const Referers: React.FC<any> = (props) => {
  return (
      <div className='pagewrapper'>

              <TweenOne
                  animation={{ x: -200, type: 'from', ease: 'easeOutQuad' }}
              >


                  <MyComponent/>
                  <div className='main'>
                    {RenderDetailSection(dummy)}
                  </div>

              </TweenOne>
      </div>

  )
}

const dummy:PostDetailData = {
  jobTitle: "Software Development Engineer",
  location: "San Francisco",
  gradYear: "2021",
  minQualification: "Bachelor's degree in Computer Science, related technical field or equivalent practical experience.\nExperience in computer science, data structures, algorithms and software design.\nExperience in Software Development and coding in a general purpose programming language.",
  preferQualification: "Extensive experience programming in C, C++, Java and/or Python.\nExperience with UNIX/Linux or Windows environments, distributed systems, machine learning, information retrieval and TCP/IP."
}






export default Referers;
