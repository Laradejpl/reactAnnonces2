import React, { useState, useEffect } from 'react';
import {Link} from 'react-router-dom';
import pub from '../assets/pubmarine.jpg'
import { BsSearch } from "react-icons/bs";
import { FaStar } from 'react-icons/fa';
import { FiWind} from 'react-icons/fi';
import {getAllAdsByUser } from '../api/annonce';
import {getAvgNotesByUser,getAllNotesByUser} from '../api/note';
import {getOneUser} from '../api/user';
import {
    Image,
    Video,
    Transformation,
    CloudinaryContext
  } from "cloudinary-react";
import { BsFillGeoFill,BsTelephoneFill,BsCloudy } from "react-icons/bs";
import { IoIosApps,IoMdBoat } from "react-icons/io";
import {selectUser} from '../slices/userSlice';
import {useDispatch,useSelector } from 'react-redux'; 
import axios from 'axios';
import Fade from 'react-reveal/Fade';
import {WiCloud,WiRaindrop,WiThermometer} from "react-icons/wi";
import { ImOffice } from "react-icons/im";
import moment from "moment";
import localization from 'moment/locale/fr';
moment.updateLocale('fr', localization);


  

 

const Posteur = (props) => {
    
    const id = props.params.id
    const [posteur, setPosteur] = useState({});
    const [avisAffichage, setAvisAffichage] = useState(false);
    const [noteAvg, setNoteAvg] = useState(0);
    const [adsByUser, setAdsByUser] = useState([]);
    const [titleValue, setTitleValue] = useState("Toutes ces annonces");
    const [allNotes, setAllNotes] = useState([]);
    const[weather,setWeather] = useState({});
    const [city, setCity] = useState('');
    const user = useSelector(selectUser)
    const [error, setError] = useState(true);
    const [icone, setIcone] = useState('');
    const [urlOfWeather, setUrlOfWeather] = useState('');
    //const iconUrl = "http://openweathermap.org/img/w/" + icone + ".png"
    const iconUrl = "http://openweathermap.org/img/w/"

    const apiKey = "391e323b0497a6560ceb8c50c68a01e3";
    
   
  

   useEffect(() => {
    const town=  user.infos.city
    setCity(town);

    getOneUser(id).then(res => {
        setPosteur(res.result)
        console.log(res.result);
    })

    getAvgNotesByUser(id).then(res => {
        console.log( "LA NOTE MOYENNE" ,res.result[0].moyenne);
        setNoteAvg(res.result[0].moyenne);
    })

    getAllAdsByUser(id).then(res => {
        setAdsByUser(res.result);
        console.log(res.result);
    })
    
    // avoir la météo pour les navigateurs par api openweathermap
    
    const url = `http://api.openweathermap.org/data/2.5/weather?q=${town}&appid=${apiKey}&units=metric`;
    fetch(url)
    .then(res => res.json())
    .then(data => {

        setWeather(data);
        setIcone(data.weather[0].icon);
        //setUrlOfWeather(iconUrl);
        console.log( "WEATHER",weather);
        setError(false);
    })

    


   } , [])


 

   const loadAvis = () => {
     

     getAllNotesByUser(id).then(res => {
      console.log("LES AVIS",res.result);
      setAllNotes(res.result);
      setAvisAffichage(true);
     
  })

     
     setTitleValue("Les avis");
     
     

   }
   const loadAnnonces = () => {
    setAvisAffichage(false);
    setTitleValue("Toutes ces annonces");
  }


    
    
    
  

  



 

  return (
    <div>
   <main className='main_poster'>

   
    <h1 className='titlePosteur'>Le profil du vendeur</h1>
    <ul className='Linkposter'>
       <li onClick={loadAvis}><IoIosApps/>Avis</li>
        <li onClick={loadAnnonces}><IoMdBoat />Annonces</li>
    </ul>

    <div className='divider'></div>
    {/*WIDGET méteo*/}
    {!error &&  
       
       <div className='weather'>
       <div className='weather_info'>
      <h5>{weather.name} | {weather.sys.country}</h5> 
       <p><WiThermometer />{weather.main.temp}°C</p>
       </div>
       <div className='iconeNdescWeather'>

        <div className='weather_img'>
         {!error && 
          <img src={`https://openweathermap.org/img/w/${weather.weather[0].icon}.png`} alt="logo application" className="weather_img"/>}
       </div>
          <p><BsCloudy /> {weather.weather[0].description}</p>
          <p><FiWind /> {`${weather.wind.speed} m/s`}</p>


       </div>


       </div>
     
      
      }
      {/*FIN WIDGET méteo*/}
    <div className='controwposter'>
     <section className='mainContainerPoster'>
       <section className='secondContainerPoster'>

       <Fade left>
                 <article className='containerImageAndInfoUser'>

                 <CloudinaryContext cloudName="dehjoundt">
            <div className='ads-card-detail-infouser'>
 

           <Image publicId={posteur.imageUser} className='imginfouser'>
                      <Transformation quality="auto" fetchFormat="auto" />
                    </Image>
               {/*
               <p>{`NOTE ${parseInt(noteAvg)} | 5 ` }</p>

               */} 
                <div>
            {[...Array(5)].map((star,i) => {
            const ratingValue = i + 1; 
            return (
                <label>
                   
                    <FaStar color={ratingValue <= (noteAvg) ? "#ffc107" : "#e4e5e9"}
                      className="star"
                      size={20}
                     
                       />
               
                </label>
                

                
            );
        })}
            </div>
                  </div>
               </CloudinaryContext>

               <div className="info_poster_cont">

                <h3 className='nameUser'>{posteur.lastName}|{posteur.firstName}</h3>
                <p className='infoUser'><BsFillGeoFill />{posteur.city}</p>
                <p><BsTelephoneFill /> {posteur.phone}</p>
                            
               </div>


                 </article>
                  </Fade>
                  <h2 id="titreAvisAnnonces" >{titleValue}</h2>
                  <div className='divider'></div> 
                 <article className='containerInfo'>
                 {/* ont map pour avoir toutes les annonces du user sous form de tableau avec petite image le titre et description ,la date*/}
                  {!avisAffichage ? (
                <div className='containerAnnonces_poster'>
                  {adsByUser.map(annonce => (
                 <Fade right>
                <div className='annonce_poster'>
                   <div className='annonce_poster_img'>
                    <Link to={`/detail/${annonce.id}`}>
                    <CloudinaryContext cloudName="dehjoundt">
                      <div className='ads-card-detail-infouser'>
                        <Image publicId={annonce.imageUrl} className='imginfouser'>
                          <Transformation quality="auto" fetchFormat="auto" />
                        </Image>
                       </div>
                      </CloudinaryContext>
                    </Link>
                   </div>
                  <div className='info_annonce_poster'>
                     <h5 className='title_annonce'>{`${annonce.title.substr(0, 14)}`}</h5>
                     
                     <p className='ads-card-description'>{`${annonce.description.substr(0, 80)} ...`}</p>
                      
                      <p className='ads-card-date_poster'>{moment(annonce.creationTimestamp).format('LL')}</p>
                    
                   </div>  


                  </div>
                </Fade>

                  ))}
                  
                  </div>) : (
                    <div className='containerAnnonces_poster'>
                  {allNotes.map(avis => (
                 <Fade right>
                <div className='annonce_poster'>
                   <div className='annonce_poster_img'>
                    
                    <CloudinaryContext cloudName="dehjoundt">
                      <div className='ads-card-detail-infouser'>
                        <Image publicId={avis.imageUser} className='imginfouser'>
                          <Transformation quality="auto" fetchFormat="auto" />
                        </Image>
                        <h5>{avis.lastName}</h5>
                       </div>
                      </CloudinaryContext>
                   
                   </div>
                  <div className='info_annonce_poster'>
                     <h5 className='title_annonce'>{`${avis.title_note.substr(0, 25)}`}</h5>
                     <p className='ads-card-description'>{`${avis.description.substr(0, 80)} ...`}</p>
                     <p className='ads-card-date_poster'>{`Note:${avis.note}/5`}</p>
                      
                     
                    
                   </div>  


                  </div>
                </Fade>

                  ))}
                  
                  </div>

                  )}
                  
                 </article>



       </section>


     </section>
     <aside className='asideposterpub'>
       <img src={pub} alt="logo application" className="pubmarine"/>

       <article className='containar'>

    
       


       </article>


     </aside>

    </div>
    </main>
    </div>
  )
}

export default Posteur
