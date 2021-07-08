import React from 'react';
import ReactQuill, {Quill} from 'react-quill';
import 'react-quill/dist/quill.snow.css';

// componenet
import InputBar from 'components/InputBar/InputBar';

// antd
import {Button, Radio, DatePicker} from 'antd';

// style
import './styles/addpost.less';

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

    let label = this.options.unit;
    if (length !== 1) {
      label += 's';
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

const AddPost: React.FC<any> = () => {
  const [jobDescPresent, setJobDescPresent] = React.useState(false);
  const [typePresent, setTypePresent] = React.useState(false);
  const [locationPresent, setLocationPresent] = React.useState(false);
  const [companyPresent, setCompanyPresent] = React.useState(false);
  const [datePresent, setDatePresent] = React.useState(false);

  const [type, setType] = React.useState(0);
  const [position, setPosition] = React.useState('');
  const [location, setLocation] = React.useState('');
  const [company, setCompany] = React.useState('');
  const [date, setDate] = React.useState('');
  const [value, setValue] = React.useState('');

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

  const onInputDate = (date: any, dateString: string) => {
    setDate(dateString);
  };

  const onSave = () => {
    let submit = true;

    if (value == '') {
      submit = false;
      setJobDescPresent(true);
    }
    if (type == 0) {
      submit = false;
      setTypePresent(true);
    }
    if (location == '') {
      submit = false;
      setLocationPresent(true);
    }
    if (company == '') {
      submit = false;
      setCompanyPresent(true);
    }
    if (date == '') {
      submit = false;
      setDatePresent(true);
    }

    if (submit) {
      setJobDescPresent(false);
      setTypePresent(false);
      setLocationPresent(false);
      setCompanyPresent(false);
      setDatePresent(false);

      console.log({
        value: value,
        type: type,
        position: position,
        location: location,
        company: company,
        date: date,
      });

      // go /#
      window.location.href = '/#';
    }
  };

  const onChange = (e: any) => {
    setType(e.target.value);
  };

  return (
    <div className="addpost-wrapper">
      <div className="addpost-content">
        <p className="addpost-content-header">
          <strong>Job Description</strong>
        </p>

        <link
          rel="stylesheet"
          href="//cdn.quilljs.com/1.2.6/quill.snow.css"></link>
        <ReactQuill
          theme="snow"
          value={value}
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
        <RadioGroup onChange={onChange} value={type}>
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
          input={onInputPosition}
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
          input={onInputCompany}
          placehold="Type your company name"
          autocomplete={false}
        />
        {companyPresent ? (
          <p className="addpost-content-error">This field is required</p>
        ) : null}

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

        <div className="addpost-button">
          <Button
            type="primary"
            onClick={onSave}
            className="addpost-button-button">
            Post
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AddPost;
