import React from 'react';
import './popUp.less'

import { Modal, Button } from 'antd';
import { CheckCircleFilled } from '@ant-design/icons'

interface Props {
    visiable?: boolean,
    text?: string,
    onClick?: Function
    setClose?: Function
}

const PopUp:React.FC<Props> = (props: Props) => {
    const [showButton, setShow] = React.useState(props.onClick? true : false);

    const handleCancel = () => {
        if(props.setClose) props.setClose();
    }

    const onClick = () => {
        if(props.onClick) props.onClick();
    }

    return (
        <div>
            <Modal
                centered
                closable
                visible={props.visiable}
                onCancel={handleCancel}
                footer={null}
                width={550}
                bodyStyle={{
                    height: 328
                }}
            >
                <div className="pop-content-wrapper">
                    <CheckCircleFilled style={{fontSize: 65, color:'#CBE558'}}/>
                    {props.text? 
                        <p className="pop-content-text">{props.text}</p> 
                        : 
                        ""
                    }
                    {showButton &&
                        <Button className="pop-content-button" type='primary' onClick={onClick}>
                            <p className="pop-content-button-text">Add Positions</p>
                        </Button>
                    }
                </div>
            </Modal>
        </div>
    )
}

export default PopUp;