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
      await Setting.save("energy_produced_setting", values)
      Message.success('提交成功');
      this.props.history.push({ pathname : '/setting' });
    });
  };

  render() {
    return (
      <div>
        <PageHead title="能量产出设置" />
        <IceContainer style={{ padding: '40px' }}>
          <div style={{marginBottom : '50px'}}>每隔指定时间生成能量</div>
          <IceFormBinderWrapper value={this.state.value} ref="form" >
            <div style={styles.formItem}>
              <div style={styles.formLabel}>能量产出时间(分钟)：</div>
              <IceFormBinder name="output" required message="必填">
                <NumberPicker defaultValue={120} min={30} max={9999} style={{ width: '400px' }}/>
              </IceFormBinder>
              <div style={styles.formError}>
                <IceFormError name="output" />
              </div>
            </div>
            <div style={styles.formItem}>
              <div style={styles.formLabel}>能量产出最大值：</div>
              <IceFormBinder name="size" required message="必填">
                <NumberPicker defaultValue={20} min={1} max={1000} style={{ width: '400px' }}/>
              </IceFormBinder>
              <div style={styles.formError}>
                <IceFormError name="size" />
              </div>
            </div>
            <div style={styles.formItem}>
              <div style={styles.formLabel}>未收取能量数（超过不再产出）：</div>
              <IceFormBinder name="presence_number" required message="必填">
                <NumberPicker defaultValue={10} min={1} max={100} style={{ width: '400px' }}/>
              </IceFormBinder>
              <div style={styles.formError}>
                <IceFormError name="presence_number" />
              </div>
            </div>
            <div style={styles.formItem}>
              <div style={styles.formLabel}>未收取存在天数（超过天数消失）：</div>
              <IceFormBinder name="presence_day" required message="必填">
                <NumberPicker defaultValue={30} min={1} max={100} style={{ width: '400px' }}/>
              </IceFormBinder>
              <div style={styles.formError}>
                <IceFormError name="presence_day" />
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
