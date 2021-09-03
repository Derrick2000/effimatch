import React from 'react';
import InputBar from '../../components/InputBar/InputBar';
import {Button, Select, Radio, Row, Col, Tag} from 'antd';
import './styles/onboard.less';
import {logoutUser} from '../../actions/authAction';
import {
  changeRoleUsingPost,
  finishedInitialSettingsUsingPost,
} from 'apis/effimatch';
import {useRequest} from 'apis/useRequest';
import {ReactComponent as ReferrerIllustration} from 'images/referrer.svg';
import {ReactComponent as JobSeekerIllustration} from 'images/job-seeker.svg';

const RadioGroup = Radio.Group;

const Referrer = () => {
  const [finishInitialSettings] = useRequest(finishedInitialSettingsUsingPost, {
    onSuccess: () => {
      // has to re-login after changing permissions
      logoutUser();
      window.location.href = '/sign-in';
    },
  });

  const [changeRole] = useRequest(changeRoleUsingPost, {
    onSuccess: () => {
      finishInitialSettings(null);
    },
    onFail: e => {
      console.log(e);
    },
  });

  const onSave = () => {
    changeRole({requestBody: {newRole: 'R'}});
  };

  return (
    <div className="onboard-content-introduction">
      <p className="onboard-content-question" style={{marginBottom: 0}}>
        As a <p className="onboard-content-emphasis-text">referrer</p>, you can
        post refer opportunities for your company to help people applying for
        jobs.
      </p>

      <ReferrerIllustration />
      <div className="onboard-button-wrapper">
        <Button
          type="primary"
          onClick={onSave}
          className="onboard-button-button">
          Save Selection
        </Button>
      </div>
    </div>
  );
};

// #######################################################################################################

const JobSeeker = () => {
  const [finishInitialSettings] = useRequest(finishedInitialSettingsUsingPost, {
    onSuccess: () => {
      // has to re-login after changing permissions
      logoutUser();
      window.location.href = '/sign-in';
    },
  });

  const [changeRole] = useRequest(changeRoleUsingPost, {
    onSuccess: () => {
      finishInitialSettings(null);
    },
  });

  // handle button click
  const onSave = () => {
    changeRole({requestBody: {newRole: 'JS'}});
  };

  return (
    <div className="onboard-content-introduction">
      <p className="onboard-content-question" style={{marginBottom: 0}}>
        As a <p className="onboard-content-emphasis-text">job seeker</p>, you
        can search for the refer opportunities to your favorite company.
      </p>
      <JobSeekerIllustration />
      <div className="onboard-button-wrapper">
        <Button
          type="primary"
          onClick={onSave}
          className="onboard-button-button">
          Save Selection
        </Button>
      </div>
    </div>
  );
};

// #######################################################################################################

const OnBoard: React.FC<any> = () => {
  const [type, setType] = React.useState(0);

  const onChange = (e: any) => {
    setType(e.target.value);
  };

  return (
    <div className="onboard-wrapper">
      <div className="onboard-content">
        <p className="onboard-content-question">
          <strong>Choose your role</strong>
          <br />
          <p>You can always change your role later</p>
        </p>
        <RadioGroup
          onChange={onChange}
          value={type}
          className="onboard-content-radio-wrapper">
          <Radio value={1} className="onboard-content-radio">
            Referrer
          </Radio>
          <Radio value={2} className="onboard-content-radio">
            Job Seeker
          </Radio>
        </RadioGroup>
        {type === 1 && <Referrer />}
        {type === 2 && <JobSeeker />}
      </div>
    </div>
  );
};

export default OnBoard;
