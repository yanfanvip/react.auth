import React from 'react';
import Layout from '@icedesign/layout';
import Header from './components/Header';
import Aside from './components/Aside';
import './index.scss';

export default (props) => {

  const { children, ...ext } = props

  return (
    <Layout fixable style={{ minHeight: '100vh' }} className="ice-design-layout">
      <Layout.Aside width={240}>
        <Aside {...ext}/>
      </Layout.Aside>
      <Layout.Section>
        <Layout.Header>
          <Header {...ext}/>
        </Layout.Header>
        <Layout.Main scrollable>
          <div className="main-container">{children}</div>
        </Layout.Main>
      </Layout.Section>
    </Layout>
  );

}