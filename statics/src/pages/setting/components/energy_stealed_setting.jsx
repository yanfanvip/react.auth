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
      await Setting.save("energy_stealed_setting", values)
      Message.success('提交成功');
      this.props.history.push({ pathname : '/setting' });
    });
  };

  render() {
    return (
      <div>
        <PageHead title="能量偷取设置" />
        <IceContainer style={{ padding: '40px' }}>
          <div style={{marginBottom : '50px'}}>最多能够被偷取的百分比设置</div>
          <IceFormBinderWrapper value={this.state.value} ref="form" >
            <div style={styles.formItem}>
              <div style={styles.formLabel}>能量偷取百分比：</div>
              <IceFormBinder name="stealedenergy" required message="必填">
                <NumberPicker defaultValue={5} min={0} max={99} style={{ width: '400px' }}/>
              </IceFormBinder>
              <div style={styles.formError}>
                <IceFormError name="stealedenergy" />
              </div>
            </div>
            <div style={styles.formItem}>
              <div style={styles.formLabel}>能量最多被偷取次数：</div>
              <IceFormBinder name="stealed" required message="必填">
                <NumberPicker defaultValue={4} min={0} max={99} style={{ width: '400px' }}/>
              </IceFormBinder>
              <div style={styles.formError}>
                <IceFormError name="stealed" />
              </div>
            </div>
            <div style={styles.formItem}>
              <div style={styles.formLabel}>帮助时获取能量比例：</div>
              <IceFormBinder name="assistenergy" required message="必填">
                <NumberPicker defaultValue={5} min={0} max={99} style={{ width: '400px' }}/>
              </IceFormBinder>
              <div style={styles.formError}>
                <IceFormError name="assistenergy" />
              </div>
            </div>
            <div style={styles.formItem}>
              <div style={styles.formLabel}>每日最多获得帮助次数：</div>
              <IceFormBinder name="assist" required message="必填">
                <NumberPicker defaultValue={4} min={0} max={99} style={{ width: '400px' }}/>
              </IceFormBinder>
              <div style={styles.formError}>
                <IceFormError name="assist" />
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
