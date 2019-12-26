/* eslint react/no-string-refs:0 */
import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Input, Button, Message } from '@alifd/next';
import Img from '@icedesign/img';
import { Grid } from '@alifd/next';
import {
  FormBinderWrapper as IceFormBinderWrapper,
  FormBinder as IceFormBinder,
  FormError as IceFormError,
} from '@icedesign/form-binder';
import IceIcon from '@icedesign/foundation-symbol';
import Footer from './components/Footer';
import Intro from './components/Intro';
import { Manager } from '@/service'

const { Row, Col } = Grid;

@withRouter
class UserLogin extends Component {
  static displayName = 'UserLogin';

  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {
      refreshDate : 0,
      value: {
      },
    };
  }

  componentDidMount = async() => { this.refreshCode() }

  formChange = (value) => { this.setState({ value }) }

  handleSubmit = (e) => {
    e.preventDefault();
    this.refs.form.validateAll(async(errors, values) => {
      if (errors) { return; }
      try {
        let result = await Manager.login(values)
        if(result){
          Message.success('登录成功');
          this.props.history.push('/');
        }
      } catch (error) {
        this.refreshCode()
      }
    })
  }

  refreshCode = () =>{
    this.setState({ refreshDate : new Date().getTime() })
  }

  render() {
    return (
      <div style={styles.pages}>
        <Row wrap style={styles.row}>
          <Col l="12">
            <Intro />
          </Col>
          <Col l="12">
            <div style={styles.form}>
              <div style={styles.container}>
                <h4 style={styles.title}>登 录</h4>
                <IceFormBinderWrapper value={this.state.value} onChange={this.formChange} ref="form">
                  <div style={styles.formItems}>
                    <div style={styles.formItem}>
                      <IceIcon type="person" size="small" style={styles.inputIcon} />
                      <IceFormBinder name="username" required message="必填">
                        <Input
                          size="large"
                          maxLength={20}
                          placeholder="用户名"
                          style={styles.inputCol}
                        />
                      </IceFormBinder>
                      <IceFormError name="username" />
                    </div>

                    <div style={styles.formItem}>
                      <IceIcon type="lock" size="small" style={styles.inputIcon} />
                      <IceFormBinder name="password" required message="必填">
                        <Input
                          size="large"
                          htmlType="password"
                          placeholder="密码"
                          style={styles.inputCol}
                        />
                      </IceFormBinder>
                      <IceFormError name="password" />
                    </div>

                    <div style={styles.formItem}>
                      <IceIcon type="picture" size="small" style={styles.inputIcon} />
                      <IceFormBinder name="code" required message="必填">
                        <Input
                          size="large"
                          maxLength={20}
                          placeholder="验证码"
                          style={styles.inputCol}
                          innerAfter={ <div style={{width:'120px',height:'40px',cursor:'pointer'}} onClick={this.refreshCode}>
                            <Img type='contain' src={'/api/manager/verificationcode?s=' + this.state.refreshDate} width={120} height={40}/>
                          </div> }
                        />
                      </IceFormBinder>
                      <IceFormError name="code" />
                    </div>

                    <div style={styles.footer}>
                      <Button
                        type="primary"
                        size="large"
                        onClick={this.handleSubmit}
                        style={styles.submitBtn}
                      >
                        登 录
                      </Button>
                    </div>
                  </div>
                </IceFormBinderWrapper>
              </div>
            </div>
          </Col>
        </Row>
        <Footer />
      </div>
    );
  }
}

const styles = {
  pages: {
    position: 'relative',
    width: '100wh',
    minWidth: '1200px',
    height: '100vh',
    backgroundImage:
      'url(https://img.alicdn.com/tfs/TB1OpAhC7zoK1RjSZFlXXai4VXa-1350-900.jpg)',
    backgroundSize: 'cover',
    display: 'flex',
    flexDirection: 'column',
  },
  row: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flex: '1',
  },
  form: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  container: {
    width: '400px',
    padding: '40px',
    background: '#fff',
    borderRadius: '6px',
  },
  title: {
    margin: '0 0 40px',
    color: 'rgba(0, 0, 0, 0.8)',
    fontSize: '28px',
    fontWeight: '500',
    textAlign: 'center',
  },
  formItem: {
    position: 'relative',
    marginBottom: '20px',
  },
  inputIcon: {
    position: 'absolute',
    left: '12px',
    top: '12px',
    color: '#666',
  },
  inputCol: {
    width: '100%',
    paddingLeft: '20px',
  },
  submitBtn: {
    width: '100%',
  },
  tips: {
    marginTop: '20px',
    display: 'block',
    textAlign: 'center',
  },
};

export default UserLogin;
