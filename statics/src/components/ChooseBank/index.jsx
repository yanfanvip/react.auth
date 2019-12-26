import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import Img from '@icedesign/img';
import { Table, Pagination, Button } from '@alifd/next';
import IceContainer from '@icedesign/container';
import { Bank } from '@/service'

@withRouter
export default class BankTable extends Component {

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
    let data = await Bank.page(page)
    this.setState({
      current : data.pageIndex,
      total : data.total,
      isLoading : false,
      data : data.datas
    })
  }

  renderOper = (value, index, item) => {
    return (<Button type="primary" style={{ marginRight: '5px' }} onClick={()=> this.props.selectBank(item) }> 选择 </Button>);
  };

  render() {
    const { isLoading, data } = this.state;
    return (
      <div style={styles.container}>
        <IceContainer>
          <Table loading={isLoading} dataSource={data} hasBorder={false} fixedHeader={true} maxBodyHeight={400}>
            <Table.Column dataIndex="logo" cell={(value) => <Img src={value} width={60} height={60}/>} width={150} align={'center'}/>
            <Table.Column title="银行名称" dataIndex="bank_name" />
            <Table.Column title="银行缩写" dataIndex="bank_code" />
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
