import http from './http'

export const page = async(index, searchForm) =>{
    return await http.fetchGet(`/api/user/page?page=${index}`, searchForm);
}

export const detail = async(id) =>{
    return await http.fetchGet(`/api/user/${id}`);
}

export const register = async(form) =>{
    return await http.fetchPost(`/api/user/register`, form);
}

export const save = async(form) =>{
    return await http.fetchPost(`/api/user/save`, form);
}