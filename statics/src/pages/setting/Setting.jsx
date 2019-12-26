import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import Table from './components/Table'
import PageHead from '@/components/PageHead';

@withRouter
export default class Setting extends Component {

  render() {
    return (
      <div>
        <PageHead title="系统配置管理"/>
        <Table/>
      </div>
    );
  }
}
