import React, {useState,useEffect} from 'react'
import {Navigate,Link} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

import {saveOneUser} from '../../api/user'
import axios from 'axios'
import { config } from "../../config";
import  ModalSimple from '../../components/PopUp'
import {validateInputField} from "../../helpers/form-validator"
import '../../Modal.css'
import {BsFillEyeFill,BsEyeSlashFill} from "react-icons/bs";


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
    const  [isPopUp, setIsPopUp] = useState(false);
    const [erreur, setErreur] = useState('');
    const [success,setSuccess]= useState('')
    const [colormessage, setColormessage] = useState('');
    const [passwordIsVisible, setPasswordIsVisible] = useState(false);  
   

 
  

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

                let passwordErr = validateInputField("Password", "password", password)
                if( passwordErr !== true){
                   
                    setErreur(passwordErr)
                    setColormessage("alert alert-danger")
                    return
                }
                let emailErr = validateInputField("Email", "email", email)
                if(emailErr !== true){
                  setErreur(passwordErr)
                  setColormessage("alert alert-danger")
                    return
                }
                else{

                  setErreur(null)
                  setColormessage("alert alert-success")
                  setSuccess("Felicition ,Vous allez recevoir un email de confirmation pour valider votre compte,vous allez etre diriger sur la page de connection.")
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
                   
                    setError(error);
                
                    setIsPopUp(true);
                    setModalmssg("problème de connection");
                })
            } else {
                setError("Passwords do not match");
              
                setIsPopUp(true);
                setModalmssg("Les mots de passe ne correspondent pas");
            }
          }else{
            setError("Adresse invalide!")
            
            setIsPopUp(true);
            setModalmssg("Adresse invalide!");
          }
          
        })
    }

    
    
    return (
        <div className='container_register'>
       { /* <Modal open={openModal} onClose={()=>{ 
		  setOpenModal(false) 
		 }} /> */}

     <ModalSimple titre={modalmssg}
     content="Close"
     
     isPopUp={isPopUp}
     onClickClose={()=>{
        setIsPopUp(false)
      }}/>
        {/* redirection sur login dans 10 secondes*/}
        
        
        {redirect && <Navigate to="/login" />}
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
                        type="email"
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
                            
                    
               
                <div className="cont_row_cont">
                      
                      <input
                        type= {passwordIsVisible ? "text" : "password"}
                        name="password"
                        className='form-border_right'
                        required
                        placeholder='password'
                        onChange={(e) => {
                          setPassword(e.currentTarget.value);
                        }}
                      /> 
                      <div className='eye_reveal'  onClick={()=>{setPasswordIsVisible((prevState) => !prevState) }}>{passwordIsVisible ? (<BsFillEyeFill/>):(<BsEyeSlashFill/>)}</div>
                </div>
                      <span>8 chiffres,lettre, majuscule, minuscule, caractère spécial</span>

                      <div className="cont_row_cont">
                                <input
                                  type="password"
                                  name="confirmPassword"
                                  className='form-border_right'
                                  required
                                  placeholder='confirm password'
                                  onChange={(e) => {
                                    setConfirmPassword(e.currentTarget.value);
                                  }}
                                />
                          <div className='eye_reveal'  onClick={()=>{setPasswordIsVisible((prevState) => !prevState) }}>{passwordIsVisible ? (<BsFillEyeFill/>):(<BsEyeSlashFill/>)}</div>

                      </div>
                    
                      <input
                        className="buttonsbmt"
                        type="submit"
                        value="Soumettre"
                      />
                             {/*erreur !== null && <div className={" mb-5 p-5  bg-" + colormessage}>{erreur}</div>*/}
            {success !== null && (password === confirmPassword ) && erreur ===null  ?(<div className={" mb-5 p-5 bg-" + colormessage}>{success}</div>):(<div className={" mb-5 p-5 bg-" + colormessage}>{erreur}</div>)}
                    </form>

             

                            
                    </div>
                     
                </div>
            </div>
  </div>
    )
}

export default Register