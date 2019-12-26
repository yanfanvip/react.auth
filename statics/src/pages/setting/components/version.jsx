import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import IceContainer from '@icedesign/container';
import { Button, Message, Input, NumberPicker } from '@alifd/next';
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
      await Setting.save("version", values)
      Message.success('提交成功');
      this.props.history.push({ pathname : '/setting' });
    });
  };

  render() {
    return (
      <div>
        <PageHead title="版本设置" />
        <IceContainer style={{ padding: '40px' }}>
          <div style={{marginBottom : '50px'}}>设置当前最新的版本号码</div>
          <IceFormBinderWrapper value={this.state.value} ref="form" >
            <div style={styles.formItem}>
              <div style={styles.formLabel}>版本号：</div>
              <IceFormBinder name="version" required message="必填">
                <Input style={{ width: '400px' }}/>
              </IceFormBinder>
              <div style={styles.formError}>
                <IceFormError name="version" />
              </div>
            </div>
            <div style={styles.formItem}>
              <div style={styles.formLabel}>代码：</div>
              <IceFormBinder name="code" required message="必填">
                <NumberPicker defaultValue={0} style={{ width: '400px' }}/>
              </IceFormBinder>
              <div style={styles.formError}>
                <IceFormError name="code" />
              </div>
            </div>
            <div style={styles.formItem}>
              <div style={styles.formLabel}>下载链接：</div>
              <IceFormBinder name="url" required message="必填">
                <Input style={{ width: '400px' }}/>
              </IceFormBinder>
              <div style={styles.formError}>
                <IceFormError name="url" />
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
