import React, { Component } from 'react';
import { Grid, Input } from '@alifd/next';
import {
  FormBinderWrapper as IceFormBinderWrapper,
  FormBinder as IceFormBinder,
  FormError as IceFormError,
} from '@icedesign/form-binder';

const { Row, Col } = Grid;

export default class Filter extends Component {
  state = {
    value: {},
  };

  timeout = null
  formChange = (value) => {
    if(this.timeout != null){ clearTimeout(this.timeout) }
    this.timeout = setTimeout(()=>{ this.props.onChange(value); }, 500 )
  };

  render() {
    return (
      <IceFormBinderWrapper value={this.state.value} onChange={this.formChange} ref="form">
        <Row wrap gutter="20" style={styles.formRow}>
          <Col l="6">
            <div style={styles.formItem}>
              <span style={styles.formLabel}>昵称：</span>
              <IceFormBinder triggerType="onBlur" name="nickname">
                <Input placeholder="请输入" style={{ width: '200px' }} />
              </IceFormBinder>
              <div style={styles.formError}>
                <IceFormError name="nickname" />
              </div>
            </div>
          </Col>
        </Row>
      </IceFormBinderWrapper>
    );
  }
}

const styles = {
  formItem: {
    display: 'flex',
    alignItems: 'center',
    margin: '10px 0',
  },
  formLabel: {
    minWidth: '80px',
  },
};
