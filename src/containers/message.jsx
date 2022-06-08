import React, { useState, useEffect } from 'react';
import {BsChatRightQuoteFill} from "react-icons/bs";
import {getAllAnnonces,saveOneMessage,getLastMessage,getAllMessagesByReceiverId} from '../api/messages';
import '../Modal.css'
import cookieImg from '../assets/cookimg.png'
import {selectUser} from '../slices/userSlice';
import {useSelector } from 'react-redux';
import  ModalSimple from '../components/PopUp'
import '../Modal.css'


const Message = (props) => {

    const user = useSelector(selectUser)
    const [message, setMessage] = useState({});
    const [titleMessage, setTitleMessage] = useState('');
    const [contentMessage, setContentMessage] = useState('');
   
    const [vide,setVide] = useState(true);
    const id = props.params.id
    const idannonce = props.params.idannonce
    const  [isPopUp, setIsPopUp] = useState(false);


    const onSubmitForm = ()=>{
        const data = {
            posteurId: user.infos.id,
            receiverId: id,
            titleMessage:titleMessage,
            contentMessage:contentMessage,
            idannonce:idannonce

        }
        saveOneMessage(data)
        .then((result)=>{
            setMessage(result)

            if(vide === false){
                setIsPopUp(true)
                setTitleMessage('')
                setContentMessage('')
            }
           
        }
        )
        .catch((err)=>{
            console.log(err)
        }
        )

    }
  

  return (
    <div className='formulaire_message'>
    <ModalSimple titre="Vous avez envoyez un message au vendeur."
     content="Close"
     
     isPopUp={isPopUp}
     onClickClose={()=>{
        setIsPopUp(false)
      }}/>
        <h1><span><BsChatRightQuoteFill/> </span>Envoyez un Message</h1>

        <div className='divider'></div>
       
        <form
                className="c-form"
                onSubmit={(e)=>{
                    e.preventDefault();
                    onSubmitForm();
                }}
            >
           
            <div className="form-group">
                <label htmlFor="titleMessage">Titre</label>
                <input type="text" className="form-control" id="titleMessage" value={titleMessage} required onChange={(e)=>{ 
                    setTitleMessage(e.target.value)
                    setVide(false)
                }}/>
            </div>
            <div className="form-group">
                <label htmlFor="contentMessage">Contenu</label>
                <textarea className="form-control" id="contentMessage" value={contentMessage} required onChange={(e)=>{

                setContentMessage(e.target.value)
                setVide(false)
                }}></textarea>
            </div>
            <button type="submit" className="buttonsbmt">Envoyer</button>
        </form>
      
        </div>
  )
}

export default Message