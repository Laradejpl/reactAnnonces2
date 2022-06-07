import React, {useState,useEffect,useRef} from 'react'
import {Navigate} from 'react-router-dom'
import {loginOneUser} from '../../api/user'
import { useDispatch, useSelector } from "react-redux";
import { connectUser } from '../../slices/userSlice'
import {Link} from 'react-router-dom';
import lottie from 'lottie-web'
import '../../Modal.css'


const Login = (props)=>{
    
    const dispatch = useDispatch()
    
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [openModal, setOpenModal] = useState(false);
    const [redirect, setRedirect] = useState(false)
    const [error, setError] = useState(null)
    const containa = useRef(null)
    useEffect(() => {
        lottie.loadAnimation({
            container:containa.current,
            renderer: 'svg',
            loop: false,
            autoplay: true,
            animationData: require('../../assets/login.json')
        })
      }, [])
    
    const onSubmitForm = ()=>{
        let datas = {
            email: email,
            password: password
        }
        
        loginOneUser(datas)
        .then((res)=>{
            if(res.status === 200){
                window.localStorage.setItem("annonce-user-token", res.token)
                
                let myUser = res.user
                myUser.token = res.token
                
                dispatch(connectUser(myUser))
                setRedirect(true)
            }
        })
        .catch(err=>console.log(err))
        setOpenModal(true);
    }

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
                     <p className='txt_cookie'>Il y a une erreur,réssayez .</p>
                      
                     <div className="divider"></div>
                     <div className='row_cont'>
                   
    
                     </div>
      
                </div>
          
              </div> 
            </div>
        </div>
      )
      }
    
    if(redirect){
        return <Navigate to="/"/>
    }
    
    return (
        <div className='container_loginl'>
        <Modal open={openModal} onClose={()=>{ 
		  setOpenModal(false)
		 }} /> 
            <div className='containal' ref={containa}></div>
            <h1>Se connecter</h1>
            <div className='divider'></div>
            <div className='form_login'>
            <form
                className="c-form"
                onSubmit={(e)=>{
                    e.preventDefault();
                    onSubmitForm();
                }}
            >
	                
				<input 
					type="text" 
                    required
					placeholder="Votre Mail"
					onChange={(e)=>{
						setEmail(e.currentTarget.value)
					}}
				/>
               
				<input 
					type="password" 
                    required
					placeholder="Votre Mot de passe"
					onChange={(e)=>{
						setPassword(e.currentTarget.value)
					}}
				/>
               
			
				<input type="submit" name="Enregister" className="buttonsbmt"/>
                <div>
                    <Link to="/forgot" className='linkforgot'>Oublie du mot passe</Link>
                </div>
	       </form>
           </div>
        </div>
    )
}

export default Login