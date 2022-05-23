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

    // avoir les infos de l'annonce d'un message
export const getInfoAdsByMessage = (receiverId) => {
    return axios.get(config.api_url + '/api/v1/messages/annoncesinfo/'+ receiverId)
        .then(response => {
            return response.data;
        }
        )
        .catch(error => {
            return error;
        }
        );
    }

      // avoir les infos de l'annonce d'un message par posteurId
export const getInfoAdsByMessageByPosteurId = (posteurId) => {
    return axios.get(config.api_url + '/api/v1/messages/annoncesinfoposteur/'+ posteurId)

        .then(response => {
            return response.data;
        }
        )
        .catch(error => {
            return error;
        }
        );
    }


    //avoir le nombre de message par receiverId
export const getNbMessageByReceiverId = (receiverId) => {
    return axios.get(config.api_url + '/api/v1/messages/count/'+ receiverId)
        .then(response => {
            return response.data;
        }
        )
        .catch(error => {
            return error;
        }
        );
    }

    

    //effacer un message par id
export const deleteMessageById = (id) => {
    return axios.delete(config.api_url + '/api/v1/delete/messages/'+ id)
        .then(response => {
            return response.data;
        }
        )
        .catch(error => {
            return error;
        }
        );
    }


      //avoir tout les messages avec les infos de l'annonce et les infos du posteurId  par receiverId et  par idannonce.
export const getAllMessagesByReceiverIdAndIdannonce = (receiverId,idannonce,posteurId) => {
    return axios.get(config.api_url + '/api/v1/messages/annoncesinfobyid/'+ receiverId+'/'+idannonce +'/'+ posteurId )
        .then(response => {
            return response.data;
        }
        )
        .catch(error => {
            return error;
        }
        );
    }