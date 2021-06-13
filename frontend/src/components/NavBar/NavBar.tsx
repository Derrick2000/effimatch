import React from 'react';
import TweenOne from 'rc-tween-one';

// antd
import {Menu, Dropdown, Avatar} from 'antd';

// assets
// import Logo from '../../images/logo.png'
import {ReactComponent as Logo} from '../../images/logo.svg';

// redux
import {useSelector} from 'react-redux';
import {logoutUser} from '../../actions/authAction';
import store from '../../store';

import './navbar.less';

const {Item} = Menu;

interface Props {
  isMobile: boolean;
}

const NavBar: React.FC<Props> = (props: Props) => {
  const {isMobile} = props;

  const [phoneOpen, setPhoneOpen] =
    React.useState<boolean | undefined>(undefined);

  const auth = useSelector((state: any) => state.auth);

  // 手机状态下点击菜单按钮
  const onPhoneClick = () => {
    setPhoneOpen(!phoneOpen);
  };

  return (
    <TweenOne
      component="header"
      animation={{opacity: 0, type: 'from'}}
      className="navbar"
      {...props}>
      <div className={`${'navbar-content-wrapper'}${phoneOpen ? ' open' : ''}`}>
        {/* logo */}
        <TweenOne
          animation={{x: -30, type: 'from', ease: 'easeOutQuad'}}
          className="navbar-logo"
          onClick={() => {
            window.location.href = '/';
          }}>
          <Logo />
        </TweenOne>

        {/* 右侧菜单 */}
        {isMobile && (
          <div
            className="navbar-mobile-menu"
            onClick={() => {
              onPhoneClick();
            }}>
            <em />
            <em />
            <em />
          </div>
        )}
        <TweenOne
          className="navbar-menu"
          animation={
            isMobile
              ? {
                  x: 0,
                  height: 0,
                  duration: 300,
                  onComplete: e => {
                    if (phoneOpen) {
                      e.target.style.height = 'auto';
                    }
                  },
                  ease: 'easeInOutQuad',
                }
              : undefined
          }
          moment={phoneOpen ? 300 : undefined}
          reverse={!!phoneOpen}>
          <Menu mode={isMobile ? 'inline' : 'horizontal'} theme="light">
            {auth.isAuthenticated ? renderLoggedInRightMenu : rightMenuChildren}
            {auth.isAuthenticated ? <UserAvatar /> : undefined}
          </Menu>
        </TweenOne>
      </div>
    </TweenOne>
  );
};

// 最右侧菜单的data
const rightMenuData = [
  {
    name: 'Jobs',
    className: 'navbar-item',
    children: {
      href: '/search',
      text: 'Jobs',
    },
  },
  {
    name: 'Community',
    className: 'navbar-item',
    children: {
      href: '#Community',
      text: 'Community',
    },
  },
  {
    name: 'Sign In',
    className: 'navbar-item',
    children: {
      href: '/sign-in',
      text: 'Sign In',
    },
  },
  {
    name: 'Join',
    className: 'navbar-item',
    children: {
      href: '/sign-up',
      text: 'Join',
    },
  },
];

const rightMenuChildren: React.ReactNode = rightMenuData.map(item => (
  <Item key={item.name} className="navbar-item">
    <a href={item.children.href} className="navbar-item-block">
      {item.children.text}
    </a>
  </Item>
));

const loggedInRightMenuData = [
  {
    name: 'Searcg',
    className: 'navbar-item',
    children: {
      href: '/search',
      text: 'Search',
    },
  },
  {
    name: 'Messages',
    className: 'navbar-item',
    children: {
      href: '/messages',
      text: 'Messages',
    },
  },
  {
    name: 'Community',
    className: 'navbar-item',
    children: {
      href: '/community',
      text: 'Community',
    },
  },
];

const renderLoggedInRightMenu: React.ReactNode = loggedInRightMenuData.map(
  item => (
    <Item key={item.name} className="navbar-item">
      <a href={item.children.href} className="navbar-item-block">
        {item.children.text}
      </a>
    </Item>
  ),
);

// const LoggedInRightMenu = () => {
//   return (
//     <div style={{ display: 'inline' }}>
//       {loggedInRightMenuData.map((item) => (
//         <Item key={item.name} className="navbar-item">
//           <a href={item.children.href} className='navbar-item-block'>
//             {item.children.text}
//           </a>
//         </Item>
//       )
//       )}
//     </div>
//   )
// }

const UserAvatar: React.FC<any> = () => {
  const onLogOut = () => {
    store.dispatch(logoutUser());
  };

  const menu = (
    <Menu>
      <Menu.Item>
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://www.antgroup.com">
          1st menu item
        </a>
      </Menu.Item>
      <Menu.Item disabled>
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://www.aliyun.com">
          2nd menu item
        </a>
      </Menu.Item>
      <Menu.Item disabled>
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://www.luohanacademy.com">
          3rd menu item
        </a>
      </Menu.Item>
      <Menu.Item danger onClick={onLogOut}>
        Log Out
      </Menu.Item>
    </Menu>
  );

  return (
    <Dropdown overlay={menu} className="navbar-avatar">
      <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
    </Dropdown>
  );
};

export default NavBar;
