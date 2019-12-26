import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import Img from '@icedesign/img';
import { Table, Pagination, Button } from '@alifd/next';
import IceContainer from '@icedesign/container';
import Filter from './Filter';
import { User } from '@/service'

@withRouter
export default class UserTable extends Component {
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
    let data = await User.page(page, this.state.filter)
    this.setState({
      current : data.pageIndex,
      total : data.total,
      isLoading : false,
      data : data.datas
    })
  }

  renderOper = (value, index, item) => {
    return (<Button type="primary" style={{ marginRight: '5px' }} onClick={()=> this.props.selectUser(item) }> 选择 </Button>);
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
            <Table.Column title="头像" dataIndex="avatar" cell={(value) => 
              value ? <Img src={value} width={60} height={60}/> : <Img src={require('../images/avarta.png')} width={60} height={60}/>
            } width={150} align={'center'}/>
            <Table.Column title="昵称" dataIndex="nickname" />
            <Table.Column title="性别" dataIndex="gender" cell={(value)=>{
              switch (value) {
                case 1: return "男"
                case 2: return "女"
                default: return "未知"
              }
            }}/>
            <Table.Column title="积分" dataIndex="gold" />
            <Table.Column title="状态" dataIndex="status" cell={(value)=>{
              switch (value) {
                case 0: return "未激活"
                case 1: return "正常"
                case 2: return "已删除"
                default: return "未知"
              }
            }}/>
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
