import React, {useState,useEffect} from 'react';
import {Link} from 'react-router-dom';
import { capitalize } from '../helpers/toolbox';
import { useSelector } from "react-redux";
import {selectUser} from '../slices/userSlice';



    const Connected = (props)=>{

    const [screenWidth, setScreenWidth] = useState(window.innerWidth)
    const user = useSelector(selectUser)
    const [admin, setAdmin] = useState('')



	  useEffect(() => {
	
		const changeWidth = () => {
		  setScreenWidth(window.innerWidth);
		}
	
		window.addEventListener('resize', changeWidth)
	
		return () => {
			window.removeEventListener('resize', changeWidth)
		}
	
	  }, [])


    return (
        <div className='connected_aside'>
        <ul className="connected_ul">
        <Link to="/profil" className="profile_link_connected_user">{ capitalize(user.infos.firstName)}</Link>
            {( screenWidth > 500) && (
            <div className='divider'></div>

            )}

           
            <li><Link to="/annonces" className="profile_link">Vos annonces  </Link></li>
            {( screenWidth > 500) && (
            <div className='divider'></div>

            )}
            {( user.infos.role === "admin") && (
            <li><Link to="/admin" className="profile_link">Admin</Link></li>
             ) }
           
          
        </ul>

        </div>

    )


}

export default Connected;
