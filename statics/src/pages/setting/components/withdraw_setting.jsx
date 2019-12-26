import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import IceContainer from '@icedesign/container';
import { Button, Message, NumberPicker } from '@alifd/next';
import {
  FormBinderWrapper as IceFormBinderWrapper,
  FormBinder as IceFormBinder,
  FormError as IceFormError,
} from '@icedesign/form-binder';
import BraftEditor from 'braft-editor';
import PageHead from '@/components/PageHead';
import { Setting } from '@/service'

@withRouter
export default class EditForm extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
        context : BraftEditor.createEditorState(props.data.context),
        value : props.data
    };
  }

  validateAllFormField = () => {
    this.refs.form.validateAll(async(errors, values) => {
      if (errors) { return; }
      values.context = this.state.context.toHTML()
      await Setting.save("withdraw_setting", values)
      Message.success('提交成功');
      this.props.history.push({ pathname : '/setting' });
    });
  };

  render() {
    return (
      <div>
        <PageHead title="提现设置" />
        <IceContainer style={{ padding: '40px' }}>
          <div style={{marginBottom : '50px'}}>设置金币和人民币的兑换比例</div>
          <IceFormBinderWrapper value={this.state.value} ref="form" >
            <div style={styles.formItem}>
              <div style={styles.formLabel}>兑换比例：</div>
              <IceFormBinder name="scale" required message="必填">
                <NumberPicker defaultValue={10} min={0} max={100} style={{ width: '400px' }}/>
              </IceFormBinder>
              <div style={styles.formError}>
                <IceFormError name="scale" />
              </div>
            </div>
            <div style={{...styles.formItem, flexDirection : 'column', justifyContent : 'flex-start', alignItems: 'flex-start'}}>
              <div style={{...styles.formLabel, marginBottom : '15px'}}>提现说明：</div>
              <div style={{width: '100%'}}>
                <BraftEditor height={500} contentFormat='html' value={this.state.context} onChange={(editorState)=>{ this.setState({ context : editorState}) }}/>
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
