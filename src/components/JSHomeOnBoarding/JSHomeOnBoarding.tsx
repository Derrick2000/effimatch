import React, {useEffect, useState} from 'react';
import {Button, Modal} from 'antd';
import {CheckOutlined, SmileOutlined} from '@ant-design/icons';
import './JSHomeOnBoarding.less';
import {ReactComponent as ScooterWithBackpack} from '../../images/ScooterWithBackpack.svg';
import Grid from '@material-ui/core/Grid';
import Hidden from '@material-ui/core/Hidden';
import {useRequest} from 'apis/useRequest';
import {
  finishedTutorialUsingPost,
  getOwnInformationUsingGet,
} from 'apis/effimatch';

const JSHomeOnBoarding = () => {
  return <OnBoardingModal />;
};

const OnBoardingModal = () => {
  const [showModal, setShowModal] = useState(false);
  const [getOwnInformation] = useRequest(getOwnInformationUsingGet, {
    onSuccess: r => {
      setShowModal(!r.data.finishedTutorial!);
    },
  });
  const [finishTutorial] = useRequest(finishedTutorialUsingPost);

  useEffect(() => {
    getOwnInformation(undefined);
  }, []);

  const handleClose = () => {
    finishTutorial(undefined);
    setShowModal(false);
  };

  return (
    <Modal
      visible={showModal}
      width={720}
      footer={null}
      closable={false}
      bodyStyle={{
        padding: '0',
        height: '450px',
      }}>
      <Grid container>
        <Grid item md={6} sm={12} style={{backgroundColor: 'white'}}>
          <h1 className="onboard-info-block-title">Welcome to Effimatch</h1>
          <p className="onboard-info-block-desc">
            Effimatch is your go-to streamlined referral platform
          </p>
          <div className="onboard-card-avatar-wrapper-check">
            <CheckOutlined style={{color: '#EF8354', fontSize: '25px'}} />
            <div>
              <p className="card-avatar-text">Get Referred</p>
              <p className="card-avatar-text">Description Text</p>
            </div>
          </div>
          <div className="onboard-card-avatar-wrapper-smile">
            <SmileOutlined style={{color: '#EF8354', fontSize: '25px'}} />
            <div>
              <p className="card-avatar-text">Build Your Network</p>
              <p className="card-avatar-text">Description Text</p>
            </div>
          </div>
          <Button
            type="primary"
            className="onboard-button"
            onClick={handleClose}>
            Start
          </Button>
        </Grid>
        <Hidden mdDown>
          <Grid
            item
            md={6}
            style={{
              background:
                'linear-gradient(90deg, rgba(255, 236, 210, 0.25) 0%, rgba(252, 182, 159, 0.25) 100%)',
            }}>
            <ScooterWithBackpack />
          </Grid>
        </Hidden>
      </Grid>
    </Modal>
  );
};

export default JSHomeOnBoarding;
