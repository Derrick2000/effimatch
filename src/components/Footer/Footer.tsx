import React from 'react';
import './footer.less';

// antd
import TweenOne from 'rc-tween-one';
import OverPack from 'rc-scroll-anim/lib/ScrollOverPack';

const Footer = () => {
  return (
    <div className="footer-wrapper">
      <OverPack
        playScale={0.05}
        className="footer"
        // {...dataSource.OverPack}
      >
        <TweenOne
          animation={{y: '+=30', opacity: 0, type: 'from'}}
          key="footer"
          // {...dataSource.copyright}
        >
          <span>
            ©2020{' '}
            <a href="/" rel="noreferrer" target="_blank">
              Effimatch
            </a>{' '}
            All Rights Reserved
          </span>
        </TweenOne>
      </OverPack>
    </div>
  );
};

export default Footer;
