import React, { useState, useEffect , useRef} from 'react';
import logo from '../assets/pharelogo.png'
import modalimg from '../assets/voilier.png'
import cookieImg from '../assets/cookimg.png'

import Connected from './connected';
import Categories from './categories';
import {categorys} from '../helpers/category';
import { capitalize,firstLetter} from '../helpers/toolbox'
import {Link} from 'react-router-dom';
import GoogleMapReact from 'google-map-react';
import '../home.css';
import '../temporary.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {getNbAds,getLastSixAds,getAdsByDistance,getAdsByKeyword,updateClickAds,getAdsByClick} from '../api/annonce';
import {updateCooks} from '../api/user';
import axios from 'axios';
import ReactCardSlider from './ReactCardSlider';
import { BsSearch } from "react-icons/bs";
import { useSelector } from "react-redux";
import {selectUser} from '../slices/userSlice';
import lottie from 'lottie-web'
import '../Modal.css'





import {
  Image,
  Video,
  Transformation,
  CloudinaryContext
} from "cloudinary-react";
import moment from "moment";
import localization from 'moment/locale/fr';

moment.updateLocale('fr', localization);
const API_KEY = 'AIzaSyDnxU0AwNwyTGSo1RAcsa4Dr27Xt0ngbaI';



const Jetboat = (props) => {


	const defaultProps = {
		center: {
		  lat: 49.8865792,
		  lng: 2.359296
		},
		zoom: 13
	  };

       const [totalAds, setTotalAds] = useState(0);
	   const [lastAds, setLastAds] = useState([]);
	   const [adsByClicks, setAdsByClicks] = useState([]);
	  
	   const [position, setPosition] = useState(defaultProps.center)
	   const [zoom, setZoom] = useState(defaultProps.zoom)
	   const [address, setAddress] = useState("")
	   const [radius, setRadius] = useState(5)
	   const [adsLocalized, setAdsLocalized] = useState([])
	   const [category, setCategory] = useState("")
	   
	   const [error, setError] = useState(null)
       const [screenWidth, setScreenWidth] = useState(window.innerWidth)
	   const [title, setTitle] = useState("")
	   const [adsearch, setAdsearch] = useState([])
       const searchingInput = useRef(null);
	   const [KeywordValue, setKeywordValue] = useState("")
	   const user = useSelector(selectUser)
	   const [initialUser, setInitialUser] = useState("")

	   const [idAds, setIdAds] = useState(0)
	   const [openModal, setOpenModal] = useState(false);
	   const [msg, setMsg] = useState('');
	   const [trueCookie, setTrueCookie] = useState(false);
	   const containa = useRef(null)
	  
	   

	   const handleCurrentValue = () => {
		   console.log("VALEUR DE INPUTss",searchingInput.current.value)
		   setKeywordValue(searchingInput.current.value)
	   }
	   
  //LES COOKIES

  const setCookie = (cname, cvalue, exdays) => {
	  	let d = new Date();
		d.setTime(d.getTime() + (exdays*24*60*60*1000));
		let expires = "expires="+ d.toUTCString();
		document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
	}


 
  //LES COOKIES					

//Modal

const Modal = ({open,onClose}) => {
  
	if(!open) return null  
  return (
	<div onClick={onClose} className='overlay'>
		<div onClick={(e)=>{e.stopPropagation()}} 
		 className='modalContainer'>
			<img className='imgModal' src={cookieImg} alt=".. " />
		  <div  className="modalRight">
		   <p onClick={onClose} className='closeBtn'>X</p>
			
			<div className="modalContent">
  
				 <h5>Bienvenue sur le Phare</h5>
				 <div className="divider"></div>
				 <p className='txt_cookie'>Afin de vous fournir la meilleure expérience possible, nous utilisons des cookies et d'autres technologies similaires dans un but de performance, de statistiques, de personnalisation, de publicité et pour aider le site à fonctionner.  	</p>
				  
				 <div className="divider"></div>
				 <div className='row_cont'>
				 <button className='mapBtn' onClick={
					 //onClose
					 ()=>{
						 updateCooks(user.infos.id)
						 setCookie("user",user.infos.lastName,5)
		                 setCookie("userFirstName",user.infos.firstName,5)
		                 setCookie("userId",user.infos.id,5)
		                 setCookie("userEmail",user.infos.email,5)
		                 setCookie("userPhone",user.infos.phone,5)
		                 setCookie("userAddress",user.infos.address,5)
		                 setCookie("userCity",user.infos.city,5)
		                 setCookie("userZipCode",user.infos.zipCode,5)
						 onClose()


					 }
					

					 }>Acceptez</button>
				 <button className='mapBtn_red' onClick={
					 ()=>{
						 updateCooks(user.infos.id)
						 setCookie("user","",5)
		                 setCookie("userFirstName","",5)
		                 setCookie("userId","",5)
		                 setCookie("userEmail","",5)
		                 setCookie("userPhone","",5)
		                 setCookie("userAddress","",5)
		                 setCookie("userCity","",5)
		                 setCookie("userZipCode","",5)
						 onClose()
					 } 						
					 
					 }>Non</button>

				 </div>
  
			</div>
	  
		  </div> 
		</div>
	</div>
  )
  }
  
  useEffect(() => {
	   setOpenModal(true)
  }, [])

	   useEffect(()=>{
	            mygeoloc()
    }, [position])
    
    const mygeoloc = ()=>{
        
        if ("geolocation" in navigator) {
            navigator.geolocation.getCurrentPosition((position) => {
			 	
			 	let coords = {lat: position.coords.latitude, lng: position.coords.longitude};
			 	console.log(coords)
			 	setPosition(coords)
			 	
            })
            
        }else{
            alert("Vous n'êtes pas géolocalisé")
        }
    }
    
    const onSubmitForm = ()=>{
		
        axios.get('https://nominatim.openstreetmap.org/search?q='+address+'&format=geocodejson')
        .then((res)=>{
            if(res.data.features.length === 0) {
                setError("Address inexistante")
            }else{
                let lat = res.data.features[0].geometry.coordinates[1];
		        let lng = res.data.features[0].geometry.coordinates[0];
		        
		        let coords = {
		        	lat: lat,
		        	lng: lng
		        }
		        
		        let deg = radius * 0.009
		        
		        let lat_min = lat - deg; // -1.7
	        	let lat_max = lat + deg; // -1.5
	        	let long_max = lng + (deg / Math.cos( lat * (Math.PI/180)));
	        	let long_min = lng - (deg / Math.cos(lat*Math.PI/180))
	        	
	        	let data = {
					  min_lat: lat_min,
					  max_lat: lat_max,
					  min_lng: long_min,
					  max_lng: long_max,
					  category: category
					}
					
				getAdsByDistance(data)
				.then((res)=>{
				    setAdsLocalized(res.result)
				    setPosition(coords)
				    setZoom(12)
				    console.log(adsLocalized)
				})
				.catch(err=>console.log(err))
            }
        })
        .catch(err=>console.log(err))
		
    }

	const searchForKeyword = () => {
		handleCurrentValue()
		
		let data = {
			keyWord:title
			
		}
		
		getAdsByKeyword(data)
		.then((res)=>{
			console.log("KEYWORDs :",res.result);
			setAdsearch(res.result)
			//setKeywordValue(null)
			console.log(adsearch[0].title);
		})
		.catch(err=>console.log(err))
		
	}
    
    const createMarkers = ()=>{
        return adsLocalized.map((locals)=>{
            return (
                <div
		          	className="coachMarker"
		          	lat={locals.lat}
				    lng={locals.lng}
				    text="My Marker"
		         >	
		        	<CloudinaryContext cloudName="dehjoundt">
			            <div>
			              <Image publicId={locals.imageUrl}  id ="MarkerImage" onClick={()=>{

updateClickAds(locals.id)
	  .then((res)=>{
		console.log(res);

		}
		)
		.catch((err)=>{
			   console.log(err);
		}
		)


	}}>
			                <Transformation quality="auto" fetchFormat="auto" />
			              </Image>
			            </div>
			         </CloudinaryContext>
		          	<Link to={"/detail/"+locals.id}>{locals.title} </Link>
			     </div>
                
            )
        })
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

	 

     	// le nombre total d'annonces
	useEffect(()=>{
		getNbAds()
		.then((res)=>{
			setTotalAds(res.result[0].total)
		})
		.catch((err)=>{
			console.log(err);
		})

		getLastSixAds()
		.then((res)=>{
			console.log(res);
			setLastAds(res.ads)
		}
		)
		.catch((err)=>{
			console.log(err);
		})

		getAdsByClick()
		.then((res)=>{
			console.log("LES PLUS REGARDER",res.result);
			setAdsByClicks(res.result)
		}
		)
		.catch((err)=>{
			console.log(err);
		}
		)

		
			
	},[])

	useEffect(()=>{


		setCookie("user",user.infos.lastName,5)
		setCookie("userFirstName",user.infos.firstName,5)
		setCookie("userId",user.infos.id,5)
		setCookie("userEmail",user.infos.email,5)
		setCookie("userPhone",user.infos.phone,5)
		setCookie("userAddress",user.infos.address,5)
		setCookie("userCity",user.infos.city,5)
		setCookie("userZipCode",user.infos.zipCode,5)
		
	

	},[])


	//lottie
	useEffect(() => {
        lottie.loadAnimation({
            container:containa.current,
            renderer: 'svg',
            loop: true,
            autoplay: true,
            animationData: require('../assets/lighthouse.json')
        })
      }, [])





	

	const Submenu = (props) => {
		return (


		  <div className='nav_Sub_menu'>
			  {/* sous menu comprenant des boutons : annonces,category,user,avis */}
			<ul className='Sbul_menus'>
			<li className='Sbli_menu'>
			  <Link to="/profil" className="link_submenu_firstLetter">{ firstLetter(user.infos.firstName)}</Link>
        </li>
			<div className='dropdown'>
			  <li className='Sbli_menu'>
				Gatégorie
				<ul className='dropdown-content'>
				
				 {categorys.map((category, index) => (
					 <div>
	  
					 
				   
					   <li className='catSubli' key={index}>
					   <Link to={`/${category}`} className='link_submenu'>{category}</Link>
	   
					   </li>
						  <div className='divider_Admin'></div>
					</div>
				   
				  ))}
	  
				</ul>
	  
			  </li>
			  </div>
		
		{( user.infos.role === "admin") && (
        <li className='Sbli_menu'>
            <li><Link to="/admin" className="link_submenu">Admin</Link></li>
        </li>
             ) }

			 <li>

				<Link to="/annonces" className="link_submenu">Annonces</Link>
			 </li>
			 
			</ul>
	  
		  </div>
		)
	  }
   
   

    return (
       <main className='main_home'>
	  {user.infos.cooks === 0 && (

		<Modal open={openModal} onClose={()=>{ 
		  setOpenModal(false)
		 }} /> )} 
	  
        <header className='homeheader'>
        <img src={logo} alt="logo application" className="logohome"/>
          <h1 className='titlehome'>Bienvenues sur le Phare!</h1>
          <p>Ici vous trouverez votre dernier bijoux nautique ,</p>
        </header>
		
	
           <div className='containr'>
                  <div className='totalAds'>{`Nous avons ${totalAds} Annonces`}</div>
				  {/*barre de recherche*/}
				  <div className='search'>
					  <div className='search_containerHome'>
					  			<div className='search_input'>
								  <form onSubmit={(e)=>{e.preventDefault();
								   searchForKeyword()}}>
								  									<input type="text"
																	  id='searchInputHome'
																	  ref={searchingInput}
																	   placeholder="Rechercher "
																	    onChange={(e)=>setTitle(e.target.value)} />
																	  <input type="submit"
																	   className='searchBarButton'
																	    />
																	   
								</form>									  
								</div>									  

				  </div>
				  </div>

												  	


                <div className='searchBarhome'>
				  <form
				className="c-form c-form--search"
				onSubmit={(e)=>{
					e.preventDefault();
					onSubmitForm()
				}}
			>
				<input 
					type="text" 
					placeholder="Tapez un adresse"
					className='inputSearchHome'
					onChange={(e)=>{
						setAddress(e.currentTarget.value)
					}}
				/>
				<p>Choisissez une categorie : </p>
				<select
					onChange={(e)=>{
						setCategory(e.currentTarget.value)
					}}
				>
					{
						categorys.map((category, index)=>{
							return (<option key={index} value={category}>
										{category}
									</option>)
						})
					}
				</select>
				<p>Quelle distance (km) : </p>
				<select
					onChange={(e)=>{
						setRadius(e.currentTarget.value)
					}}
				>
					{
						[...Array(20).keys()].map((num, index)=>{
							return (<option key={index} value={num+1}>
										{num+1}
									</option>)
						})
					}
				</select>
				<input type="submit" name="Chercher" className='mapBtn'/>
			     </form> 
                </div>

				<div id='mapSearch' >
		        <GoogleMapReact
		          bootstrapURLKeys={{ key: API_KEY }}
		          center={position}
		          zoom={zoom}
		        >
		        	<div
    		            lat={position.lat}
    		            lng={position.lng}
    		            text="My Marker"
		            ><img src="http://www.robotwoods.com/dev/misc/bluecircle.png" alt="..."/>
		            </div>
		         {createMarkers()}
		        </GoogleMapReact>
		    </div>

                <h5 className='lastAds_title'> Toutes nos annonces sont verifiées</h5>
				{( screenWidth < 500) && (
				       <div className='divider'></div>
				)}
				{( screenWidth < 500) && (
					
					<div className='cont_submenu'>
				       <Submenu />
					</div>

					
				)}
                <div className='divider'></div>

        </div>

		
  
        <section className='maincontent'>


	

	
		 

		
			 <div className='contversionHomeaside'>
			 {( screenWidth > 500) && (
			             <aside className='profil_aside'>
			                     <Connected/>
			            </aside>)}

						{( screenWidth > 500) && (
						
		                <aside className='profil_aside_cats'>
		                        <Categories/>
		                </aside> 
			 )}
			 </div>

             <article className='MainArticleHome'>

			 {!KeywordValue && ( 
			          <div>
				        <h4 className='pop_title'>Les annonces les plus populaires</h4>

				          <div className='divider'></div>
                      </div>

				  )}
					  
				

			 <section className='lastAds_secte'>

			 {!KeywordValue && ( 


				<div className='sectforcardss'>

					  { adsByClicks.map((bateau,index)=>{
						return (
				<div className='ads-cardss'>
					  <Link to={"/detail/" + bateau.id}>
					  <CloudinaryContext cloudName="dehjoundt">
					   <div className='ads-card-image' onClick={()=>{

   updateClickAds(bateau.id)
	  .then((res)=>{
		console.log(res);

		}
		)
		.catch((err)=>{
			   console.log(err);
		}
		)


	}}>
					   <BsSearch  className='iconsearch'></BsSearch>
					
					    <Image publicId={bateau.imageUrl} className='imgsads'>
			                <Transformation quality="auto" fetchFormat="auto" />
			              </Image>
			            </div>
			         </CloudinaryContext>
					   </Link>

					   <span className='ads-card-date'>{moment(bateau.creationTimestamp).format("YYYY-MM-DD")}</span><p className='ads-card-title'>{bateau.title.substr(0, 20)}</p>
								  <p className='ads-card-description'>{`${bateau.description.substr(0, 80)} ...`}</p>
								  <p className='slider-card-price'>{`${bateau.price} €`}</p>
								  <p className='ads-card-city'>{bateau.city}</p>

                </div>
						)
					}
					)}
			 </div>


			 )}
              
			 </section>
              {!KeywordValue && (<h5 className='lastAds_title'> Les Dernières Annonces</h5>)}
             <section className='lastAds_secte'>
			         
				   {!KeywordValue ? (

					   <>
			  <div className='sectforcardss'>

					  { lastAds.map((ad,index)=>{
						return (
						
				<div className='ads-cardss'>
					  <Link to={"/detail/" + ad.id} >
					  <CloudinaryContext cloudName="dehjoundt">
					   <div className='ads-card-image'  onClick={()=>{

updateClickAds(ad.id)
	  .then((res)=>{
		console.log(res);

		}
		)
		.catch((err)=>{
			   console.log(err);
		}
		)


	}}>
					   <BsSearch  className='iconsearch'></BsSearch>
					
					    <Image publicId={ad.imageUrl1} className='imgsads'>
			                <Transformation quality="auto" fetchFormat="auto" />
			              </Image>
			            </div>
			         </CloudinaryContext>
					   </Link>

					   <span className='ads-card-date'>{moment(ad.creationTimestamp).format("YYYY-MM-DD")}</span><p className='ads-card-title'>{ad.title}</p>
								  <p className='ads-card-description'>{`${ad.description.substr(0, 80)} ...`}</p>
								  <p className='slider-card-price'>{`${ad.price} €`}</p>
								  <p className='ads-card-city'>{ad.city}</p>

                </div>
			

						)
					}
					)}
			 </div>
				</>
				   ) : (
					<>
					<div className='sectforcardss'>

					  { adsearch.map((ads,index)=>{
						return (
				<div className='ads-cardss'>
					  <Link to={"/detail/" + ads.id}>
					  <CloudinaryContext cloudName="dehjoundt">
					   <div className='ads-card-image' onClick={()=>{

   updateClickAds(ads.id)
	  .then((res)=>{
		console.log(res);

		}
		)
		.catch((err)=>{
			   console.log(err);
		}
		)


	}}>
					   <BsSearch  className='iconsearch'></BsSearch>
					
					    <Image publicId={ads.imageUrl} className='imgsads'>
			                <Transformation quality="auto" fetchFormat="auto" />
			              </Image>
			            </div>
			         </CloudinaryContext>
					   </Link>

					   <span className='ads-card-date'>{moment(ads.creationTimestamp).format("YYYY-MM-DD")}</span><p className='ads-card-title'>{ads.title}</p>
								  <p className='ads-card-description'>{`${ads.description.substr(0, 80)} ...`}</p>
								  <p className='slider-card-price'>{`${ads.price} €`}</p>
								  <p className='ads-card-city'>{ads.city}</p>

                </div>
						)
					}
					)}
			 </div>
			 </>



				   )}
        <div id='bodys'>
        <div className='divider'></div>
                  <ReactCardSlider/>
				  
                  
                </div>
				
			          </section>

               

             </article>
              





        </section>

	<div className='divider'></div>	
       <div className='Newletter'> 
	   <div className='containa' ref={containa}></div>
           <p><b>Abonnez</b> vous à notre NewsLetter pour recevoir les dernieres annonces publiée sur Le Phare</p>
		   <form className='form'>
		   <label> S'abonner</label>
		   <input type='checkbox' 

		   
		    />
			</form>
		   
	   </div>
   
          
     </main>
    );
    }
    export default Jetboat;