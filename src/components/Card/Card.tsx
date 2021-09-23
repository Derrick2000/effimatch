import React from 'react';
import {Button} from 'antd/lib';
import {useSelector} from 'react-redux';
import {Avatar} from 'antd';
import './cardStyle.less';

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

const Card = (props: CardProps) => {
  const auth: authState = useSelector((state: any) => state.auth);

  const getRedirectPath = () => {
    return auth.isAuthenticated ? '/jobs/' + props.id : '/sign-up';
  };

  return (
    <a className="card-block-group" href={getRedirectPath()}>
      <div className="card-header-wrapper">
        <div className="card-header-title">
          <h1>{props.title}</h1>
          <p>@{props.company}</p>
        </div>
        <img
          src={props.logo}
          alt="logo"
          className="card-image"
          style={{maxWidth: 60, maxHeight: 40}}
        />
      </div>

      <div className="card-avatar-wrapper">
        {props.avatar ? (
          <img src={props.avatar} alt="avatar" className="card-avatar-image" />
        ) : (
          <Avatar style={{borderRadius: 10}} shape="square">
            {'D'}
          </Avatar>
        )}

        <p className="card-avatar-text">{props.name}</p>
      </div>

      <Button type="primary" className="card-button">
        Get Referral
      </Button>
    </a>
  );
};

export default Card;
