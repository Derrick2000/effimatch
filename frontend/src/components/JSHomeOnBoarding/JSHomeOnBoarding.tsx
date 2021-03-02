import React from 'react';
import {Row, Col, Button,Divider,Modal} from 'antd';
import {CheckOutlined,SmileOutlined,SmileTwoTone,CheckCircleTwoTone } from '@ant-design/icons';
import './JSHomeOnBoarding.less';
// logos
import {ReactComponent as ScooterWithBackpack} from '../../images/ScooterWithBackpack.svg';

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

 const OnBoardingWrapper: React.FC<any> = () => {
  const { width } = useViewport();
  const breakpoint = 620;

  return width < breakpoint ? <OnBoardingPart /> : <OnBoardingFull />;
}
const OnBoardingPart: React.FC<any> = () => {
 const [showOnBoard, setShowOnBoard] = React.useState(true);

 return (
   <Modal
     visible = {showOnBoard}
     width={720}
     footer={null}
     closable={false}
     bodyStyle={{
       padding: '0',
       background: 'linear-gradient(90deg, rgba(255, 236, 210, 0.25) 0%, rgba(252, 182, 159, 0.25) 100%)',
       height: '450px'

     }}
   >
    <Row className="row">
           <div className='info-block' >
               <h1 className="info-block-title">Welcome to Effimatch</h1>
               <p className="info-block-desc">Effimatch is your go-to streamlined referral platform</p>
             <div className='card-avatar-wrapper-check'>
                 <CheckOutlined style={{color:'#EF8354',fontSize: '25px'}}/>
                 <div>
                   <p className='card-avatar-text'>Get Referred</p>
                   <p className='card-avatar-text'>Description Text</p>
                 </div>
             </div>
             <div className='card-avatar-wrapper-smile'>
                 <SmileOutlined style={{color:'#EF8354',fontSize: '25px'}}/>
                 <div>
                   <p className='card-avatar-text'>Build Your Network</p>
                   <p className='card-avatar-text'>Description Text</p>
                 </div>
             </div>
             <Button type='primary' className='onBoard-button' onClick={() => {setShowOnBoard(false)}}>Start</Button>
             </div>
    </Row>
   </Modal>

 );
}
const OnBoardingFull: React.FC<any> = () => {
  const [showOnBoard, setShowOnBoard] = React.useState(true);

  return (
   <Modal
     visible = {showOnBoard}
     width={720}
     footer={null}
     closable={false}
     bodyStyle={{
       padding: '0',
       background: 'linear-gradient(90deg, rgba(255, 236, 210, 0.25) 0%, rgba(252, 182, 159, 0.25) 100%)',
       height: '450px'

     }}
   >
    <Row className="row">
           <Col span={13} className='info-block' style={{backgroundColor : 'white',height:'450px'}}>
           <div className='info-block' >
               <h1 className="info-block-title">Welcome to Effimatch</h1>
               <p className="info-block-desc">Effimatch is your go-to streamlined referral platform</p>
             <div className='card-avatar-wrapper-check'>
                 <CheckOutlined style={{color:'#EF8354',fontSize: '25px'}}/>
                 <div>
                   <p className='card-avatar-text'>Get Referred</p>
                   <p className='card-avatar-text'>Description Text</p>
                 </div>
             </div>
             <div className='card-avatar-wrapper-smile'>
                 <SmileOutlined style={{color:'#EF8354',fontSize: '25px'}}/>
                 <div>
                   <p className='card-avatar-text'>Build Your Network</p>
                   <p className='card-avatar-text'>Description Text</p>
                 </div>
             </div>
             <Button type='primary' className='onBoard-button' onClick={() => {setShowOnBoard(false)}}>Start</Button>
             </div>
           </Col>
           <Col span={11} className="img-wrapper">
             <div >
               <ScooterWithBackpack className="scooter"/>
             </div>
           </Col>

   </Row>
</Modal>
 );
}


const JSHomeOnBoarding: React.FC<any> = () => {
    return (
      <OnBoardingWrapper/>
    )
}

export default JSHomeOnBoarding;
