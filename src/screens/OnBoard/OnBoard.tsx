import React from 'react';

// componenet
import InputBar from '../../components/InputBar/InputBar';

// antd
import {Button, Select, Radio, Row, Col, Tag} from 'antd';

// style
import './styles/onboard.less';
import axios from 'axios';

// redux
import {useSelector} from 'react-redux';
import {logoutUser} from '../../actions/authAction';

const RadioGroup = Radio.Group;

const handleChangeRole = (newRole: string, auth) => {
  const changeRoleRequest = {
    email: auth.user.sub,
    newRole: 'R',
  };

  axios
    .post('http://localhost:8080/v1/users/change-role', changeRoleRequest)
    .then(() => {
      // if success, change user info in server 'initial settings finished'
      axios
        .post('http://localhost:8080/v1/users/finished-initial-settings')
        .then(() => {
          // has to re-login after changing permissions
          logoutUser();
          window.location.href = '/sign-in';
        });
    })
    .catch(e => console.log(e));
};

const Referrer: React.FC<any> = () => {
  const [position, setPosition] = React.useState('');
  const [location, setLocation] = React.useState('');
  const [company, setCompany] = React.useState('');
  const auth = useSelector((state: any) => state.auth);

  const onInputPosition = (value: string) => {
    if (value !== '') {
      setPosition(value);
    }
  };

  const onInputLocation = (value: string) => {
    if (value !== '') {
      setLocation(value);
    }
  };

  const onInputCompany = (value: string) => {
    if (value !== '') {
      setCompany(value);
    }
  };

  const onSave = () => {
    handleChangeRole('R', auth);
  };

  return (
    <div>
      <p className="onboard-content-question">
        <strong>What is your current position?</strong>
      </p>
      <InputBar
        input={onInputPosition}
        placehold="Type a position to start"
        autocomplete={false}
      />

      <p className="onboard-content-question">
        <strong>Where are you located?</strong>
      </p>
      <InputBar
        input={onInputLocation}
        placehold="Type your current location to start"
        autocomplete={false}
      />

      <p className="onboard-content-question">
        <strong>Your company?</strong>
      </p>
      <InputBar
        input={onInputCompany}
        placehold="Type your company name"
        autocomplete={false}
      />

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
  const [jobs, setJobs] = React.useState(['']);
  const [skills, setSkills] = React.useState(['']);
  const [location, setLocation] = React.useState('');
  const [jobType, setJobType] = React.useState('');
  const auth = useSelector((state: any) => state.auth);

  // handle question handling
  const onInputPosition = (value: string) => {
    if (value !== '') {
      setJobs(jobs => [...jobs, value]);
    }
  };

  const onInputSkill = (value: string) => {
    if (value !== '') {
      setSkills(skills => [...skills, value]);
    }
  };

  const onInputLocation = (value: string) => {
    if (value !== '') {
      setLocation(value);
    }
  };

  const onInputType = (value: string) => {
    if (value !== '') {
      setJobType(value);
    }
  };

  // handle button click
  const onSave = () => {
    handleChangeRole('JS', auth);
  };

  // handle close tags
  const handleClose = (
    removedItem: string,
    tags: string[],
    question: number,
  ) => {
    const alternJobTag = tags.filter(
      word => word !== removedItem || word === '',
    );
    switch (question) {
      case 1:
        setJobs(alternJobTag);
        break;
      case 2:
        setSkills(alternJobTag);
        break;
    }
  };

  // display tags
  const displayTags = (tags: string[], question: number) => {
    return (
      <div>
        <Row justify="start">
          {tags.map((item: string, i: number) => {
            return (
              <div key={i.toString()}>
                <Col>
                  {item !== '' && (
                    <Tag
                      closable
                      onClose={() => handleClose(item, tags, question)}
                      className="onboard-content-tag">
                      {item}
                    </Tag>
                  )}
                </Col>
              </div>
            );
          })}
        </Row>
      </div>
    );
  };

  return (
    <div>
      <p className="onboard-content-question">
        <strong>What kind of positions are you looking for?</strong>
      </p>
      <InputBar
        topic="Engineer"
        input={onInputPosition}
        placehold="Type a position to start"
        autocomplete={true}
      />
      <div className="onboard-content-tags-wrapper">{displayTags(jobs, 1)}</div>

      <p className="onboard-content-question">
        <strong>Skills you have?</strong>
      </p>
      <InputBar
        topic="Skills"
        input={onInputSkill}
        placehold="Type a skill to start"
        autocomplete={true}
      />
      <div className="search-tags-wrapper">{displayTags(skills, 2)}</div>

      <p className="onboard-content-question">
        <strong>Where are you located?</strong>
      </p>
      <InputBar
        input={onInputLocation}
        placehold="Type your current locaiton to start"
        autocomplete={false}
      />

      <p className="onboard-content-question">
        <strong>Job type you're looking for?</strong>
      </p>

      {/* Edited by William, changed input to select */}
      <Select
        placeholder="Full time / Internship"
        className="onboard-content-selector"
        onChange={onInputType}>
        <Select.Option value="Full time">Full time</Select.Option>
        <Select.Option value="Internship">Internship</Select.Option>
      </Select>

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
        <p className="onboard-content-header">
          <strong>Upload Resume</strong>
        </p>
        <div className="onboard-content-uploadbox">
          <p className="onboard-content-uploadbox-header">
            <strong>
              Drag &amp; Drop Here Or <u>Browse</u>
            </strong>
          </p>
          <p className="onboard-content-uploadbox-text">Support PDF and DOCX</p>
        </div>
        <p className="onboard-content-question">
          <strong>Are you a referrer or job seeker?</strong>
        </p>
        <RadioGroup onChange={onChange} value={type}>
          <Radio value={1} className="onboard-content-radio">
            Referrer
          </Radio>
          <Radio value={2} className="onboard-content-radio">
            Job Seeker
          </Radio>
        </RadioGroup>
        {type === 1 && <Referrer type={type} />}
        {type === 2 && <JobSeeker />}
      </div>
    </div>
  );
};

export default OnBoard;
