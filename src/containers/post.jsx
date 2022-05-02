import React, { useState } from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { Navigate } from "react-router-dom";
import {saveOneAds,getAllAdsByUser,getLastAdsByUser} from '../api/annonce';
import {selectUser} from '../slices/userSlice';
import annonceSlice, {loadUserAnnonces, selectAnnonces,getOneAnnonce} from '../slices/annonceSlice';
import {Link} from 'react-router-dom';
import {categorys} from '../helpers/category';
import axios from 'axios';
import { config } from "../config";


const Post = (props)=>{

  const user = useSelector(selectUser);
  const annonce = useSelector(selectAnnonces);
  const dispatch = useDispatch();
    
   
    const [redirect, setRedirect] = useState(false);
    const [error, setError] = useState(null);

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [category, setCategory] = useState('');
    const [price, setPrice] = useState('');
    const [address, setAddress] = useState('');
    const [zip,setZip] = useState('');
    const [city, setCity] = useState('');
    const [lat, setLat] = useState('');
    const [lng, setLng] = useState('');
    const [idads, setIdads] = useState('');
   
   
    
 



    const onSubmitForm = ()=>{

        axios.get(config.nominateam_url + address + " " + zip + " " + city +'&format=geocodejson')
        .then((res)=>{
          console.log(res)
          let home = res.data.features
          if(home.length > 0){
            setLat(home[0].geometry.coordinates[1])
            setLng(home[0].geometry.coordinates[0])
            
            const data = {
                    title: title,
                    description: description,
                    category: category,
                    price: price,
                    address: address,
                    zip: zip,
                    city: city,
                    lat: home[0].geometry.coordinates[1],
                    lng: home[0].geometry.coordinates[0],
                    user_id: user.infos.id
                    
                }
            console.log(data)
            /*if (firstName === "" || lastName === "" || email === "" || password === "" || confirmPassword === "" || description === "" || sport === "" || address === "" || zip === "" || city === "" || lat === "" || lng === "" || tjm === "") {
              setError("Please fill out all fields");
            } else*/ if (price !== '') {
                
                console.log("a ke coucou",user.infos.id);
                console.log("elseif", data)
                saveOneAds(data)
                .then(res => {
                    if(res.status === 200){

                      getAllAdsByUser(user.infos.id)
                      getLastAdsByUser(user.infos.id)
                      
                      .then(res=>{
                        if(res.status === 200){
                          dispatch(loadUserAnnonces(res.result))
                          dispatch(getOneAnnonce(res.result[0].id))
                          setIdads(res.result[0].id)

                          setRedirect(true)
                        }
                      })
                    }
                })
                .catch(err => {
                    //setError(err.response.data.message);
                    setError(error);
                })
            }
        }
        else{
            setError("Adresse non trouvée!")
        }
        })
        .catch((err)=>{
            setError("Adresse non trouvée")
        })
    }
        
    return (
        <div className='container_post'>
        {/*redirection id annonce*/}
        {redirect && <Navigate to={"/imagesAnnonces/" + idads} />}
              <h1 className="title3">
               Enregitrez une annonce.
              </h1>
              <div className='divider_post'></div>
              {error !== null && <p className="errorMsg">{error}</p>}
              <div className="log-container bgc-bel-air">
                  <div className="log-nav-container">
                     
                      
                </div>
                <div>
                    <div className="post-container-form">
               
                <form
                      className="c-form"
                      onSubmit={(e) => {
                        e.preventDefault();
                        onSubmitForm();
                      }}
                    >
                    
                      <input
                        type="text"
                        name="title"
                        placeholder="Titre"
                        onChange={(e) => {
                          setTitle(e.currentTarget.value);
                        }}
                      />
                   
                      <input
                        
                        type="text"
                        name="description"
                        placeholder='description'
                        onChange={(e) => {
                          setDescription(e.currentTarget.value);
                        }}
                      />
                      
                      <label className='labelcat'>Categorie</label>
                  <select
                    name="category"
                    onChange={(e) => {
                      setCategory(e.currentTarget.value);
                    }}
                  >
                    {categorys.map((category, index) => (
                      <option key={index} value={category}>
                        {category}
                      </option>
                    ))}
                  </select>
                       <input
                        type="text"
                        name="price"
                        placeholder='price'
                        onChange={(e) => {
                          setPrice(e.currentTarget.value);
                        }}
                      />
                      <input
                         type="text"
                         name="address"
                         placeholder='Adresse'
                          onChange={(e) => {
                            setAddress(e.currentTarget.value);
                          }}
                          />
                          <input
                            type="text"
                            name="zip"
                            placeholder='Code postal'
                            onChange={(e) => {
                              setZip(e.currentTarget.value);
                            }}
                            />
                            <input
                              type="text"
                              name="city"
                              placeholder='Ville'
                              onChange={(e) => {
                                setCity(e.currentTarget.value);
                              }}
                              /> 
                     
                    
                      <input
                        className="buttonpost"
                        type="submit"
                        value="Soumettre"
                      />
                    </form>
                            
                    </div>
                     
                </div>
            </div>
  </div>
    )
}

             

        




export default Post;