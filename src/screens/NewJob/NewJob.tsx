/**
 * It would take time to refactor this whole thing.
 * Next time when handling forms, please try to use libraries such as yup.
 */

import {Button, DatePicker, Radio, Image, Checkbox} from 'antd';
import InputBar from 'components/InputBar/InputBar';
import React from 'react';
import ReactQuill, {Quill} from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import './styles/new-job.less';
import useDebounce from 'utils/useDebounce';
import useSearchCompany from './useSearchCompany';
import {addJobUsingPost} from 'apis/effimatch';
import {useRequest} from 'apis/useRequest';

const RadioGroup = Radio.Group;

class Counter {
  quill: any;
  options: any;
  container: any;
  constructor(quill, options) {
    this.quill = quill;
    this.options = options;
    this.container = document.querySelector(options.container);
    quill.on('text-change', this.update.bind(this));
    this.update(); // Account for initial contents
  }

  calculate() {
    let text = this.quill.getText().trim();
    if (this.options.unit === 'word') {
      text = text.trim();
      return text.length > 0 ? text.split(/\s+/).length : 0;
    } else {
      return text.length;
    }
  }

  update() {
    const length = this.calculate();
    if (length >= 1000) {
      this.quill.history.undo();
    }
    this.container.innerText = length + '/1000';
  }
}
Quill.register('modules/counter', Counter);

const modules = {
  counter: {
    container: '#counter',
    unit: 'character',
    history: {delay: 100, userOnly: true},
  },
};

const NewJob: React.FC<any> = () => {
  const [jobTitlePresent, setJobTitlePresent] = React.useState(false);
  const [jobDescPresent, setJobDescPresent] = React.useState(false);
  const [typePresent, setTypePresent] = React.useState(false);
  const [locationPresent, setLocationPresent] = React.useState(false);
  const [companyPresent, setCompanyPresent] = React.useState(false);
  const [datePresent, setDatePresent] = React.useState(false);
  const [doNotUseLogo, setDoNotUseLogo] = React.useState(false);

  const [jobTitle, setJobTitle] = React.useState('');
  const [requiredExperience, setType] = React.useState(0);
  const [jobLink, setJobLink] = React.useState('');
  const [location, setLocation] = React.useState('');
  const [companyName, setCompanyName] = React.useState('');
  const [applicationDeadline, setApplicationDeadline] = React.useState('');
  const [jobDescription, setValue] = React.useState('');
  const [companyLogo, setCompanyLogo] = React.useState(undefined);

  const [submitJob] = useRequest(addJobUsingPost, {
    onSuccess: () => {
      window.location.href = '/#';
    },
    onFail: e => {
      console.log(e);
    },
  });

  const onInputJobLink = (value: string) => {
    if (value !== '') {
      setJobLink(value);
    }
  };

  const onInputLocation = (value: string) => {
    if (value !== '') {
      setLocation(value);
    }
  };

  const searchCompany = useSearchCompany(companyName);

  const searchCompanyAndUpdateLogo = () => {
    searchCompany().then(r => {
      setCompanyLogo(r.logo);
    });
  };

  const searchCompanyDebounced = useDebounce(searchCompanyAndUpdateLogo, 300);

  const onInputCompanyName = (value: string) => {
    if (value !== '') {
      setCompanyName(value);
      searchCompanyDebounced();
    }
  };

  const onInputDate = (date: any) => {
    setApplicationDeadline(date.toDate());
  };

  const onInputJobTitle = (value: string) => {
    if (value !== '') {
      setJobTitle(value);
    }
  };

  const mapRequiredExperience = (num: number) => {
    return ['', 'Internship', 'New Grad', 'Senior'][num];
  };

  const onSave = () => {
    let submit = true;

    if (jobDescription == '') {
      submit = false;
      setJobDescPresent(true);
    }
    if (requiredExperience == 0) {
      submit = false;
      setTypePresent(true);
    }
    if (location == '') {
      submit = false;
      setLocationPresent(true);
    }
    if (companyName == '') {
      submit = false;
      setCompanyPresent(true);
    }
    if (applicationDeadline == '') {
      submit = false;
      setDatePresent(true);
    }
    if (jobTitle == '') {
      submit = false;
      setJobTitlePresent(false);
    }

    if (submit) {
      setJobDescPresent(false);
      setTypePresent(false);
      setLocationPresent(false);
      setCompanyPresent(false);
      setDatePresent(false);
      setJobTitlePresent(false);

      const newJob = {
        jobTitle: jobTitle,
        jobDescription: jobDescription,
        requiredExperience: mapRequiredExperience(requiredExperience),
        jobLink: jobLink,
        location: location,
        companyName: companyName,
        companyLogo: doNotUseLogo ? undefined : companyLogo,
        applicationDeadline: applicationDeadline,
      };

      submitJob({requestBody: newJob});
    }
  };

  const onChange = (e: any) => {
    setType(e.target.value);
  };

  return (
    <div
      style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
      <div className="addpost-content">
        <p className="addpost-content-question">
          <strong>Job Title</strong>
        </p>
        <InputBar
          input={onInputJobTitle}
          placehold="Enter the title of your job"
          autocomplete={false}
        />
        {jobTitlePresent ? (
          <p className="addpost-content-error">This field is required</p>
        ) : null}

        <p className="addpost-content-question">
          <strong>Job Description</strong>
        </p>
        <ReactQuill
          theme="snow"
          value={jobDescription}
          onChange={setValue}
          className="addpost-content-box"
          modules={modules}
        />
        <div className="addpost-content-text" id="counter">
          0
        </div>
        {jobDescPresent ? (
          <p className="addpost-content-error">This field is required</p>
        ) : null}

        <p className="addpost-content-question">
          <strong>Required year of experience:</strong>
        </p>
        <RadioGroup onChange={onChange} value={requiredExperience}>
          <Radio value={1} className="addpost-content-radio">
            Internship
          </Radio>
          <Radio value={2} className="addpost-content-radio">
            New Grad
          </Radio>
          <Radio value={3} className="addpost-content-radio">
            Senior
          </Radio>
        </RadioGroup>
        {typePresent ? (
          <p className="addpost-content-error">This field is required</p>
        ) : null}

        <p className="addpost-content-question">
          <strong>Add job link here</strong>
        </p>
        <InputBar
          input={onInputJobLink}
          placehold="Type a position to start"
          autocomplete={false}
        />

        <p className="addpost-content-question">
          <strong>Location(s)</strong>
        </p>
        <InputBar
          input={onInputLocation}
          placehold="Type your current location to start"
          autocomplete={false}
        />
        {locationPresent ? (
          <p className="addpost-content-error">This field is required</p>
        ) : null}

        <p className="addpost-content-question">
          <strong>Company</strong>
        </p>
        <InputBar
          input={onInputCompanyName}
          placehold="Type your company name"
          autocomplete={false}
        />
        {companyPresent ? (
          <p className="addpost-content-error">This field is required</p>
        ) : null}

        {!doNotUseLogo && companyLogo && (
          <Image
            width={110}
            height={100}
            style={{marginTop: 10, paddingRight: 10}}
            src={companyLogo!}
          />
        )}

        {companyLogo && (
          <Checkbox onChange={() => setDoNotUseLogo(!doNotUseLogo)}>
            <strong>Do not use logo</strong>
          </Checkbox>
        )}

        <p className="addpost-content-question">
          <strong>Application deadline</strong>
        </p>
        <DatePicker
          placeholder="MM/DD/YYYY"
          className="addpost-content-date"
          onChange={onInputDate}
        />
        {datePresent ? (
          <p className="addpost-content-error">This field is required</p>
        ) : null}

        <div className="addpost-button-wrapper">
          <Button type="primary" onClick={onSave} className="addpost-button">
            Post
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NewJob;
