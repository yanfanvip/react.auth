import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { Table, MenuButton, Dialog, Message } from '@alifd/next'
import IceContainer from '@icedesign/container'
import { withAuth } from '@/components/Auth'
import { Auth as Service } from '@/service'

@withRouter
export default class UserTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      data : []
    }
  }

  componentDidMount = async() => {
    this.loadList()
  }

  loadList = async() =>{
    this.setState({ isLoading : true })
    let data = await Service.tree()
    this.setState({
      isLoading : false,
      data : data
    })
  }

  add = (item) =>{
    this.props.history.push({ pathname : `/auth/add/${item.id}`, state : item })
  }

  edit = (item) =>{
    this.props.history.push({ pathname : `/auth/edit/${item.id}`, state : item })
  }

  delete = (item) => {
    Dialog.confirm({
      title: '提示',
      content: '是否做此操作?',
      onOk: async() => {
        await Service.del(item.id)
        this.loadList()
        Message.success('删除成功');
      }
    })
  }

  renderOper = (value, index, item) => {
    return (
      <MenuButton label="操作" type="primary" selectMode="single" onItemClick={key => this[key](item) }>
        <MenuButton.Item key={'add'} disabled={!withAuth('/auth/add')}>新增</MenuButton.Item>
        <MenuButton.Item key={'edit'} disabled={!withAuth('/auth/edit')}>编辑</MenuButton.Item>
        <MenuButton.Divider />
        <MenuButton.Item key={'delete'} disabled={!withAuth('/auth/delete')}>删除</MenuButton.Item>
      </MenuButton>
    )
  }

  render() {
    const { isLoading, data } = this.state;
    return (
      <div style={styles.container}>
        <IceContainer>
          <Table loading={isLoading} dataSource={[data]} isTree indent={40} isZebra>
            <Table.Column title="名称" dataIndex="name" />
            <Table.Column title="参数" dataIndex="auth" />
            <Table.Column title="操作" width={180} dataIndex="oper" cell={this.renderOper}/>
          </Table>
        </IceContainer>
      </div>
    )
  }
}

const styles = {
  pagination: {
    marginTop: '20px',
    textAlign: 'right',
  },
};
