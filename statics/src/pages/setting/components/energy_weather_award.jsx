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
      await Setting.save("energy_weather_award", values)
      Message.success('提交成功');
      this.props.history.push({ pathname : '/setting' });
    });
  };

  render() {
    return (
      <div>
        <PageHead title="天气因素设置" />
        <IceContainer style={{ padding: '40px' }}>
          <div style={{marginBottom : '50px'}}>设置天气因素导致成长值的变化百分比情况</div>
          <IceFormBinderWrapper value={this.state.value} ref="form" >
            <div style={styles.formItem}>
              <div style={styles.formLabel}>晴天：</div>
              <IceFormBinder name="sunnyday" required message="必填">
                <NumberPicker defaultValue={10} min={-100} max={100} style={{ width: '400px' }}/>
              </IceFormBinder>
              <div style={styles.formError}>
                <IceFormError name="sunnyday" />
              </div>
            </div>
            <div style={styles.formItem}>
              <div style={styles.formLabel}>阴天：</div>
              <IceFormBinder name="cloudyday" required message="必填">
                <NumberPicker defaultValue={0} min={-100} max={100} style={{ width: '400px' }}/>
              </IceFormBinder>
              <div style={styles.formError}>
                <IceFormError name="cloudyday" />
              </div>
            </div>
            <div style={styles.formItem}>
              <div style={styles.formLabel}>雨天：</div>
              <IceFormBinder name="rainyday" required message="必填">
                <NumberPicker defaultValue={-10} min={-100} max={100} style={{ width: '400px' }}/>
              </IceFormBinder>
              <div style={styles.formError}>
                <IceFormError name="rainyday" />
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
