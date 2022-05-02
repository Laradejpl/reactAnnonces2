import axios from "axios";
import { config } from "../config";
const token = window.localStorage.getItem("annonce-user-token");


// enregistrement d'une note pour une annonce
export const saveOneNote = (datas) => {
    return axios.post(config.api_url + '/api/v1/note/add',datas )
        .then(response => {
            return response.data;
        }
        )
        .catch(error => {
            return error;
        }
        );
    
}

// avoir la moyenne des notes pour un user
export const getAvgNotesByUser = (id) => {
    return axios.get(config.api_url + '/api/v1/note/average/'+id)
        .then(response => {
            return response.data;
        }
        )
        .catch(error => {
            return error;
        }
        );
    
}

 // avoir toutes les notes d'un user
export const getAllNotesByUser = (id) => {
    return axios.get(config.api_url + '/api/v1/note/user/'+id)
        .then(response => {
            return response.data;
        }
        )
        .catch(error => {
            return error;
        }
        );
    
}

 // avoir toutes les notes 
export const getAllNotes = () => {
    return axios.get(config.api_url + '/api/v1/note')
        .then(response => {
            return response.data;
        }
        )
        .catch(error => {
            return error;
        }
        );
    }

// delete une note
export const deleteOneNote = (id) => {
    return axios.delete(config.api_url + '/api/v1/note/delete/one/'+id)
        .then(response => {
            return response.data;
        }
        )
        .catch(error => {
            return error;
        }
        );
    
}