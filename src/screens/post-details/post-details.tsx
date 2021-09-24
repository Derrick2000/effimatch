import Grid from '@material-ui/core/Grid';
import {Button, Card, notification} from 'antd';
import {
  addApplicationUsingPost,
  CreateApplicationRequest,
  getJobByIdUsingGet,
  Job,
  RegistrationRequestRole,
} from 'apis/effimatch';
import {useRequest} from 'apis/useRequest';
import ReferralModal from 'components/ReferralModal/ReferralModal';
import parse from 'html-react-parser';
import icon from 'images/avatar.png';
import share from 'images/share.png';
import TweenOne from 'rc-tween-one';
import React, {useEffect, useState} from 'react';
import {useSelector} from 'react-redux';
import {useHistory, useParams} from 'react-router-dom';
import './styles/post-details-Style.less';

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

type AvatarAndButtonsProps = {
  companyLogo: string;
  jobLink: string;
  showNoteModal: boolean;
  history: any;
  isAuthenticated: boolean;
};

const AvatarAndButtons = (props: AvatarAndButtonsProps) => {
  const {companyLogo, jobLink, showNoteModal, history, isAuthenticated} = props;
  const {id} = useParams();
  const [showNote, setShowNote] = useState(showNoteModal);
  const [addNote] = useRequest(addApplicationUsingPost);

  const handleClickGetReferred = jobId => {
    if (!isAuthenticated) {
      history.push('/sign-up', {
        fromJob: jobId,
        role: RegistrationRequestRole.JS,
      });
      return;
    }
    setShowNote(!showNote);
  };

  const goToOfficialJobPage = () => {
    const toOpen =
      jobLink.startsWith('http://') || jobLink.startsWith('https://')
        ? jobLink
        : 'http://' + jobLink;
    window.open(toOpen, '_blank');
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
        setShowNote(false);
      })
      .catch((e: string) => {
        openErrorNotification('bottomLeft', e);
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
        onClick={() => handleClickGetReferred(id)}
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
        setClose={() => handleClickGetReferred(id)}
        onSubmit={submitNote}
      />
    </div>
  );
};

const PostDetails = () => {
  const {id} = useParams();
  const [getJobData, jobData] = useRequest(getJobByIdUsingGet);
  const history = useHistory();
  const auth = useSelector((state: any) => state.auth);

  useEffect(() => {
    const fetchData = async () => {
      await getJobData({id: id});
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
                <AvatarAndButtons
                  companyLogo={jobData?.data.companyLogo ?? ''}
                  jobLink={jobData?.data.jobLink ?? ''}
                  showNoteModal={
                    (history.location.state?.showNoteModal &&
                      (auth.isAuthenticated ||
                        history.location.state?.isAuthenticated)) ??
                    false
                  }
                  history={history}
                  isAuthenticated={auth.isAuthenticated}
                />
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

export default PostDetails;
