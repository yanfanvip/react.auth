import React from 'react'
import FormBase from '@/components/FormBase'
import { withRouter } from 'react-router-dom'
import IceContainer from '@icedesign/container'
import { Input, Button, Message, TreeSelect } from '@alifd/next'
import {
	FormBinderWrapper as IceFormBinderWrapper,
	FormBinder as IceFormBinder,
	FormError as IceFormError,
} from '@icedesign/form-binder'
import PageHead from '@/components/PageHead'
import { Role, Auth } from '@/service'

@withRouter
export default class AddForm extends FormBase {

	constructor(props) {
		super(props);
		this.state = {
			...this.initPropState(),
			authdata : []
		}
	}

	componentDidMount = async () => {
		let value = this.state.value
		if(this.edit){
			value = await Role.detail(this.id)
			if (!value.menus) {
				value.menus = {}
			} else {
				value.menus = JSON.parse(value.menus)
			}
		}
		let authtree = await Auth.tree()
		this.setState({ value: value, authdata : [authtree] })
	}

	validateAllFormField = () => {
		this.refs.form.validateAll(async (errors, values) => {
			if (errors) { return }
			if(!this.validateAll(values)){ return }
			await Role.save(values)
			Message.success('提交成功');
			this.props.history.push({ pathname: '/role/index' });
		})
	}

	setMenus = (type, flag) => {
		let value = this.state.value
		value.menus[type] = flag
		this.setState({ value })
	}

	render() {
		return (
			<div>
				<PageHead title="角色管理" />
				<IceContainer style={{ padding: '40px' }}>
					<IceFormBinderWrapper value={this.state.value} ref="form" >
						<div style={styles.formItem}>
							<div style={styles.formLabel}>角色名称：</div>
							<IceFormBinder name="name" required message="必填">
								<Input placeholder="请输入角色名称" style={{ width: '400px' }} />
							</IceFormBinder>
							<div style={styles.formError}>
								<IceFormError name="name" />
							</div>
						</div>
						<div style={styles.formItem}>
							<div style={styles.formLabel}>角色描述：</div>
							<IceFormBinder name="description" required message="必填">
								<Input placeholder="请输入角色描述" style={{ width: '400px' }} />
							</IceFormBinder>
							<div style={styles.formError}>
								<IceFormError name="description" />
							</div>
						</div>
						<div style={styles.formItem}>
							<div style={styles.formLabel}>权限：</div>
							<IceFormBinder name="auths">
								<TreeSelect placeholder="请选择权限" treeCheckedStrategy={'all'} treeDefaultExpandAll multiple treeCheckable treeCheckStrictly
									dataSource={this.state.authdata} style={{ width: '800px' }} />
							</IceFormBinder>
							<div style={styles.formError}>
								<IceFormError name="auths" />
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
