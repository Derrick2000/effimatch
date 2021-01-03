import React from 'react';
import TweenOne from 'rc-tween-one';

// antd
import { Menu } from 'antd';

// assets
import Logo from '../images/logo.png'

const { Item } = Menu;

interface Props {
    isMobile: boolean;
}

const NavBar: React.FC<Props> = (props: Props) => {
    const { isMobile } = props;

    const [ phoneOpen, setPhoneOpen ] = React.useState<boolean | undefined>(undefined)

    const onPhoneClick = () => {
        setPhoneOpen(!phoneOpen);
    }

    return (
        <TweenOne
        component="header"
        animation={{ opacity: 0, type: 'from' }}
        // {...dataSource.wrapper}
        className='navbar'
        {...props}
      >
        <div
            className={`${'navbar-content-wrapper'}${phoneOpen ? ' open' : ''}`}
        >
          <TweenOne
            animation={{ x: -30, type: 'from', ease: 'easeOutQuad' }}
            className="navbar-logo"
          >
            <img height="45px" src={Logo} alt="logo_img" />
          </TweenOne>

          <TweenOne
            animation={{ x: -30, type: 'from', ease: 'easeOutQuad' }}
            className="navbar-middle-menu"
          >
            <Menu
              mode='horizontal'
              theme="light"
            >
              {middleMenuChildren}
            </Menu>
          </TweenOne>

          {isMobile && (
            <div
                className="navbar-mobile-menu"
                onClick={() => {
                onPhoneClick();
              }}
            >
              <em />
              <em />
              <em />
            </div>
          )}
          <TweenOne
            className='navbar-menu'
            animation={
              isMobile
                ? {
                    x: 0,
                    height: 0,
                    duration: 300,
                    onComplete: (e) => {
                      if (phoneOpen) {
                        e.target.style.height = 'auto';
                      }
                    },
                    ease: 'easeInOutQuad',
                  }
                : undefined
            }
            moment={phoneOpen ? 300 : undefined}
            reverse={!!phoneOpen}
          >
            <Menu
              mode={isMobile ? 'inline' : 'horizontal'}
              theme="light"
            >
              {rightMenuChildren}
            </Menu>
          </TweenOne>
        </div>
      </TweenOne>
    )
}

const rightMenuData = [
    {
      name: 'item0',
      className: 'navbar-item',
      children: {
        href: '#Join',
        text: "Join"
      },
    },
    {
      name: 'Skills',
      className: 'navbar-item',
      children: {
        href: '#Sign In',
        text: "Sign In"
      },
    },
];

const rightMenuChildren: React.ReactNode = rightMenuData.map((item) => (
    <Item key={item.name} className="navbar-item">
        <a href={item.children.href} className='navbar-item-block'>
        {item.children.text}
        </a>
    </Item>
))

const middleMenuData = [
    {
        name: 'item0',
        className: 'navbar-item',
        children: {
          href: '#',
          text: "Jobs"
        },
      },
      {
        name: 'Skills',
        className: 'navbar-item',
        children: {
          href: '#Skills',
          text: "Community"
        },
      },
]

const middleMenuChildren: React.ReactNode = middleMenuData.map((item) => (
    <Item key={item.name} className="navbar-item-a">
        <a href={item.children.href} className='navbar-item-block-a'>
        {item.children.text}
        </a>
    </Item>  
))

export default NavBar;