import http from './http'
import { Login, Loginout } from '@/components/Auth'

export const login = async(login) =>{
    let user = await http.fetchPost(`/api/manager/login`, login)
    if(user){
        Login(user)
    }
    return user
}

export const loginout = async(login) =>{
    Loginout()
    await http.fetchPost(`/api/manager/loginout`, login)
    return {}
}

export const page = async(index, searchForm) =>{
    return await http.fetchGet(`/api/manager/page?page=${index}`, searchForm);
}

export const detail = async(id) =>{
    return await http.fetchGet(`/api/manager/${id}`);
}

export const save = async(form) =>{
    return await http.fetchPost(`/api/manager/save`, form);
}

export const del = async(id) =>{
    return await http.fetchPost(`/api/manager/delete/${id}`, {});
}