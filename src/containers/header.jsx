import React, {useState,useEffect} from 'react';
import {Link} from 'react-router-dom';
import { useSelector } from "react-redux";
import { selectUser } from '../slices/userSlice';
import '../navbarr.css';
import logo from '../assets/pharelogo.png';
import hamburger from '../assets/hamburger.png'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignOutAlt } from "@fortawesome/free-solid-svg-icons";




//Gestion de la naivgation
const Header = (props)=>{
	
	const user = useSelector(selectUser)
	const [toggleMenu, setToggleMenu] = useState(false)
    const [screenWidth, setScreenWidth] = useState(window.innerWidth)

	const toggleNav = () => {
		setToggleMenu(!toggleMenu)
	  }
	
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
           


	<div className='navcontaina' >
		<nav className='navcontaina'>
			{(toggleMenu || screenWidth > 500) && (
              <div className="list">
				
				    <div className='one'>
				
					<img src={logo} alt="logo" onClick={toggleNav} className="logoboat"/> 
				
				    </div>
				   {user.isLogged ? <div>
					     <Link to="/"  className="items">Home</Link>
					     
						 {(toggleMenu || screenWidth > 500) && (
							<Link to="/logout" className='logoutMain'>
							Logout
							</Link>

						 )}  
					     <Link to="/post" className="items">Déposer une annonce</Link>
						 <Link to="/logout">
                            <FontAwesomeIcon icon={faSignOutAlt}  className="logoutSvg"/>
                        </Link>
						 
				</div> : <div className='two'>
					<Link to="/register" className="items end">S'enregistrer</Link>
					<Link to="/login" className="items end">Se connecter</Link>
				</div>}


			  </div>



			)}
			<img src={hamburger} alt="logo" onClick={toggleNav} id="btn"/> 
			    
		</nav>
	</div>
	)
}

export default Header;

		
		