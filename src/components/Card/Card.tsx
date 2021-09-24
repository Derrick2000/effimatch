import React from 'react';
import {Button} from 'antd/lib';
import {Avatar} from 'antd';
import {useHistory} from 'react-router-dom';
import './cardStyle.less';

interface CardProps {
  title?: string;
  company?: string;
  logo?: string;
  avatar?: string;
  name?: string;
  id?: number;
  applied: boolean;
}

const Card = (props: CardProps) => {
  const history = useHistory();
  const {title, company, logo, avatar, name, id, applied} = props;

  const handleClickGetReferred = ev => {
    ev.preventDefault();
    history.push(`/jobs/${props.id}`, {showNoteModal: true});
  };

  const getRedirectPath = () => {
    return '/jobs/' + props.id;
  };

  return (
    <a className="card-block-group" href={getRedirectPath()}>
      <div className="card-header-wrapper">
        <div className="card-header-title">
          <h1>{title}</h1>
          <p>@{company}</p>
        </div>
        <img
          src={logo}
          alt="logo"
          className="card-image"
          style={{maxWidth: 60, maxHeight: 40}}
        />
      </div>

      <div className="card-avatar-wrapper">
        {avatar ? (
          <img src={avatar} alt="avatar" className="card-avatar-image" />
        ) : (
          <Avatar style={{borderRadius: 10}} shape="square">
            {'D'}
          </Avatar>
        )}

        <p className="card-avatar-text">{name}</p>
      </div>
      <Button
        type="primary"
        className="card-button"
        onClick={handleClickGetReferred}
        disabled={applied}>
        {applied ? 'Applied ✔' : 'Get Referral'}
      </Button>
    </a>
  );
};

export default Card;
