import React, { Component } from 'react';
import Table from './components/Table';
import PageHead from '@/components/PageHead';

export default class Managers extends Component {

  handleClick = () => {
    this.props.history.push('/manager/add');
  };

  render() {
    return (
      <div>
        <PageHead title="员工管理" buttonText="添加员工" onClick={this.handleClick}/>
        <Table />
      </div>
    );
  }
}
