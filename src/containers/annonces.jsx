import React, { useState, useEffect } from 'react';
import {Link} from 'react-router-dom';
import pub from '../assets/pubmarine.jpg'
import { BsSearch } from "react-icons/bs";
import { FaStar,FaMarker,FaWindowClose } from 'react-icons/fa';
import { getAllAdsByUser,deleteAd } from '../api/annonce';
import missing from '../assets/missing.png'

import {
    Image,
    Video,
    Transformation,
    CloudinaryContext
  } from "cloudinary-react";
import { BsFillGeoFill,BsTelephoneFill } from "react-icons/bs";
import { IoIosApps,IoMdBoat } from "react-icons/io";
import {selectUser} from '../slices/userSlice';
import {useSelector } from 'react-redux'; 
import Fade from 'react-reveal/Fade';
import moment from "moment";
import localization from 'moment/locale/fr';
moment.updateLocale('fr', localization);

const Annonce = (props) => {

    const user = useSelector(selectUser)
    const [annonces, setAnnonces] = useState([]);
    const [error, setError] = useState(false);
    const [isActiv, setIsActiv] = useState(false);


    useEffect(() => {
        const id = user.infos.id;
        getAllAdsByUser(id)
        .then((res)=>{
          setAnnonces(res.result)
          console.log("MES ANNONCES",id);
          
      
        })
        .catch((err)=>{
          console.log(err);
          setError(true);
        })

    }, [])


   


        
   

  return (
    <div>
         <main className='main_poster'>

   
<h1 className='titlePosteur'> <IoMdBoat /> Mes annonces</h1>


<div className='divider'></div>
<div className='controwposter'>
 <section className='mainContainerPoster'>
   <section className='secondContainerPoster'>

  
              
             
             <article className='containerInfo'>
             {/* ont map pour avoir toutes les annonces du user sous form de tableau avec petite image le titre et description ,la date*/}
           
            <div className='containerAnnonces_poster'>
              {annonces.map(ads => (
             <Fade right>
             <div className='containerCardwEdition'>
              <div className='annonce_poster'>
               <div className='annonce_poster_img'>
                <Link to={`/detail/${ads.id}`}>
                <CloudinaryContext cloudName="dehjoundt">
                  <div className='ads-card-detail-infouser'>
                    <Image publicId={ads.imageUrl} className='imginfouser'>
                      <Transformation quality="auto" fetchFormat="auto" />
                    </Image>
                   </div>
                  </CloudinaryContext>
                </Link>
               </div>
              <div className='info_annonce_poster'>
                 <h5 className='title_annonce'>{`${ads.title.substr(0, 14)}`}</h5>
                 
                 <p className='ads-card-description'>{`${ads.description.substr(0, 80)} ...`}</p>
                  
                  <p className='ads-card-date_poster'>{moment(ads.creationTimestamp).format('LL')}</p>
                
               </div>  


               </div>
             
               <div className='EditionPalette' >
                <div className='iconEdt'>

                 <Link to={`/edityourads/${ads.id}`}><FaMarker /></Link>
                </div>
                <FaWindowClose className='iconEdt' onClick={()=>{
                 deleteAd(ads.id)
                  .then(res=>{
                    setAnnonces(annonces.filter(annonce=>annonce.id !== ads.id))
                    console.log("DELETE",res);
                  }
                  )
                  .catch(err=>{
                    console.log(err);
                  }
                  )
                 
                 
                 
                 
                 }} />


               </div>
              </div>
            </Fade>

              ))}
              
              </div> 
              
             </article>



   </section>


 </section>


</div>
</main>

    </div>
  )
}
export default Annonce;
