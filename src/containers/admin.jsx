import React, {useState,useEffect} from 'react';
import { useSelector } from "react-redux";
import { selectUser } from '../slices/userSlice';
import { capitalize } from '../helpers/toolbox';
import { getAllAdsByUser,deleteAd,getNbAds,getAllAds,getAllAdsByCat } from '../api/annonce';
import { getAllUsers,deleteUser } from '../api/user';
import {deleteOneNote,getAllNotes} from '../api/note';
import missing from '../assets/missing.png'
import { FaStar,FaMarker,FaWindowClose } from 'react-icons/fa';
import {Link} from 'react-router-dom';

import {
  Image,
  Video,
  Transformation,
  CloudinaryContext
} from "cloudinary-react";
import { BsFillGeoFill,BsTelephoneFill } from "react-icons/bs";
import { IoIosApps,IoMdBoat } from "react-icons/io";
import '../Submenu.css'
import { categorys } from '../helpers/category'

import moment from "moment";
import localization from 'moment/locale/fr';
moment.updateLocale('fr', localization);




 const Admin = () => {

  const user = useSelector(selectUser)
  const [allAnnonces, setAllAnnonces] = useState([]);
  const [allAnnoncesByCat, setAllAnnoncesByCat] = useState([]);
  const [allUsers, setAllUsers] = useState([]);
  const [allNotes, setAllNotes] = useState([]);
  const [error, setError] = useState(false);
  const [categorie, setCategorie] = useState('');
  const [userAffichage, setUserAffichage] = useState(false);
  const [noteAffichage, setNoteAffichage] = useState(false);
  const [allAnnonceAffichage, setAllAnnonceAffichage] = useState(false);
 
  const [nbAds, setNbAds] = useState(0);

  useEffect(() => {
    getAllAds()
    .then((res)=>{
      setAllAnnonces(res.ads)
      setNbAds(allAnnonces.length)
      setAllAnnonceAffichage(true)
      console.log("MES ANNONCES",res.ads);


    }
    )
    .catch((err)=>{
      console.log(err);
      setError(true);
    }
    )
   
   

  }, [])

 

  useEffect(() => {
    getAllAdsByCat(categorie)
    .then((res)=>{
      setAllAnnoncesByCat(res.result)
      console.log("MES ANNONCES PAR CAT",res.result);
      setNbAds(allAnnoncesByCat.length)
    }
    )
    .catch((err)=>{
      console.log(err);
      setError(true);
    }
    )
  }, [categorie])

  useEffect(() => {
    getAllNotes()
    .then((res)=>{
      setAllNotes(res.ads)
      console.log("MES NOTES",res.ads);
      setNoteAffichage(true)
    }
    )
    .catch((err)=>{
      console.log(err);
      setError(true);
    }
    )
 
  }, [])

 

  useEffect(() => {
    getAllUsers()
    .then((res)=>{
      setAllUsers(res.result)
      
      console.log("MES USERS",res.result);
    }
    )
    .catch((err)=>{
      console.log(err);
      setError(true);
    }
    )
  }
  , [])

    const Utilisateurs = () => {
    setUserAffichage(true)
    setCategorie("")
    return (
      <div className="admin_users">
       {allUsers.map(utilisateur => (
             
        <div className='containerCardwEdition'>
         <div className='annonce_poster'>
          <div className='annonce_poster_img'>
           
           <CloudinaryContext cloudName="dehjoundt">
             <div className='ads-card-detail-infouser'>
               <Image publicId={utilisateur.imageUser} className='imginfouser'>
                 <Transformation quality="auto" fetchFormat="auto" />
               </Image>
               <h5 className='title_annonce'>{`${capitalize(utilisateur.firstName)}`}</h5>
            
            <h7 className='user-card-description'>{`${capitalize(utilisateur.lastName)}`}</h7>
              </div>
             </CloudinaryContext>
           
          </div>
         <div className='info_annonce_poster'>
           
            
            <h6 className='user_card'>{` Addresse: ${capitalize(utilisateur.city.substr(0, 30))} | ${capitalize(utilisateur.address)},${utilisateur.zip} `}</h6>
            <h7 className='user_card'>{` Email: ${utilisateur.email} | Tel :${utilisateur.phone} `}</h7>
            <h6 className='user-card-date_poster'>{` Incris depuis: ${moment(utilisateur.creationTimestamp).format('LL')}`}</h6>
            <h6 className='user-card-date_poster'>{` Role : ${utilisateur.role}`}</h6>
           
          </div>  


          </div>
        
          <div className='EditionPalette' >
          
           <FaWindowClose className='iconEdt' onClick={()=>{
            deleteUser(utilisateur.id)
             .then(res=>{
               setAllUsers(allUsers.filter(uSer=>uSer.id !== utilisateur.id))
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
      

         ))}
      </div>
    )

  }

  const Notes = () => {
    
    setCategorie("")
    setUserAffichage(false)
    return (
      <div className="admin_users">
       {allNotes.map(note => (
             
        <div className='containerCardwEdition'>
         <div className='annonce_poster'>
          <div className='annonce_poster_img'>
           
        
           
          </div>
         <div className='info_annonce_poster'>
           
            
            <h6 className='user_card'>{` Titre: ${capitalize(note.title_note.substr(0, 30))} | ${note.note}/5`}</h6>
            <p className='user_card'>{` description: ${note.description} `}</p>
            <div className='divider'></div>
            <h6 className='user-card-date_poster'>{` Id de l'auteur: ${note.id_posteur}`}</h6>
            <h7>{` id de l'annonce:${note.id}`}</h7>
           
           
          </div>  


          </div>
        
          <div className='EditionPalette' >
          
           <FaWindowClose className='iconEdt' onClick={()=>{
            deleteOneNote(note.id)
             .then(res=>{
               setAllNotes(allNotes.filter(avis=>avis.id !== note.id))
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
      

         ))}
      </div>
    )
  }

  
	
  return (
    <main className='contAdmin'>
      

            <div className='contAdmin_content'>

                 <h1>Administration</h1>
                 <div className='divider'></div>
                <div className='contAdmin_content_title'>
                  <p>Bienvenue <span className='usernameAdmin'>{capitalize(user.infos.firstName)}</span> dans
                   votre espace d'administration</p>
                 </div>
            </div>



            <div className='nav_Sub_menu'>
       
      <ul className='Sbul_menu'>
      <div className='dropdown'>
      
        <li className='Sbli_menu'>
          Annonces
          <ul className='dropdown-content'>
          <li className='catSubli' onClick={()=>{
            setCategorie("")
            setUserAffichage(false)
            setNoteAffichage(false)
           setAllAnnonceAffichage(true)
            }}>Les annonces</li>
          <div className='divider_Admin'></div>
           {categorys.map((category, index) => (
               <div>

              
             
               <li className='catSubli' key={index} onClick={()=>{
                 setCategorie(category)
                 setUserAffichage(false)
                 setNoteAffichage(false)
                 setAllAnnonceAffichage(false)
                
    
                 console.log(category)
                 }}>
                    {category}


                </li>
                    <div className='divider_Admin'></div>


               </div>
               

                
            )
            
            
            )}


              
          </ul>



        </li>
        </div>
        <li className='Sbli_menu' onClick={()=>{ 
          setUserAffichage(true)
          setNoteAffichage(false)
          setAllAnnonceAffichage(false)
          
          }} >
        Utilisateurs
        </li>
        <li className='Sbli_menu'  onClick={()=>{
          setNoteAffichage(true)
          setCategorie("")
          setAllAnnonceAffichage(false)
          }}>
          Avis
        </li>
      </ul>

    </div>




             <div className='divider'></div>
           <div className='main_cont_admin'>


            <div className='cont_admin_annonces'>
              <h1 className='titleAdmin'> <IoMdBoat /> Les annonces</h1>
               <div className='divider_blanc'></div>
             
                <div className='cont_admin_annonces_content'>
                  <div className='cont_admin_annonces_content_title'>
                 
                   <p>Nombre d'annonces : <span className='nbAnnonces'>{nbAds}</span></p>
                     </div>
                    </div>
                  
                  <div className='divider_blanc'></div>
                  <article className='containe'>
                     {/* ont map pour avoir toutes les annonces du user sous form de tableau avec petite image le titre et description ,la date*/}
           
                     <div className='containerAnnonces_poster'>
                       {userAffichage &&(<Utilisateurs />)} 
                        {noteAffichage && !allAnnonceAffichage &&(<Notes />)}
                     {categorie === ""  && !userAffichage  && allAnnonceAffichage ? (
                       <>
                       

              {allAnnonces.map(ads => (
             
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
                    setAllAnnonces(allAnnonces.filter(annonce=>annonce.id !== ads.id))
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
           

              ))}

                       </>


                     ) : (


                        <>

                         <h3>{categorie}</h3>

                         {allAnnoncesByCat.map(aBc => (
             
             <div className='containerCardwEdition'>
              <div className='annonce_poster'>
               <div className='annonce_poster_img'>
                <Link to={`/detail/${aBc.id}`}>
                <CloudinaryContext cloudName="dehjoundt">
                  <div className='ads-card-detail-infouser'>
                    <Image publicId={aBc.imageUrl} className='imginfouser'>
                      <Transformation quality="auto" fetchFormat="auto" />
                    </Image>
                   </div>
                  </CloudinaryContext>
                </Link>
               </div>
              <div className='info_annonce_poster'>
                 <h5 className='title_annonce'>{`${aBc.title.substr(0, 14)}`}</h5>
                 
                 <p className='ads-card-description'>{`${aBc.description.substr(0, 80)} ...`}</p>
                  
                  <p className='ads-card-date_poster'>{moment(aBc.creationTimestamp).format('LL')}</p>
                
               </div>  


               </div>
             
               <div className='EditionPalette' >
                <div className='iconEdt'>

                 <Link to={`/edityourads/${aBc.id}`}><FaMarker /></Link>
                </div>
                <FaWindowClose className='iconEdt' onClick={()=>{
                 deleteAd(aBc.id)
                  .then(res=>{
                    // eslint-disable-next-line no-self-compare
                    setAllAnnoncesByCat(allAnnoncesByCat.filter(allAnnonce=>allAnnonce.id !== aBc.id))
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
           

              ))}


                        </>
                     )}
              
                    </div> 
              
                  </article>
           </div> 
                  
                    

        </div>

    </main>
	)
  
}
export default Admin;
