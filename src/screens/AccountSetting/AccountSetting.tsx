import React, {useEffect} from 'react';
import {Input, Button, Form, Menu, notification, Upload} from 'antd';

import {getOwnInformationUsingGet, EffimatchUser} from 'apis/effimatch';
import {useRequest} from 'apis/useRequest';

import './styles/accountSetting.less';

const {TextArea} = Input;

const openErrorNotification = (placement: any, errorMsg: string) => {
  notification.error({
    message: 'Set New Password',
    description: `An error has occured.\n ${errorMsg}`,
    placement,
  });
};

const AccountReset = (props: {user?: EffimatchUser}) => {
  const [password, setPassword] = React.useState('');
  const [confirmPassword, setConfirmPW] = React.useState('');

  const submit = () => {
    if (props.user === undefined) {
      window.location.href = '/sign-in';
    }

    if (password === confirmPassword) {
      if (password.length <= 8) {
        openErrorNotification('bottomLeft', 'Password length too short');
      } else {
        console.log('password match');
      }
    } else {
      openErrorNotification('bottomLeft', 'Password does not match');
    }
  };

  return (
    <div className="accountSetting-content-change">
      <p className="accountSetting-content-title">Change password</p>
      <Form>
        <label>New Password</label>
        <Input.Password
          onChange={e => setPassword(e.target.value)}
          value={password}
          className="accountSetting-content-input"
          maxLength={25}
        />
        <label>Confirm New Password</label>
        <Input.Password
          onChange={e => setConfirmPW(e.target.value)}
          value={confirmPassword}
          className="accountSetting-content-input"
          maxLength={25}
        />
        <Button onClick={submit}>Submit</Button>
      </Form>
    </div>
  );
};

const AccountInfo = (props: {user?: EffimatchUser}) => {
  const [bio, setBio] = React.useState('');
  const [username, setUserName] = React.useState('');
  const [fileList, setFileList] = React.useState([]);

  const onChange = ({fileList: newFileList}) => {
    setFileList(newFileList);
  };

  const beforeUpload = (file: any) => {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJpgOrPng) {
      openErrorNotification('bottomLeft', 'You can only upload JPG/PNG file!');
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      openErrorNotification('bottomLeft', 'Image must smaller than 2MB!');
    }
    return isJpgOrPng && isLt2M;
  };

  const onPreview = async (file: any) => {
    let src = file.url;
    if (!src) {
      src = await new Promise(resolve => {
        const reader = new FileReader();
        reader.readAsDataURL(file.originFileObj);
        reader.onload = () => resolve(reader.result);
      });
    }
    const image = new Image();
    image.src = src;
    const imgWindow = window.open(src);
    imgWindow?.document.write(image.outerHTML);
  };

  const save = () => {
    if (props.user === undefined) {
      window.location.href = '/sign-in';
    } else {
      console.log(fileList);
      console.log(props.user);
    }
  };

  const onBioChange = (e: any) => {
    setBio(e.target.value);
  };

  const onUserChange = (e: any) => {
    setUserName(e.target.value);
  };

  return (
    <div>
      <p className="accountSetting-content-title">General Info</p>
      <div className="accountSetting-content-info">
        <div>
          <Form>
            <label>Email</label>
            <Input
              disabled
              className="accountSetting-content-input"
              value={props.user?.username ?? ''}
            />
            <label>Username</label>
            <Input
              className="accountSetting-content-input"
              onChange={onUserChange}
            />
            <label>Bio</label>
            <TextArea rows={4} allowClear onChange={onBioChange} />
            <Button className="accountSetting-content-button" onClick={save}>
              Save
            </Button>
          </Form>
        </div>
        <div className="accountSetting-content-info-avatar">
          {/* Icon */}
          <Upload
            action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
            listType="picture-card"
            beforeUpload={beforeUpload}
            onChange={onChange}
            onPreview={onPreview}>
            {fileList.length < 1 && '+ Upload'}
          </Upload>
        </div>
      </div>
    </div>
  );
};

const AccountSetting = () => {
  const [section, setSection] = React.useState('1');

  const handleClick = (e: any) => {
    setSection(e.key);
  };

  const [getInfo, userInfo] = useRequest(getOwnInformationUsingGet);

  useEffect(() => {
    getInfo(undefined);
  }, []);

  return (
    <div className="accountSetting-wrapper">
      <div className="accountSetting-content">
        <div className="accountSetting-content-sidebar">
          {/* Basic Settings + Security Settings */}
          <Menu
            className="accountSetting-content-sidebar-list"
            onClick={handleClick}
            defaultSelectedKeys={['1']}
            mode="inline">
            <Menu.Item key="1">Basic Settings</Menu.Item>
            <Menu.Item key="2">Security Settings</Menu.Item>
          </Menu>
        </div>

        <div>
          {/* Basic Setting: Email, Username, Bio, and Avatar */}
          {/* Security Setting: Change passwords */}

          {section === '1' ? (
            <AccountInfo user={userInfo?.data} />
          ) : (
            <AccountReset user={userInfo?.data} />
          )}
        </div>
      </div>
    </div>
  );
};

export default AccountSetting;
