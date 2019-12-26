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
      await Setting.save("status_assist_setting", values)
      Message.success('提交成功');
      this.props.history.push({ pathname : '/setting' });
    });
  };

  render() {
    return (
      <div>
        <PageHead title="互动阈值设置" />
        <IceContainer style={{ padding: '40px' }}>
          <div style={{marginBottom : '50px'}}>当树木健康度低于此设置值时，将无法得到朋友的帮助</div>
          <IceFormBinderWrapper value={this.state.value} ref="form" >
          <div style={styles.formItem}>
              <div style={styles.formLabel}>湿润度指数：</div>
              <IceFormBinder name="water" required message="必填">
                <NumberPicker defaultValue={10} min={0} max={100} style={{ width: '400px' }}/>
              </IceFormBinder>
              <div style={styles.formError}>
                <IceFormError name="water" />
              </div>
            </div>
            <div style={styles.formItem}>
              <div style={styles.formLabel}>杂草指数：</div>
              <IceFormBinder name="weed" required message="必填">
                <NumberPicker defaultValue={10} min={0} max={100} style={{ width: '400px' }}/>
              </IceFormBinder>
              <div style={styles.formError}>
                <IceFormError name="weed" />
              </div>
            </div>
            <div style={styles.formItem}>
              <div style={styles.formLabel}>虫害指数：</div>
              <IceFormBinder name="pest" required message="必填">
                <NumberPicker defaultValue={10} min={0} max={100} style={{ width: '400px' }}/>
              </IceFormBinder>
              <div style={styles.formError}>
                <IceFormError name="pest" />
              </div>
            </div>
            <div style={styles.formItem}>
              <div style={styles.formLabel}>营养指数：</div>
              <IceFormBinder name="nutrition" required message="必填">
                <NumberPicker defaultValue={10} min={0} max={100} style={{ width: '400px' }}/>
              </IceFormBinder>
              <div style={styles.formError}>
                <IceFormError name="nutrition" />
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
