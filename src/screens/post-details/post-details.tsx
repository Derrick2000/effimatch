import React from 'react';
import './styles/post-details-Style.less';
// screens and componets
import ReferralModal from 'components/ReferralModal/ReferralModal';
import TweenOne from 'rc-tween-one';
import {useRequest} from 'apis/useRequest';
import {
  getJobByIdUsingGet,
  addApplicationUsingPost,
  CreateApplicationRequest,
  Job,
} from 'apis/effimatch';

// antd
import {Button, Card, notification} from 'antd';

// material ui
import Grid from '@material-ui/core/Grid';
import parse from 'html-react-parser';

// assets (temp)
import icon from 'images/avatar.png';
import share from 'images/share.png';

import {useParams} from 'react-router-dom';

const openErrorNotification = (placement: any, errorMsg: string) => {
  notification.info({
    message: 'Note',
    description: 'An error has occured.\n' + errorMsg,
    placement,
  });
};

const openSuccessNotification = (placement: any) => {
  notification.success({
    message: 'Note',
    description: 'Note sent successfully.',
    placement,
  });
};

const openCopyNotification = (placement: any) => {
  notification.success({
    message: 'Link Copied!',
    placement,
  });
};

const RenderDetailSection = (postInfo?: Job) => {
  const copyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    openCopyNotification('bottomLeft');
  };
  return (
    <div>
      <h1 className="post-details-title-header">{postInfo?.jobTitle ?? ''}</h1>
      <div className="post-details-title-content">
        <div className="post-details-title-content-description">
          <p>
            {postInfo?.location ?? ''} | {postInfo?.requiredExperience ?? ''}
          </p>
        </div>
        <div className="post-details-title-content-share" onClick={copyLink}>
          <img src={share} alt="logo" />
          <p>Share</p>
        </div>
      </div>
      <p className="post-details-description">Job Description:</p>
      <div>{parse(postInfo?.jobDescription ?? '')}</div>
    </div>
  );
};

const AvatarAndButtons = (companyLogo: string, jobLink: string) => {
  const {id} = useParams();
  const [showNote, setNote] = React.useState(false);
  const [addNote] = useRequest(addApplicationUsingPost);

  const setShow = () => {
    setNote(!showNote);
  };

  const goToOfficialJobPage = () => {
    jobLink =
      jobLink.startsWith('http://') || jobLink.startsWith('https://')
        ? jobLink
        : 'http://' + jobLink;
    window.open(jobLink, '_blank');
  };

  const submitNote = (note: string) => {
    if (note.length == 0) {
      openErrorNotification('bottomLeft', 'Invalid note');
    }
    const application: CreateApplicationRequest = {
      jobId: id,
      note: note,
    };
    addNote({requestBody: application})
      .then(() => {
        openSuccessNotification('bottomLeft');
        setShow();
      })
      .catch((e: string) => {
        openErrorNotification('bottomLeft', e);
        setShow();
      });
  };

  return (
    <div className="post-details-side">
      <Card
        className="post-details-side-card"
        cover={
          <img
            alt="avatar"
            src={companyLogo ?? icon}
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
        onClick={setShow}
        style={{borderRadius: '10px', width: '140px'}}>
        Get Referred
      </Button>
      <br />
      {jobLink !== '' && (
        <Button
          className="post-details-side-button"
          style={{borderRadius: '10px', width: '140px'}}
          onClick={goToOfficialJobPage}>
          View Job
        </Button>
      )}

      <ReferralModal
        visiable={showNote}
        setClose={setShow}
        onSubmit={submitNote}
      />
    </div>
  );
};

const Referers = () => {
  const {id} = useParams();
  const [getJobData, jobData] = useRequest(getJobByIdUsingGet);

  React.useEffect(() => {
    const fetchData = async () => {
      await getJobData({id: id});
      console.log(jobData);
    };
    fetchData();
  }, []);

  return (
    <div className="post-details-pagewrapper">
      <div className="post-details-content-wrapper">
        <TweenOne animation={{x: -200, type: 'from', ease: 'easeOutQuad'}}>
          <Grid container>
            <Grid item md={4} className="post-details-side-wrapper">
              <div>
                {AvatarAndButtons(
                  jobData?.data.companyLogo ?? '',
                  jobData?.data.jobLink ?? '',
                )}
              </div>
            </Grid>

            <Grid item md={8} className="post-details-main-wrapper">
              <div>{RenderDetailSection(jobData?.data)}</div>
            </Grid>
          </Grid>
        </TweenOne>
      </div>
    </div>
  );
};

export default Referers;
