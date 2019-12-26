import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Table, Button, Dialog } from '@alifd/next';
import IceContainer from '@icedesign/container';
import { Setting } from '@/service'

@withRouter
export default class TablePlan extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      data: [],
      filter : ''
    };
  }

  componentDidMount() {
    this.loadList(1)
  }

  handleFilterChange = (value) => {
    this.setState({ filter : value.name },()=>{ this.loadList() })
  }

  loadList = async(page) =>{
    this.setState({ isLoading : true })
    let data = await Setting.all();
    data = data.filter(d=>{ 
      return d.description.indexOf(this.state.filter) != -1
    })
    this.setState({
      isLoading : false,
      data : data
    })
  }

  handleDetail = (record) => {
    this.props.history.push({ pathname : `/edit/setting/${record.id}`, state : record });
  }

  renderOper = (value, index, record) => {
    return (
      <div>
        <Button type="primary" style={{ marginRight: '5px' }} onClick={()=>this.handleDetail(record)}> 编辑 </Button>
      </div>
    );
  };

  render() {
    const { isLoading, data } = this.state;
    return (
      <div style={styles.container}>
        <IceContainer>
          <Table loading={isLoading} dataSource={data} hasBorder={false}>
            <Table.Column title="描述" dataIndex="description" />
            <Table.Column title="操作" width={200} cell={this.renderOper}/>
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
