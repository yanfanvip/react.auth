import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import Img from '@icedesign/img';
import { Table, Pagination, Button } from '@alifd/next';
import IceContainer from '@icedesign/container';
import { Bankcard } from '@/service'

@withRouter
export default class BankcardTable extends Component {

  constructor(props) {
    super(props);
    this.state = {
      user : props.user,
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

  UNSAFE_componentWillReceiveProps = (newProps) =>{
    if(newProps.user != this.state.user){
      this.setState({user : newProps.user})
      this.loadList(1)
    }
  }

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
    let data = await Bankcard.page(this.state.user, page)
    this.setState({
      current : data.pageIndex,
      total : data.total,
      isLoading : false,
      data : data.datas
    })
  }

  renderOper = (value, index, item) => {
    return (<Button type="primary" style={{ marginRight: '5px' }} onClick={()=> this.props.selectBankcard(item) }> 选择 </Button>);
  };

  render() {
    const { isLoading, data } = this.state;
    return (
      <div style={styles.container}>
        <IceContainer>
          <Table loading={isLoading} dataSource={data} hasBorder={false} fixedHeader={true} maxBodyHeight={400}>
            <Table.Column dataIndex="logo" cell={(value) => <Img src={value} width={60} height={60}/>} width={150} align={'center'}/>
            <Table.Column title="卡号" dataIndex="cardcode"/>
            <Table.Column title="所属银行" dataIndex="bankname"/>
            <Table.Column title="开户行" dataIndex="bankaddress"/>
            <Table.Column title="持卡人" dataIndex="name"/>
            <Table.Column title="预留手机号" dataIndex="phone"/>
            <Table.Column title="添加时间" dataIndex="create_time" />
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
    height : '500px'
  },
  pagination: {
    marginTop: '20px',
    textAlign: 'right',
  },
};
