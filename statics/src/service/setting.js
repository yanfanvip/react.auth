import http from './http'

export const all = async() =>{
    return await http.fetchGet(`/api/setting/all`);
}

export const get = async(id) =>{
    return await http.fetchGet(`/api/setting/${id}`);
}

export const save = async(id, data={}) =>{
    let form = {
        id : id,
        data : JSON.stringify(data)
    }
    return await http.fetchPost(`/api/setting/save`, form);
}