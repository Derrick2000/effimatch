import React from 'react';
import './popUp.less';

import {Modal, Button} from 'antd';
import {
  CheckCircleFilled,
  WarningFilled,
  SmileTwoTone,
  MehTwoTone,
} from '@ant-design/icons';

export enum PopUpType {
  success,
  warning,
  smile,
  meh,
}
interface PopUpProps {
  visible?: boolean;
  text?: string;
  onConfirm?: () => void;
  confirmButtonText?: string;
  onCancel?: () => void;
  type: PopUpType;
}

const PopUp = (props: PopUpProps) => {
  const {
    onCancel,
    visible: visiable,
    text,
    onConfirm,
    type,
    confirmButtonText,
  } = props;

  return (
    <div>
      <Modal
        centered
        closable
        visible={visiable}
        onCancel={onCancel}
        footer={null}
        width={550}
        bodyStyle={{
          height: 328,
        }}>
        <div className="pop-content-wrapper">
          {type === PopUpType.success && (
            <CheckCircleFilled style={{fontSize: 65, color: '#CBE558'}} />
          )}
          {type === PopUpType.warning && (
            <WarningFilled style={{fontSize: 65, color: '#F6CD29'}} />
          )}
          {type === PopUpType.smile && (
            <SmileTwoTone style={{fontSize: 65}} twoToneColor="#F6CD29" />
          )}
          {type === PopUpType.meh && (
            <MehTwoTone style={{fontSize: 65}} twoToneColor="#F6CD29" />
          )}
          {text ? <p className="pop-content-text">{text}</p> : ''}

          {onConfirm && (
            <div className="pop-content-button-wrapper">
              <Button
                className="card-button"
                type="primary"
                onClick={onConfirm}>
                {confirmButtonText}
              </Button>
              <Button className="card-button" type="default" onClick={onCancel}>
                Cancel
              </Button>
            </div>
          )}
        </div>
      </Modal>
    </div>
  );
};

export default PopUp;
