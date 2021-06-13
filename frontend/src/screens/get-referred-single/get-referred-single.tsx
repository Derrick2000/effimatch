import React from 'react';

import {Button} from 'antd';

import axios from 'axios';

import './styles/get-referred-single-styles.less';

const GetRef = () => {
  const [file, setfile] = React.useState(new FormData());
  const [fileName, setFileName] = React.useState('');
  const [fileType, setFileType] = React.useState('');

  function handleUpload(event: React.ChangeEvent<any>) {
    const formData = new FormData();
    const file = event.target.files[0];
    console.log('name', file.name);
    formData.append('uploadFile', file, file.name);
    setfile(formData);

    const nameStr =
      typeof event.target.files[0] !== 'undefined'
        ? event.target.files[0].name.split('.')
        : ['', ''];

    setFileName(nameStr[0]);
    setFileType(nameStr[1]);
  }

  function handleDelete() {
    setfile(new FormData());
    setFileName('');
    setFileType('');
  }

  const handleSubmitFile = () => {
    const config = {
      headers: {
        'Content-Type': 'multipart/form-data;boundary=' + new Date().getTime(),
      },
    };

    axios.post('http://localhost:8080/v1/file/upload', file, config).then(r => {
      console.log(r);
    });
  };

  return (
    <div>
      <input
        type="file"
        onChange={handleUpload}
        style={{color: 'transparent'}}
      />
      <div>
        <h2>{fileType}</h2>
        <h2>{fileName}</h2>
        <Button onClick={handleDelete}>Delete</Button>
        <Button onClick={handleSubmitFile}>submit</Button>
      </div>
    </div>
  );
};

export default GetRef;
