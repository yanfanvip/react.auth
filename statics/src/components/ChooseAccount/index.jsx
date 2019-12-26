import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Table, Pagination, Button } from '@alifd/next';
import IceContainer from '@icedesign/container';
import Filter from './Filter';
import { Account } from '@/service'

@withRouter
export default class AccountTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      current : 1,
      total : 0,
      isLoading: true,
      school : [],
      data: [],
      filter : {}
    };
  }

  componentDidMount = async() => {
    this.loadList()
  }

  handleFilterChange = (filter) => {
    this.setState({ filter : filter, current : 1 }, ()=>{ this.loadList() })
  };

  handlePaginationChange = (current) => {
    this.setState({ current : current }, ()=>{ this.loadList() })
  };

  loadList = async(page) =>{
    if(page != null){
      this.setState({ current : page })
    }else{
      page = this.state.current
    }
    this.setState({ isLoading : true })
    let data = await Account.page(page, this.state.filter)
    this.setState({
      current : data.pageIndex,
      total : data.total,
      isLoading : false,
      data : data.datas
    })
  }

  renderOper = (value, index, item) => {
    return (<Button type="primary" style={{ marginRight: '5px' }} onClick={()=> this.props.selectAccount(item) }> 选择 </Button>);
  };

  render() {
    const { isLoading, data } = this.state;
    return (
      <div style={styles.container}>
        <IceContainer>
          <Filter onChange={this.handleFilterChange} />
        </IceContainer>
        <IceContainer>
          <Table loading={isLoading} dataSource={data} hasBorder={false} fixedHeader={true} maxBodyHeight={400}>
            <Table.Column title="姓名" dataIndex="truename" />
            <Table.Column title="账号" dataIndex="phone" />
            <Table.Column title="机器编码" dataIndex="mac" />
            <Table.Column title="操作" width={100} dataIndex="oper" cell={this.renderOper}/>
          </Table>
          <Pagination style={styles.pagination} pageSize={10} current={this.state.current} total={this.state.total} onChange={this.handlePaginationChange}/>
        </IceContainer>
      </div>
    );
  }
}

const styles = {
  container : {
    backgroundColor : '#fff',
    width : '800px',
    height : '600px'
  },
  pagination: {
    marginTop: '20px',
    textAlign: 'right',
  },
};
