import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import IceContainer from '@icedesign/container';
import { Button, Message } from '@alifd/next';
import BraftEditor from 'braft-editor';
import {
  FormBinderWrapper as IceFormBinderWrapper,
} from '@icedesign/form-binder';
import PageHead from '@/components/PageHead';
import { Setting } from '@/service'

@withRouter
export default class EditForm extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
        context : BraftEditor.createEditorState(props.data.context),
        value : {}
    };
  }

  validateAllFormField = () => {
    this.refs.form.validateAll(async(errors, values) => {
      if (errors) { return; }
      let req = {
        context : this.state.context.toHTML()
      }
      await Setting.save("help", req)
      Message.success('提交成功');
      this.props.history.push({ pathname : '/setting' });
    });
  };

  render() {
    return (
      <div>
        <PageHead title="帮助页面设置" />
        <IceContainer style={{ padding: '40px' }}>
          <IceFormBinderWrapper value={this.state.value} ref="form" >
            <div style={{...styles.formItem, flexDirection : 'column', justifyContent : 'flex-start', alignItems: 'flex-start'}}>
              <div style={{...styles.formLabel, marginBottom : '15px'}}>页面内容：</div>
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
