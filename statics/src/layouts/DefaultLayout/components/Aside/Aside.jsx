import React, { Component } from 'react';
import { Nav } from '@alifd/next';
import { withRouter, Link } from 'react-router-dom';
import Logo from '../Logo';
import { asideMenuConfig } from '@/menu';
import { withAuth } from '@/components/Auth'
import CustomIcon from '@/components/DynamicIcon'
import './Aside.scss';

@withRouter
export default class BasicAside extends Component {

  getMenuLinks = () =>{
    if(!Array.isArray(asideMenuConfig) || asideMenuConfig.length <= 0){ return null }
    let links = []
    asideMenuConfig.map((nav, index) => {
      if(withAuth(nav.path)){
        links.push(
          <Nav.Item key={this.getKey(nav.path)}>
            <Link to={nav.path} className="ice-menu-link">
              {nav.icon ? ( <CustomIcon size="s" type={nav.icon} /> ) : null}
              <span className="ice-menu-item-text">{nav.name}</span>
            </Link>
          </Nav.Item>
        )
      }
    })
    return links
  }

  getKey = (path) => {
    let key = path.split('/').filter(s=> s && s.trim())
    if(key.length > 0){ return key[0] }
    return "index"
  }

  render() {
    const { location } = this.props;
    return (
      <div className="aside-custom-menu">
        <Logo style={{ height: '62px', fontSize: '30px', marginRight: '0', background: '#fff', justifyContent: 'center', borderBottom: '1px solid #f5f5f5', }} />
        <Nav selectedKeys={[this.getKey(location.pathname)]} className="ice-menu-custom" activeDirection="right">
          {this.getMenuLinks()}
        </Nav>
      </div>
    );
  }
}
