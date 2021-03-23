import React from 'react'

import { Upload, Button } from 'antd';
import { UploadOutlined } from '@ant-design/icons';

import './styles/get-referred-single-styles.less';

interface props {}


const GetRef: React.FC<any> = (props) => {
    const [file,setfile]  = React.useState("");
    const [fileName,setFileName] = React.useState("");
    const [fileType,setFileType] = React.useState("");

    function handleUpload(event:any) {
      setfile(event.target.files[0]);
      const nameStr = (typeof event.target.files[0] !== 'undefined') ? event.target.files[0].name.split(".") : ["",""];

      setFileName(nameStr[0]);
      setFileType(nameStr[1]);
    }

    function handleDelete(event:any) {
      setfile("");
      setFileName("");
      setFileType("");
    }


    return(
      <div>


        <input type="file" onChange={handleUpload} style={{ color:"transparent"}}/>
        <div>
          <h2>{fileType}</h2>
          <h2>{fileName}</h2>
          <Button onClick={handleDelete}>Delete</Button>
        </div>
      </div>
    )
}

export default GetRef;
