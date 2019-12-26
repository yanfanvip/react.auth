import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import Img from '@icedesign/img';
import { Table, Button } from '@alifd/next';
import IceContainer from '@icedesign/container';
import { Stage } from '@/service'

@withRouter
export default class StageTable extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      data: []
    };
  }

  componentDidMount = async() => {
    this.loadList()
  }

  loadList = async() =>{
    this.setState({ isLoading : true })
    let stage = await Stage.stage()
    let data = await Stage.all()
    this.setState({
      isLoading : false,
      stage : stage,
      data : data
    })
  }

  renderOper = (value, index, item) => {
    return (<Button type="primary" style={{ marginRight: '5px' }} onClick={()=> this.props.selectStage(item) }> 选择 </Button>);
  };

  render() {
    const { isLoading, data } = this.state;
    return (
      <div style={styles.container}>
        <IceContainer>
          <Table loading={isLoading} dataSource={data} hasBorder={false} fixedHeader={true} maxBodyHeight={400}>
            <Table.Column title="图片" dataIndex="image" cell={(value) => 
              value ? <Img src={value} width={60} height={60}/> : <Img src={require('../images/stage.png')} width={60} height={60}/>
            } width={150} align={'center'}/>
            <Table.Column title="名称" dataIndex="name" />
            <Table.Column title="类型" dataIndex="type" cell={(value, index, item)=>{ return this.state.stage[value] }}/>
            <Table.Column title="售价" dataIndex="price" />
            <Table.Column title="排序" dataIndex="sort" />
            <Table.Column title="描述" dataIndex="description" />
            <Table.Column title="状态" dataIndex="status" cell={(value, index, item)=>{ return value == 1 ? '上架' : '下架' }}/>
            <Table.Column title="操作" width={100} dataIndex="oper" cell={this.renderOper}/>
          </Table>
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
