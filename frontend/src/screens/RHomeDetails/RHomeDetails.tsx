// TODO: 根据要求完成这个page
// 你应该会需要用到 components 里面的 Card
import React from 'react';

// screens and componets
import TweenOne from 'rc-tween-one';
import Footer from '../../components/Footer/Footer';
import Card from '../../components/Card/Card';
import RequestCard from '../../components/Card/RequestCard';
// antd
import QueueAnim from 'rc-queue-anim';
import {Row, Col, Button,Divider,Modal} from 'antd';

// material ui
import Grid from '@material-ui/core/Grid';

// assets (temp)
import MS_logo from '../../images/MS_logo.png';
import Avatar from '../../images/avatar.png';

import './styles/RHomeDetailsStyles.less';

interface Props {

}

interface jobDetails {
    company: string,
    logo: string,
    description: string,
    title:string
}

interface requestCardData {
    logo: string,
    name: string,
    description: string
}

const RenderJobDetails: React.FC<jobDetails> = (job:jobDetails) => {
    return (
        <div className='RHomeDetails-job-wrapper'>

                <div className='RHomeDetails-job-title'>
                    <h1 className='RHomeDetails-job-title-h1'>{job.title}</h1>
                </div>


            <Grid container>
                <Grid item md={2}  > 
                    <div className="RHomeDetails-imageblock">
                        <img src={job.logo} className='RHomeDetails-imageblock-image'/>
                        <h2 className='RHomeDetails-imageblock-company'>{job.company}</h2>
                    </div>
                </Grid>
            
            <Grid item md={10} className="post-details-main-wrapper">
                <h1>Descriptions:</h1>
                <p>{job.description}</p>
              
            </Grid>
          </Grid>

        </div>
    )
}

const RenderRequestCards: React.FC<requestCardData[]> = (requestData: requestCardData[]) => {
    return (
        <div className='RHomeDetails-application'>

                <Row justify='space-between' className='RHomeDetails-application-section' gutter={[10,10]}>
                <h2 className='RHomeDetails-application-section-title' >Candidates ({requestData.length})</h2>
                {requestData.map((item: requestCardData, i: number) => (
                    <Col md={24} xs={24} className='RHomeDetails-card-block' key={i.toString()}>
                        <RequestCard
                            logo={item.logo}
                            name={item.name}
                            description={item.description}
                        />
                    </Col>
                ))}
            </Row>

        </div>
    )
}



const RHomeSignedIn: React.FC<Props> = (props: Props) => {

    return (

        <div className='RHomeDetails-all-wrapper'>
            <div className='RHomeDetails-content-wrapper'>

                <TweenOne
                    animation={{ x: -200, type: 'from', ease: 'easeOutQuad' }}
                >
                    {RenderJobDetails(dummyjobData)}
                    {RenderRequestCards(dummuRequestCardData)}

                </TweenOne>
            </div>
            <Footer />
        </div>

    )
}

// dummy data for "get referral cards"
const dummyjobData: jobDetails = {
    company:"Microsoft",
    title:'Software Engineer',
    logo: MS_logo,
    description:"Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. Exercitation veniam consequat sunt nostrud amet."
}


// interface applicationData {
//     title: string,
//     avatar: string,
//     logo: string,
//     name: string,
//     date: string
// }

// dummy data for sent:
const dummuRequestCardData: requestCardData[] = [];
for (let ii = 0; ii < 2; ii++) {
    dummuRequestCardData.push(
        {
            logo: MS_logo,
            name: 'Allen C',
            description: 'Looking for software developer position'

        }
    )
}



export default RHomeSignedIn;
