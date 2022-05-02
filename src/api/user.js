import axios from "axios";
import { config } from "../config";
const token = window.localStorage.getItem("annonce-user-token");

export const getOneUser = (id) => {
    return axios.get(config.api_url+'/api/v1/user/one/'+id)
    .then((response)=>{
        return response.data
    })
    .catch((err)=>{
        return err
    })
}

export const saveOneUser= (datas) => {
    return axios.post(config.api_url+'/api/v1/user/add', datas)
    .then((response)=>{
        return response.data
    })
    .catch((err)=>{
        return err
    })
}

export const loginOneUser = (datas) => {
    return axios.post(config.api_url+'/api/v1/user/login', datas)
    .then((response)=>{
        return response.data
    })
    .catch((err)=>{
        return err
    })
}

export const updateUser = (datas, id) => {
    return axios.put(config.api_url+'/api/v1/user/update/'+id, datas, {headers: {'x-access-token': token}})
    .then((response)=>{
        return response.data
    })
    .catch((err)=>{
        return err
    })
}

export const changeImg = (datas) => {
    return axios.post(config.api_url + '/api/v1/user/updateImg', datas, { headers: { 'x-access-token': token }})
    .then((response)=>{
        return response.data
    })
    .catch((err)=>{
        return err
    })
}

//recuperer tous les utilisateurs
export const getAllUsers = async () => {
    try {
        const response = await axios.get(config.api_url + '/api/v1/user/all');
        return response.data;
    } catch (err) {
        return err;
    }
}

// effacer un utilisateur
export const deleteUser = async (id) => {
    try {
        const response = await axios.delete(config.api_url + '/api/v1/user/delete/' + id, { headers: { 'x-access-token': token }});
        return response.data;
    } catch (err) {
        return err;
    }
}


