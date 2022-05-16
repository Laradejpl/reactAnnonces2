import axios from "axios";
import { config } from "../config";
const token = window.localStorage.getItem("annonce-user-token");


 // avoir toutes les messages
export const getAllMessages = () => {
    return axios.get(config.api_url + '/api/v1/messages')
        .then(response => {
            return response.data;
        }
        )
        .catch(error => {
            return error;
        }
        );
    }

    //ajouter un message
export const saveOneMessage = (datas) => {
    return axios.post(config.api_url + '/api/v1/messages/add',datas )
        .then(response => {
            return response.data;
        }
        )
        .catch(error => {
            return error;
        }
        );
    
}


   // avoir le dernier message du receiverId
export const getLastMessage = (receiverId) => {
    return axios.get(config.api_url + '/api/v1/messages/last/'+receiverId)
        .then(response => {
            return response.data;
        }
        )
        .catch(error => {
            return error;
        }
        );
    }

    //avoir tout les messages dun receiverId
export const getAllMessagesByReceiverId = (receiverId) => {
    return axios.get(config.api_url + '/api/v1/messages/'+receiverId)
        .then(response => {
            return response.data;
        }
        )
        .catch(error => {
            return error;
        }
        );
    }