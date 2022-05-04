import axios from "axios";
import { config } from "../config";
const token = window.localStorage.getItem("annonce-user-token");



// enregistrement d'une annonce
export const saveOneAds = (datas) => {
    return axios.post(config.api_url + "/api/v1/ads/add", datas, {headers: {"x-access-token": token}} )
        .then(response => {
            return response.data;
          
        }
        )
        .catch(error => {
            return error;
        }
        );
    
}

//avoir toutes les annonces
export const getAllAds = () => {
    return axios.get(config.api_url + "/api/v1/ads")
        .then(response => {
            return response.data;
        }
        )
        .catch(error => {
            return error;
        }
        );
}



// avoir les annonces par user
export const getAllAdsByUser = (user_id) => {
    return axios.get(config.api_url + "/api/v1/allads/" + user_id, {headers: {"x-access-token": token}} )
        .then(response => {
            return response.data;
          
        }
        )
        .catch(error => {
            return error;
        }
        );
    
}
// avoir la derniere annonce par user
export const getLastAdsByUser = (user_id) => {
    return axios.get(config.api_url + "/api/v1/lastads/" + user_id, {headers: {"x-access-token": token}} )
        .then(response => {
            return response.data;
        }
        )
        .catch(error => {
            return error;
        }
        );
    }

//update des images
export const updateImages = (datas) => {
    return axios.post(config.api_url + "/api/v1/ads/update/images", datas, {headers: {"x-access-token": token}} )
        .then(response => {
            return response.data;
        }
        )
        .catch(error => {
            return error;
        }
        );
    }


//avoir une annonce par id
export const getOneAnnonce = (id) => {
    return axios.get(config.api_url + "/api/v1/ads/one/" + id )
        .then(response => {
            return response.data;
          
        }
        )
        .catch(error => {
            return error;
        }
        );
    
}

//update de l'annonce
export const updateAnnonce = (datas, id) => {
    return axios.put(config.api_url + '/api/v1/ads/update/'+ id, datas, {headers: {"x-access-token": token}} )
        .then(response => {
            return response.data;
        }
        )
        .catch(error => {
            return error;
        }
        );
    }

    // nombre danonce total 
    export const getNbAds = () => {
        return axios.get(config.api_url + "/api/v1/totalads")
            .then(response => {
                return response.data;
              
            }
            )
            .catch(error => {
                return error;
            }
            );
        
    }

    //nombre d'annonce par categorie
    export const getNbAdsByCat = (category) => {
        return axios.get(config.api_url + "/api/v1/nbrads/category/" + category)
            .then(response => {
                return response.data;
              
            }
            )
            .catch(error => {
                return error;
            }
            );
        
    }

    //avoir toute les annonces par category
    export const getAllAdsByCat = (category) => {
        return axios.get(config.api_url + "/api/v1/allads/category/" + category)
            .then(response => {
                return response.data;
              
            }
            )
            .catch(error => {
                return error;
            }
            );
        
    }

    //avoir les infos du posteur d'annoncce
    export const getUserInfoByAnnonce = (id ,user_id) => {
        return axios.get(config.api_url + "/api/v1/ads/user/" + id  +"/" + user_id)
            .then(response => {
                return response.data;
              
            }
            )
            .catch(error => {
                return error;
            }
            );
        
    }

    // avoir les 3 dernieres annonces par category
    export const getLastTreeAdsByCat = (category) => {
        return axios.get(config.api_url + "/api/v1/lastannonces/category/" + category)
            .then(response => {
                return response.data;
              
            }
            )
            .catch(error => {
                return error;
            }
            );
        
    }

    // avoir les 6 dernieres annonces
    export const getLastSixAds = () => {
        return axios.get(config.api_url + "/api/v1/ads/last")
            .then(response => {
                return response.data;
              
            }
            )
            .catch(error => {
                return error;
            }
            );
        
    }

    // avoir une annonce par distance et categorie
    export const getAdsByDistance = (datas) => {
        return axios.post(config.api_url+'/api/v1/ads/distance', datas)
        .then((response)=>{
            return response.data
        })
        .catch((err)=>{
            return err
        })
    }

    //avoir les annonces par keyword
    export const getAdsByKeyword = (datas) => {
        return axios.post(config.api_url+'/api/v1/ads/search' , datas)
        .then((response)=>{
            return response.data
        })
        .catch((err)=>{
            return err
        })
    } 
  

// effacer une annonce par id
export const deleteAd = (id) => {
    return axios.delete(config.api_url + "/api/v1/ads/delete/one/" + id)
        .then(response => {
            return response.data;
        }
        )
        .catch(error => {
            return error;
        }
        );
    }

    // update du click de l'annonce
    export const updateClickAds = (id) => {
        return axios.put(config.api_url + "/api/v1/ads/update/clicks/" + id)
        .then(response => {
            return response.data;
        }
        )
        .catch(error => {
            return error;
        }
        );
    }

    //avoir les annonces entre deux prix
    export const getAdsByPrice = (datas) => {
        return axios.post(config.api_url + "/api/v1/ads/price", datas)
        .then(response => {
            return response.data;
        }
        )
        .catch(error => {
            return error;
        }
        );
    }

     //avoir toute les annonces  entre deux prix et category et marque
        export const getAdsByPriceAndCat = (datas) => {
            return axios.post(config.api_url + "/api/v1/ads/price/category/marque",datas)
            .then(response => {
                return response.data;
            }
            )
            .catch(error => {
                return error;
            }
            );
        }



