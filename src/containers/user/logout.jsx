import React, {useState, useEffect} from 'react'
import {Navigate} from 'react-router-dom'
import {useDispatch} from 'react-redux'
import {logoutUser} from '../../slices/userSlice'

const Logout = (props)=>{
    const dispatch = useDispatch()
    const [redirect, setRedirect] = useState(false)


    const setCookie = (cname, cvalue, exdays) => {
        let d = new Date();
      d.setTime(d.getTime() + (exdays*24*60*60*1000));
      let expires = "expires="+ d.toUTCString();
      document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
  }


    useEffect(()=>{
        window.localStorage.removeItem("coachme-user-token")

        setCookie("user","",5)
        setCookie("userFirstName","",5)
        setCookie("userId","",5)
        setCookie("userEmail","",5)
        setCookie("userPhone","",5)
        setCookie("userAddress","",5)
        setCookie("userCity","",5)
        setCookie("userZipCode","",5)
        dispatch(logoutUser())
        setRedirect(true)
    }, [])
    
    if(redirect){
        return <Navigate to="/login"/>
    }
    return (
        <div>
            <h1>Ciao Bello!</h1>
        </div>
    )
}

export default Logout