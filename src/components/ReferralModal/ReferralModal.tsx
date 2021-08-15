import React from 'react';
import './referralModal.less';

import {Modal, Button} from 'antd';
import ReactQuill, {Quill} from 'react-quill';
import 'react-quill/dist/quill.snow.css';

interface Props {
  visiable?: boolean;
  onSubmit?: (string) => void;
  setClose?: () => void;
}

const ReferralModal: React.FC<Props> = (props: Props) => {
  const [note, setNote] = React.useState('');

  const handleCancel = () => {
    if (props.setClose) {
      setNote('');
      props.setClose();
    }
  };

  const onClick = () => {
    if (props.onSubmit) {
      props.onSubmit(note);
    }
  };

  return (
    <div>
      <Modal
        centered
        closable
        visible={props.visiable}
        onCancel={handleCancel}
        footer={null}
        width={950}
        bodyStyle={{
          height: 700,
        }}>
        <div className="referralModal-content-wrapper">
          <p className="referralModal-content-text">
            Leave your referrer a note
          </p>
          <ReactQuill
            theme="snow"
            value={note}
            onChange={setNote}
            className="referralModal-content-box"
          />
          <Button
            className="referralModal-content-button"
            type="default"
            onClick={handleCancel}>
            <p className="referralModal-content-button-cancel">Cancel</p>
          </Button>
          <Button
            className="referralModal-content-button"
            type="primary"
            onClick={onClick}>
            <p className="referralModal-content-button-submit">Submit</p>
          </Button>
        </div>
      </Modal>
    </div>
  );
};

export default ReferralModal;
