import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import IceContainer from '@icedesign/container';
import { Button, Message, NumberPicker } from '@alifd/next';
import {
  FormBinderWrapper as IceFormBinderWrapper,
  FormBinder as IceFormBinder,
  FormError as IceFormError,
} from '@icedesign/form-binder';
import PageHead from '@/components/PageHead';
import { Setting } from '@/service'

@withRouter
export default class EditForm extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
        value : props.data
    };
  }

  validateAllFormField = () => {
    this.refs.form.validateAll(async(errors, values) => {
      if (errors) { return; }
      await Setting.save("energy_person_award", values)
      Message.success('提交成功');
      this.props.history.push({ pathname : '/setting' });
    });
  };

  render() {
    return (
      <div>
        <PageHead title="直推奖励设置" />
        <IceContainer style={{ padding: '40px' }}>
          <div style={{marginBottom : '50px'}}>设置推荐人获得奖励</div>
          <IceFormBinderWrapper value={this.state.value} ref="form" >
            <div style={styles.formItem}>
              <div style={styles.formLabel}>现金奖励：</div>
              <IceFormBinder name="money" required message="必填">
                <NumberPicker defaultValue={100} min={0} max={10000} style={{ width: '400px' }}/>
              </IceFormBinder>
              <div style={styles.formError}>
                <IceFormError name="money" />
              </div>
            </div>
            <div style={styles.formItem}>
              <div style={styles.formLabel}>能量奖励：</div>
              <IceFormBinder name="gold" required message="必填">
                <NumberPicker defaultValue={1000} min={0} max={100000} style={{ width: '400px' }}/>
              </IceFormBinder>
              <div style={styles.formError}>
                <IceFormError name="gold" />
              </div>
            </div>
            <Button type="primary" onClick={this.validateAllFormField}>
              提 交
            </Button>
          </IceFormBinderWrapper>
        </IceContainer>
      </div>
    );
  }
}

const styles = {
  formItem: {
    marginBottom: '30px',
    display: 'flex',
    alignItems: 'center',
  },
  formLabel: {
    fontWeight: '450',
    width: '200px',
  },
  formError: {
    marginTop: '10px',
  },
  button: {
    marginLeft: '100px',
  },
};
