import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { Table, Pagination, MenuButton, Dialog } from '@alifd/next'
import IceContainer from '@icedesign/container'
import { withAuth } from '@/components/Auth'
import { Manager } from '@/service'

@withRouter
export default class UserTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      current : 0,
      total : 0,
      isLoading: true,
      data : [],
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
    this.setState({ current : current - 1 }, ()=>{ this.loadList() })
  };

  loadList = async(page) =>{
    if(page != null){
      this.setState({ current : page })
    }else{
      page = this.state.current
    }
    this.setState({ isLoading : true })
    let data = await Manager.page(page, this.state.filter)
    this.setState({
      current : data.number,
      total : data.totalElements,
      isLoading : false,
      data : data.content
    })
  }

  edit = (record) =>{
    this.props.history.push({ pathname : `/manager/edit/${record.id}`, state : record });
  }

  delete = (record) => {
    Dialog.confirm({
      title: '提示',
      content: '确认删除吗',
      onOk: async() => {
        await Manager.del(record.id)
        this.loadList()
      },
    });
  };

  renderOper = (value, index, item) => {
    return (
      <MenuButton label="操作" type="primary" selectMode="single" onItemClick={key => this[key](item) }>
        <MenuButton.Item key={'edit'} disabled={!withAuth('/manager/edit')}>编辑</MenuButton.Item>
        <MenuButton.Divider />
        <MenuButton.Item key={'delete'} disabled={!withAuth('/manager/delete')}>删除</MenuButton.Item>
      </MenuButton>
    )
  };

  render() {
    const { isLoading, data } = this.state;
    return (
      <div style={styles.container}>
        <IceContainer>
          <Table loading={isLoading} dataSource={data} hasBorder={false}>
            <Table.Column title="姓名" width={180} dataIndex="name" />
            <Table.Column title="账号" width={180} dataIndex="username" />
            <Table.Column title="角色" width={180} dataIndex="role_name" />
            <Table.Column title="状态" width={60} dataIndex="status" cell={(value)=>{
              switch (value) {
                case 'DISABLE': return "禁用"
                case 'ENABLE': return "启用"
                default: return "未知"
              }
            }}/>
            <Table.Column title="操作" width={100} dataIndex="oper" cell={this.renderOper}/>
          </Table>
          <Pagination style={styles.pagination} pageSize={10} current={this.state.current + 1} total={this.state.total} onChange={this.handlePaginationChange}/>
        </IceContainer>
      </div>
    );
  }
}

const styles = {
  pagination: {
    marginTop: '20px',
    textAlign: 'right',
  },
};
