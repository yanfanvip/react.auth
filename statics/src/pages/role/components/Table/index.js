import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { Table, MenuButton, Dialog } from '@alifd/next'
import IceContainer from '@icedesign/container'
import { withAuth } from '@/components/Auth'
import { Role } from '@/service'

@withRouter
export default class RoleTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      data : []
    };
  }

  componentDidMount = async() => {
    this.loadList()
  }

  loadList = async(page) =>{
    this.setState({ isLoading : true })
    let data = await Role.all()
    this.setState({
      isLoading : false,
      data : data
    })
  }

  edit = (record) =>{
    this.props.history.push({ pathname : `/role/edit/${record.id}`, state : record });
  }

  delete = (record) => {
    Dialog.confirm({
      title: '提示',
      content: '确认删除吗',
      onOk: async() => {
        await Role.del(record.id)
        this.loadList()
      },
    });
  };

  renderOper = (value, index, item) => {
    return (
      <MenuButton label="操作" type="primary" selectMode="single" onItemClick={key => this[key](item) }>
        <MenuButton.Item key={'edit'} disabled={!withAuth('/role/edit')}>编辑</MenuButton.Item>
        <MenuButton.Divider />
        <MenuButton.Item key={'delete'} disabled={!withAuth('/role/delete')}>删除</MenuButton.Item>
      </MenuButton>
    )
  };

  render() {
    const { isLoading, data } = this.state;
    return (
      <div style={styles.container}>
        <IceContainer>
          <Table loading={isLoading} dataSource={data} isZebra>
            <Table.Column title="角色名称" width={280} dataIndex="name" />
            <Table.Column title="角色说明" dataIndex="description" />
            <Table.Column title="操作" width={180} dataIndex="oper" cell={this.renderOper}/>
          </Table>
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
