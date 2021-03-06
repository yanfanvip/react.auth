import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Nav } from '@alifd/next';
import CustomIcon from '@/components/DynamicIcon'
import { withAuth, Loginout } from '@/components/Auth'
import { headerMenuConfig } from '@/menu';
import './index.scss';

@withRouter
export default class Header extends Component {
  render() {
    const { location = {} } = this.props;
    const { pathname } = location;
    return (
      <div className="header-container">
        <div className="header-navbar">
          <Nav className="header-navbar-menu" selectedKeys={[pathname]} defaultSelectedKeys={[pathname]} direction="hoz" type="secondary" >
            {headerMenuConfig && headerMenuConfig.length > 0 && headerMenuConfig.map((nav, index) => {
                if(!withAuth(nav.path) && !nav.logout){ return null }
                let click = nav.logout ? () => { Loginout() } : null
                if (nav.children && nav.children.length > 0) {
                  return (
                    <Nav.SubNav triggerType="click" key={index} onClick={click}
                      title={<span>{nav.icon ? (<CustomIcon size="s" type={nav.icon} />) : null}<span>{nav.name}</span></span>}>
                      {nav.children.map((item) => {
                        const linkProps = {};
                        if (item.external) {
                          if (item.newWindow) { linkProps.target = '_blank'; }
                          linkProps.href = item.path;
                          return (
                            <Nav.Item key={item.path}>
                              <a {...linkProps}>
                                <span>{item.name}</span>
                              </a>
                            </Nav.Item>
                          );
                        }
                        linkProps.to = item.path;
                        return (
                          <Nav.Item key={item.path}>
                            <Link {...linkProps}><span>{item.name}</span></Link>
                          </Nav.Item>
                        );
                      })}
                    </Nav.SubNav>
                  );
                }
                const linkProps = {};
                if (nav.external) {
                  if (nav.newWindow) { linkProps.target = '_blank'; }
                  linkProps.href = nav.path;
                  return (
                    <Nav.Item key={nav.path} onClick={click}>
                      <a {...linkProps}>
                        <span>
                          {nav.icon ? (<CustomIcon size="small" type={nav.icon} />) : null}
                          {nav.name}
                        </span>
                      </a>
                    </Nav.Item>
                  );
                }
                linkProps.to = nav.path;
                return (
                  <Nav.Item key={nav.path} onClick={click}>
                    <Link {...linkProps}>
                      <span>
                        {nav.icon ? (<CustomIcon size="small" type={nav.icon} />) : null}
                        {nav.name}
                      </span>
                    </Link>
                  </Nav.Item>
                );
              })}
          </Nav>
        </div>
      </div>
    );
  }
}
