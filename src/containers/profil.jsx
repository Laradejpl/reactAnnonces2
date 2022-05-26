import React, {useState, useEffect} from 'react'
import {Link, Navigate} from 'react-router-dom';
import {FaWindowClose } from 'react-icons/fa';
import {changeImg, getOneUser,updateUser} from '../api/user';
import { getInfoAdsByMessage,deleteMessageById} from '../api/messages';
import {
    Image,
    Video,
    Transformation,
    CloudinaryContext
  } from "cloudinary-react";
import {useDispatch,useSelector } from 'react-redux';
import {selectUser,connectUser} from '../slices/userSlice';
import axios from 'axios'
import moment from "moment";
moment.locale('fr');

const Profil = (props)=>{
    
    const user = useSelector(selectUser)
    const dispatch = useDispatch()
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [redirect, setRedirect] = useState(false);
    const [msg, setMsg] = useState(null);
	const [img, setImg] = useState(null);
	const [picture,setPicture] = useState([])
	const [allMessages,setAllMessages] = useState([])
	const [idMessage,setIdMessage] = useState(null)
	const [message, setMessage] = useState({});


    useEffect(()=>{
        setFirstName(user.infos.firstName);
        setLastName(user.infos.lastName);
        setEmail(user.infos.email);
        setPhone(user.infos.phone);
        setImg(user.imageUser);



    },[user])


    useEffect(()=>{
	     
	    
	},[picture])

	useEffect(()=>{
		getInfoAdsByMessage(user.infos.id)
		.then(res=>{
			setAllMessages(res.results)
			console.log("LES MESSAGES",res.results)
		})
		.catch(err=>console.log(err))
	},[])

    const savePictures = ()=>{

        let datas = {
            imageUser: picture[0],
            id: user.infos.id


        }
        console.log("picture",datas);
        changeImg(datas)
	        .then((res)=>{
	            if(res.status === 200){
	                getOneUser(user.infos.id)
	                .then((response)=>{
	                	
	                    let myUser = response.result
	                    myUser.token = localStorage.getItem("annonce-user-token")
	                    
	                    dispatch(connectUser(myUser))
	                    setImg(response.result.imageUser)
	                })
	                
	                setMsg('Votre profil a bien été édité');
	            }else{
	                setMsg("L'image n'a pas été modifié");
	            }
	        })
	        .catch(err=>console.log("Echec modification image!"))
    }
       //fonction callback de cloudinary déclenché lors de l'envoi un fichier
	const checkUploadResult = (resultEvent) => {
	    setMsg(null)
	    //si l'envoi est réussit
        if (resultEvent.event === "success") {
            console.log("RESULT", resultEvent);

	        console.log("result info", resultEvent.info);
	                  let pictures = picture
	                  pictures.push(resultEvent.info.public_id )
	                  console.log("mypicts",pictures);
	                  setImg(pictures)
	                 savePictures()
	        
        }else{
            console.log("Erreur envoi fichier")
        }
	}


    const showWidget = () => {
	    //paramètrage de l'interface
	    let widget = window.cloudinary.createUploadWidget(
	      {
	        cloudName: "dehjoundt",//nom de mon cloud
	        uploadPreset: "coachme",//dossier ou l'on veut envoyer
	        maxImageWidth: 800,//on peut paramètrer la taille max de l'image
	        cropping: false,//recadrage
	      },
	      (error, result) => {
	        //console.log(error);
	        //console.log(result);
	        checkUploadResult(result);//appel de notre callback
	      }
	    );
	    //ouverture de notre interface
	    widget.open();
	}

    const onSubmitForm = ()=>{



        let datas = {
            firstName: firstName,
            lastName: lastName,
            email: email,
            phone: phone
            
    }
        updateUser(datas,user.infos.id)
		
        .then((res)=>{
            if(res.status === 200){
				console.log("datas",datas);
                getOneUser(user.infos.id)
                .then((response)=>{

                    if(response.status === 200){
                        let myUser = response.result
                        myUser.token = localStorage.getItem("annonce-user-token")
                        dispatch(connectUser(myUser))
                        setMsg("Update Réussis")
                    }
                })
            }else{
                setMsg("Update Echoué")
            }
        })
        .catch(err=>console.log("Echec modification image!"))
    }



	
    return (
		<div className='main_profile'>
		<h2> Votre Profile</h2>
		<p>Vous pouvez voir vos messages et modifier votre avatar et renseignements.</p>
        <div className='row_cont1'>
		  
			
			{msg !== null && <p>{msg}</p>}
			
	        <br />
	        <form
            	className="c-form"
                onSubmit={(e)=>{
                    e.preventDefault();
                    onSubmitForm();
	                }}
	        >	
	            {img !== null && <CloudinaryContext cloudName="dehjoundt">
		            <div className='cadreImg'>
		              <Image publicId={user.infos.imageUser} id="profilImg">
		                <Transformation quality="auto" fetchFormat="auto" />
		              </Image>
		              
		            </div>
		         </CloudinaryContext>}
	            
	            <button
    	            onClick={(e) => {
    	              e.preventDefault();
    	              showWidget();
    	            }}
	            >
	                Changer ma photo de profil
	            </button>
				<input 
					type="text" 
					placeholder="Votre Prénom"
					value={firstName}
					onChange={(e)=>{
						setFirstName(e.currentTarget.value)
					}}
				/>
				<input 
					type="text" 
					placeholder="Votre Nom"
					value={lastName}
					onChange={(e)=>{
						setLastName(e.currentTarget.value)
					}}
				/>
				<input 
					type="text" 
					placeholder="Votre Email"
					value={email}
					onChange={(e)=>{
						setEmail(e.currentTarget.value)
					}}
				/>
				<input 
					type="text" 
					placeholder="Votre Telephone"
					value={phone}
					onChange={(e)=>{
						setPhone(e.currentTarget.value)
					}}
				/>
				
			
				
			
				
			
	            
	            <input type="submit" name="Enregister"/>
	       </form>

		    <div className='message_eara'>
		     <h3>Vos messages</h3>
			 <div className='divider'></div>

			 {allMessages.map((message,index)=>{
				 return(
					 <div className='message_eara_content' key={index}>
					 {/* afficher l'image du user*/}
					 
					 <CloudinaryContext cloudName="dehjoundt">
		            <div className='row_conta'>
		              <Image publicId={message.imageUrl} id="round_img">
		                <Transformation quality="auto" fetchFormat="auto" />
						
		              </Image>
					<div>
				         <p>{`${message.title.substr(0, 80)} ...`}</p>
						 <p>{`${message.price} €`}</p>
					</div>
					<div>

						<FaWindowClose className='icondelete' onClick={()=>{

						//effacer les message par leur id
						deleteMessageById(message.id_msg)
						.then(res=>{
							setAllMessages(allMessages.filter(mess=>mess.id_msg !== message.id_msg))
							console.log("DELETE",res);
                            console.log("delete",message.id_msg);
						}
                  )
                  .catch(err=>{
                    console.log(err);
                  }
				    
				  )
              
                 }} />
				 </div>
		            </div>
		         </CloudinaryContext>
				 <div className='divider'></div>
						 <h6>{message.titleMessage}</h6>
						 <p>{message.contentMessage}</p>
				 <Link to={`/chat/${user.infos.id}/${message.id_msg}/${message.idannonce}/${message.id}`} >{`Répondez a ${message.lastName}`}</Link>
						
						 <span className='date'>{moment(message.dateCreationMessage).format("YYYY-MM-DD")}</span>
					 </div>
				 )
				 			 

			 

			 })}
			




		    </div>

			

	    </div>
		</div>
    )
}

export default Profil