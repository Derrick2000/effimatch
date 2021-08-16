import React from 'react';
import {Button} from 'antd/lib';
import './cardStyle.less';
import {useSelector} from 'react-redux';

interface CardProps {
  title?: string;
  company?: string;
  logo?: string;
  avatar?: string;
  name?: string;
  id?: number;
}

type authState = {
  isAuthenticated: boolean;
};

const Card: React.FC<CardProps> = (props: CardProps) => {
  const auth: authState = useSelector((state: any) => state.auth);

  const getRedirectPath = () => {
    return auth.isAuthenticated ? '/jobs/' + props.id : '/sign-in';
  };

  return (
    <a className="card-block-group" href={getRedirectPath()}>
      <div className="card-header-wrapper">
        <div className="card-header-title">
          <h1>{props.title}</h1>
          <p>@ {props.company}</p>
        </div>
        <img
          src={props.logo}
          alt="logo"
          className="card-image"
          style={{maxWidth: 60, maxHeight: 40}}
        />
      </div>

      <div className="card-avatar-wrapper">
        <img src={props.avatar} alt="avatar" />
        <p className="card-avatar-text">{props.name}</p>
      </div>

      <Button type="primary" className="card-button">
        Get Referral
      </Button>
    </a>
  );
};

export default Card;
