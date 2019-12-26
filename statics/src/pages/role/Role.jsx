import React, { Component } from 'react';
import Table from './components/Table';
import PageHead from '@/components/PageHead';

export default class roles extends Component {

  handleClick = () => {
    this.props.history.push('/role/add');
  };

  render() {
    return (
      <div>
        <PageHead title="角色管理" buttonText="添加角色" auth="/role/add" onClick={this.handleClick}/>
        <Table />
      </div>
    );
  }
}
