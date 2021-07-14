import React from 'react';

// antd
import TweenOne from 'rc-tween-one';

// components
import SearchBar from 'components/SearchBar/SearchBar';
import {ReactComponent as HeaderImg} from 'images/searching-telescope.svg';

const Header = () => {
  return (
    <TweenOne animation={{x: 200, type: 'from', ease: 'easeOutQuad'}}>
      <div className="home-header-wrapper">
        <div className="home-header-title">
          <h1>
            Get your <span className="home-header-title-orange">dream job</span>
          </h1>
          <h1>by referral today!</h1>
          <SearchBar />
        </div>

        <div className="home-header-image">
          <HeaderImg />
        </div>
      </div>
    </TweenOne>
  );
};

export default Header;
