import React from 'react';
import FormBase from '@/components/FormBase'
import { withRouter } from 'react-router-dom';
import IceContainer from '@icedesign/container';
import { Input, Button, Message, Select } from '@alifd/next';
import {
  FormBinderWrapper as IceFormBinderWrapper,
  FormBinder as IceFormBinder,
  FormError as IceFormError,
} from '@icedesign/form-binder';
import PageHead from '@/components/PageHead'
import { Manager, Role } from '@/service'

@withRouter
export default class AddForm extends FormBase {

  constructor(props) {
    super(props);
    this.state = {
			...this.initPropState()
		}
  }

  componentDidMount = async() =>{
    let value = this.state.value
    if(this.edit){
      value = await Manager.detail(this.state.id)
    }
    let role_data = await Role.all()
    let role = []
    role_data.forEach(r => {
      role.push({ label : r.name, value : r.id })
    });
    this.setState({ value, role })
  }

  validateAllFormField = () => {
    this.refs.form.validateAll(async(errors, values) => {
      if (errors) { return; }
      if(!this.validateAll(values)){ return }
      await Manager.save(values)
      Message.success('提交成功');
      this.props.history.push({ pathname : '/manager/index' });
    });
  };

  render() {
    return (
      <div>
        <PageHead title="员工管理" />
        <IceContainer style={{ padding: '40px' }}>
          <IceFormBinderWrapper value={this.state.value} ref="form" >
            <div style={styles.formItem}>
              <div style={styles.formLabel}>姓名：</div>
              <IceFormBinder name="name" required message="必填">
                <Input placeholder="请输入姓名" style={{ width: '400px' }}/>
              </IceFormBinder>
              <div style={styles.formError}>
                <IceFormError name="name" />
              </div>
            </div>
            <div style={styles.formItem}>
              <div style={styles.formLabel}>账号：</div>
              <IceFormBinder name="username" required message="必填">
                <Input placeholder="请输入账号" readOnly={this.edit} style={{ width: '400px' }}/>
              </IceFormBinder>
              <div style={styles.formError}>
                <IceFormError name="username" />
              </div>
            </div>
            <div style={styles.formItem}>
              <div style={styles.formLabel}>密码：</div>
              <IceFormBinder name="password">
                <Input placeholder="请输入密码;若不修改当前密码请留空" style={{ width: '400px' }}/>
              </IceFormBinder>
              <div style={styles.formError}>
                <IceFormError name="password" />
              </div>
            </div>
            <div style={styles.formItem}>
              <div style={styles.formLabel}>角色：</div>
              <IceFormBinder name="role" required>
                <Select placeholder="请选择角色" style={{ width: '400px' }} dataSource={this.state.role} />
              </IceFormBinder>
              <div style={styles.formError}>
                <IceFormError name="role" />
              </div>
            </div>
            <div style={styles.formItem}>
              <div style={styles.formLabel}>状态：</div>
              <IceFormBinder name="status" required message="必填">
                <Select placeholder="请选择状态" style={{ width: '400px' }} dataSource={[{label : '禁用', value : 'DISABLE'},{label : '启用', value : 'ENABLE'}]} />
              </IceFormBinder>
              <div style={styles.formError}>
                <IceFormError name="status" />
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
    width: '80px',
  },
  formError: {
    marginTop: '10px',
  },
  button: {
    marginLeft: '100px',
  },
};
