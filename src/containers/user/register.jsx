import React, {useState,useEffect} from 'react'
import {Navigate,Link} from 'react-router-dom';

import {saveOneUser} from '../../api/user'
import axios from 'axios'
import { config } from "../../config";
import Popup from '../../components/Modal'
//import '../../Modal.css'


const Register = (props)=>{
    const [firstName , setFirstName] = useState('');
    const [lastName , setLastName] = useState('');
    const [email , setEmail] = useState('');
    const [password , setPassword] = useState('');
    const [confirmPassword , setConfirmPassword] = useState('');
    const [address , setAddress] = useState('');
    const [zip , setZip] = useState('');
    const [city , setCity] = useState('');
    const [lat , setLat] = useState('');
    const [lng , setLng] = useState('');
	  const [phone , setPhone] = useState('');
    const [redirect, setRedirect] = useState(false);
    const [error, setError] = useState(null);
    const [openModal, setOpenModal] = useState(false);
    const [modalmssg, setModalmssg] = useState('');
    //let mess = props.mess;
    //let paragraphe = props.paragraphe;
    //mess="salut";
    //paragraphe="je suis un paragraphe";

 
    const Modal = ({open,onClose}) => {
  
      if(!open) return null  
    return (
      <div onClick={onClose} className='overlay'>
          <div onClick={(e)=>{e.stopPropagation()}} 
           className='modalContainer'>
             
            <div  className="modalRight">
             <p onClick={onClose} className='closeBtn'>X</p>
              
              <div className="modalContent">
    
                   <h5>Message</h5>
                   <div className="divider"></div>
                   <p className='txt_cookie'>{modalmssg}</p>
                    
                   <div className="divider"></div>
                   <div className='row_cont'>
                 
  
                   </div>
    
              </div>
        
            </div> 
          </div>
      </div>
    )
    }
    const onSubmitForm = () => {
        axios.get(config.nominateam_url + address + " " + zip + " " + city +'&format=geocodejson')
        .then((res)=>{
          
          let home = res.data.features
          if(home.length > 0){
            setLat(home[0].geometry.coordinates[1])
            setLng(home[0].geometry.coordinates[0])
            
            const data = {
                    firstName: firstName,
                    lastName: lastName,
                    email: email,
                    password: password,
                    phone: phone,
                    address: address,
                    zip: zip,
                    city: city,
                    lat: home[0].geometry.coordinates[1],
                    lng: home[0].geometry.coordinates[0]
                }
            
            /*if (firstName === "" || lastName === "" || email === "" || password === "" || confirmPassword === "" || description === "" || sport === "" || address === "" || zip === "" || city === "" || lat === "" || lng === "" || tjm === "") {
              setError("Please fill out all fields");
            } else*/ if (password === confirmPassword) {
                
                
                saveOneUser(data)
                .then(res => {
                    if(res.status === 200){
                        setRedirect(true);
                    }
                })
                .catch(err => {
                    //setError(err.response.data.message);
                    setError(error);
                    setOpenModal(true);
                    setModalmssg("probleme de connection");
                })
            } else {
                setError("Passwords do not match");
                setOpenModal(true);
                setModalmssg("Les mots de passe ne correspondent pas");
            }
          }else{
            setError("Adresse invalide! FAUSSE ADRESSE")
            setOpenModal(true);
            setModalmssg("Adresse invalide! FAUSSE ADRESSE");
          }
          
        })
    }

    
    
    return (
        <div className='container_register'>
         <Modal open={openModal} onClose={()=>{ 
		  setOpenModal(false) 
		 }} /> 
        {redirect && <Navigate to="/" />}
              <h1 className="c-g title2">
               Enregitrez vous
              </h1>
              <div className='divider'></div>
              {/*error !== null && <p className="errorMsg">{error}</p>*/}
              <div className="log-container bgc-bel-air">
                  <div className="log-nav-container">
                     
                      
                </div>
                <div>
                    <div className="log-container-form">
               
                <form
                      className="c-form"
                      onSubmit={(e) => {
                        e.preventDefault();
                        onSubmitForm();
                      }}
                    >
                    
                      <input
                        type="text"
                        name="firstName"
                        required
                        placeholder="Prenom"
                        onChange={(e) => {
                          setFirstName(e.currentTarget.value);
                        }}
                      />
                   
                      <input
                        type="text"
                        name="lastName"
                        required
                        placeholder='Nom'
                        onChange={(e) => {
                          setLastName(e.currentTarget.value);
                        }}
                      />
                      
                      <input
                        type="text"
                        name="email"
                        required
                        placeholder='email'
                        onChange={(e) => {
                          setEmail(e.currentTarget.value);
                        }}
                      />
                      <input
                         type="text"
                         name="address"
                         required
                         placeholder='Adresse'
                          onChange={(e) => {
                            setAddress(e.currentTarget.value);
                          }}
                          />
                          <input
                            type="text"
                            name="zip"
                            required
                            placeholder='Code postal'
                            onChange={(e) => {
                              setZip(e.currentTarget.value);
                            }}
                            />
                            <input
                              type="text"
                              name="city"
                              required
                              placeholder='Ville'
                              onChange={(e) => {
                                setCity(e.currentTarget.value);
                              }}
                              /> 
							  <input
							  type="text"
							  name="phone"
                required
							  placeholder='Téléphone'
							  onChange={(e) => {
								setPhone(e.currentTarget.value);
							  }}
							  />
                            
                    
                    
                      
                      <input
                        type="password"
                        name="password"
                        required
                        placeholder='password'
                        onChange={(e) => {
                          setPassword(e.currentTarget.value);
                        }}
                      />
                      <input
                        type="password"
                        name="confirmPassword"
                        required
                        placeholder='confirm password'
                        onChange={(e) => {
                          setConfirmPassword(e.currentTarget.value);
                        }}
                      />
                    
                      <input
                        className="buttonsbmt"
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

export default Register