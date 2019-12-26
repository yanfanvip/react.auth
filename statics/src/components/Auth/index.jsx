import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import Exception from '@/components/Exception';
import Storage from '@/service/storage'

const DATA = {
    user : Storage.getStore('user'),
    auth : Storage.getStore('auth') || [],
}

const Auth = ({ children, auth=null }) => {
    if (withAuth(auth)) {
        return children;
    } else { return null }
}

const AuthRouter = (props) => {
    const { component: Component,  ...rest } = props;
    if(withAuth(props.auth)){
        return (<Route {...rest} render={(props) => <Component {...props} {...rest} />} />);
    }else if(props.authFail){
        return <Redirect exact key={props.path + '-' + props.authFail} from={props.path} to={props.authFail}/>
    }else{
        return <Exception statusCode="403" description={'抱歉，您没有权限访问该页面'}/> 
    }
}

const withAuth = (auth=null) => {
    if(auth == null){ return true }
    if(DATA.user == null){ return false }
    return DATA.auth.indexOf(auth) != -1
}

const Login = (manager) => {
    DATA.user = manager
    DATA.auth = manager.role_detail.authNames
    Storage.setStore("user", manager)
    Storage.setStore("auth", manager.role_detail.authNames)
}

const Loginout = () =>{
    DATA.user = null
    DATA.auth = []
    Storage.removeStore('user')
    Storage.removeStore('auth')
}

export { Auth, withAuth, AuthRouter, Login, Loginout }