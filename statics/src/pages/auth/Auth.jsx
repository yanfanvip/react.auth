import React, { Component } from 'react';
import Table from './components/Table';
import PageHead from '@/components/PageHead';

export default class AuthPage extends Component {

  render() {
    return (
      <div>
        <PageHead title="权限管理" />
        <Table />
      </div>
    );
  }
}
