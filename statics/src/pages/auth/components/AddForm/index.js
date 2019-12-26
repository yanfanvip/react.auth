import React from 'react'
import FormBase from '@/components/FormBase'
import { withRouter } from 'react-router-dom'
import IceContainer from '@icedesign/container'
import { Input, Button, Message } from '@alifd/next'
import {
	FormBinderWrapper as IceFormBinderWrapper,
	FormBinder as IceFormBinder,
	FormError as IceFormError,
} from '@icedesign/form-binder'
import PageHead from '@/components/PageHead'
import { Auth } from '@/service'

@withRouter
export default class AddForm extends FormBase {

	constructor(props) {
		super(props);
		this.state = this.initPropState()
	}

	componentDidMount = async () => {
		if(this.edit){
			let detail = await Auth.detail(this.id)
			this.setState({ value : detail })
		}
	}

	validateAllFormField = () => {
		this.refs.form.validateAll(async (errors, values) => {
			if (errors) { return; }
			if(!this.validateAll(values)){ return }
			await Auth.save(values)
			Message.success('提交成功');
			this.props.history.push({ pathname : '/auth/index' });
		});
	};

	render() {
		return (
			<div>
				<PageHead title="权限管理" />
				<IceContainer style={{ padding: '40px' }}>
					<IceFormBinderWrapper value={this.state.value} ref="form" >
						<div style={styles.formItem}>
							<div style={styles.formLabel}>权限名称：</div>
							<IceFormBinder name="name" required message="必填">
								<Input placeholder="请输入权限名称" style={{ width: '400px' }} />
							</IceFormBinder>
							<div style={styles.formError}>
								<IceFormError name="name" />
							</div>
						</div>
						<div style={styles.formItem}>
							<div style={styles.formLabel}>权限参数：</div>
							<IceFormBinder name="auth" required message="必填">
								<Input placeholder="请输入权限参数" style={{ width: '400px' }} />
							</IceFormBinder>
							<div style={styles.formError}>
								<IceFormError name="auth" />
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
