import React, {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';
import {
  getApplicationDetailsByIdUsingGet,
  changeApplicationStatusByIdUsingPatch,
  ChangeApplicationStatusRequestNewStatus,
} from 'apis/effimatch';
import {useRequest} from 'apis/useRequest';
import {Avatar, Divider, Skeleton, Button} from 'antd';
import parse from 'html-react-parser';
import PopUp from 'components/PopUp/PopUp';
import {PopUpType} from 'components/PopUp/PopUp';
import './styles/applicationDetails.less';

const ApplicationDetails = () => {
  const {jobId, applicationId} = useParams();
  const [getApplicationDetails, applicationDetails, isLoading] = useRequest(
    getApplicationDetailsByIdUsingGet,
  );

  const [changeApplicationStatus] = useRequest(
    changeApplicationStatusByIdUsingPatch,
    {
      onSuccess: () => {
        setWarningPopUpVisible(false);
        setSuccessPopUpVisible(true);
        setSuccessPopUpText(
          warningPopUpType === PopUpType.smile
            ? 'Thank you for referring!'
            : 'Applicant rejected',
        );
      },
    },
  );

  const [warningPopUpVisible, setWarningPopUpVisible] = useState(false);
  const [successPopUpVisible, setSuccessPopUpVisible] = useState(false);
  const [successPopUpText, setSuccessPopUpText] = useState('');

  const [warningPopUpType, setWarningPopUpType] = useState<PopUpType>(
    PopUpType.success,
  );
  const [warningPopUpText, setWarningPopUpText] = useState('');

  const handleClickReferButton = () => {
    setWarningPopUpType(PopUpType.smile);
    setWarningPopUpText('Refer this applicant?');
    setWarningPopUpVisible(true);
  };

  const handleClickRejectButton = () => {
    setWarningPopUpType(PopUpType.meh);
    setWarningPopUpText('Reject this applicant?');
    setWarningPopUpVisible(true);
  };

  const handleRefer = () => {
    changeApplicationStatus({
      applicationId,
      requestBody: {
        newStatus: ChangeApplicationStatusRequestNewStatus.ACCEPTED,
      },
    });
  };

  const handleReject = () => {
    changeApplicationStatus({
      applicationId,
      requestBody: {
        newStatus: ChangeApplicationStatusRequestNewStatus.CLOSED,
      },
    });
  };

  const handleCloseSuccessPopUp = () => {
    setSuccessPopUpVisible(false);
    window.location.reload();
  };

  useEffect(() => {
    getApplicationDetails({applicationId});
  }, [applicationId]);

  return (
    <div className="application-details-wrapper">
      <PopUp
        visible={warningPopUpVisible}
        onCancel={() => setWarningPopUpVisible(false)}
        onConfirm={
          warningPopUpType === PopUpType.smile ? handleRefer : handleReject
        }
        confirmButtonText="Yes"
        type={warningPopUpType}
        text={warningPopUpText}
      />
      <PopUp
        visible={successPopUpVisible}
        type={PopUpType.success}
        text={successPopUpText}
        onCancel={handleCloseSuccessPopUp}
      />
      <div className="application-details-content">
        <a className="application-details-back" href={`/postings/${jobId}`}>
          ← Back
        </a>
        <div className="application-details-info">
          <div className="application-details-box">
            {applicationDetails?.data.avatar ? (
              <Avatar
                shape="square"
                src={applicationDetails?.data.avatar}
                size={{xs: 40, sm: 40, md: 40, lg: 64, xl: 64, xxl: 64}}
              />
            ) : (
              <Avatar
                shape="square"
                size={{xs: 40, sm: 40, md: 40, lg: 64, xl: 64, xxl: 64}}>
                {applicationDetails?.data.username![0].toUpperCase()}
              </Avatar>
            )}
            <div className="application-details-box-info">
              <h1 className="application-details-info-title">
                {isLoading ? (
                  <Skeleton.Button active size={'large'} />
                ) : (
                  applicationDetails?.data.username
                )}
              </h1>
            </div>
          </div>
          <Divider />
          <h1 className="application-details-box-note">Note</h1>
          <div className="application-details-box" style={{width: '100%'}}>
            <div>{parse(applicationDetails?.data.note ?? '')}</div>
          </div>
        </div>
        {applicationDetails?.data.applicationStatus === 'SENT' && (
          <div className="application-details-button-wrapper">
            <Button
              type="primary"
              className="card-button application-details-button-refer"
              onClick={handleClickReferButton}>
              Refer
            </Button>
            <Button
              type={'default'}
              className="card-button application-details-button-reject"
              danger
              onClick={handleClickRejectButton}>
              Reject
            </Button>
          </div>
        )}

        {applicationDetails?.data.applicationStatus !== 'SENT' && (
          <Button
            type={'primary'}
            className="card-button"
            disabled
            onClick={handleClickRejectButton}>
            Already
            {applicationDetails?.data.applicationStatus === 'ACCEPTED'
              ? ' referred '
              : ' rejected '}
            by you
          </Button>
        )}
      </div>
    </div>
  );
};

export default ApplicationDetails;
