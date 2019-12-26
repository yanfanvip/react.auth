import http from './http'

export const tree = async() =>{
    return await http.fetchGet(`/api/auth/tree`);
}

export const detail = async(id) =>{
    return await http.fetchGet(`/api/auth/${id}`);
}

export const save = async(detail) =>{
    return await http.fetchPost(`/api/auth/save`, detail);
}

export const del = async(id) =>{
    return await http.fetchPost(`/api/auth/delete/${id}`, {});
}