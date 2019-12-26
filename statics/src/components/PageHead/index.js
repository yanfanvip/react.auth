import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Button, Icon } from '@alifd/next';
import { Auth } from '@/components/Auth'

@withRouter
export default class PageHead extends Component {

  constructor(props) {
    super(props);
    let stacks = []
    props.history.location.pathname.split('/').forEach(p=>{
      if(p){ stacks.push(p) }
    })
    this.state = {
      stacks : stacks
    }
  }

  goBack = () =>{
    this.props.history.goBack()
  }

  render(){
    return (
      <div style={{ ...styles.container, ...this.props.style }}>
        <div style={{display: 'flex',flexDirection : 'row'}}>
          { this.state.stacks.length > 1 ? <Icon type="arrow-left" style={{paddingLeft:'10px',paddingRight:'10px',cursor:'pointer'}} onClick={()=>{this.goBack()}}/> : null }
          <h3 style={styles.title}>{this.props.title}</h3>
        </div>
        {this.props.buttonText ? (
          <Auth auth={this.props.auth}>
            <Button type="primary" onClick={this.props.onClick}>
              {this.props.buttonText}
            </Button>
          </Auth>
        ) : null}
      </div>
    );
  }
}

const styles = {
  container: {
    margin: '0 10px 20px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  title: {
    margin: '0',
    padding: '0',
    fonSize: '16px',
    color: 'rgba(0, 0, 0, 0.85)',
    fontWeight: '500',
  },
};