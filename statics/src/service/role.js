import http from './http'

export const all = async() =>{
    return await http.fetchGet(`/api/role/all`, {});
}

export const detail = async(id) =>{
    return await http.fetchGet(`/api/role/${id}`);
}

export const save = async(form) =>{
    return await http.fetchPost(`/api/role/save`, form);
}

export const del = async(id) =>{
    return await http.fetchPost(`/api/role/delete/${id}`, {});
}
