import React, { useState, useEffect } from 'react';
import {Link} from 'react-router-dom';
import {getOneAnnonce,getUserInfoByAnnonce,getLastTreeAdsByCat } from '../api/annonce';
import {saveOneNote} from '../api/note';
import logo from '../assets/pharelogo.png'
import modalimg from '../assets/voilier.png'
import { BsSearch } from "react-icons/bs";
import { FaStar } from 'react-icons/fa';
import { BsFillGeoFill,BsFillCreditCardFill,BsTelephoneFill } from "react-icons/bs";
import '../Modal.css'

//import Modal from '../components/Modal';

import {
  Image,
  Video,
  Transformation,
  CloudinaryContext
} from "cloudinary-react";
import moment from "moment";
import localization from 'moment/locale/fr';
import {selectUser} from '../slices/userSlice';
import {useDispatch,useSelector } from 'react-redux';
import Fade from 'react-reveal/Fade';



moment.updateLocale('fr', localization);

const Detail = (props)=>{
    

    
  
  const user = useSelector(selectUser)
    const dispatch = useDispatch()
   
  const id = props.params.id
  const [userId, setUserId] = useState(0);
  const [idPosteur, setIdPosteur] = useState(0);
  const [OneAd, setOneAd] = useState({});
  const [userI, setUserI] = useState({});
  const [treeAds, setTreeAds] = useState([]);
  const [lastName, setLastName] = useState('');
  const [phone, setPhone] = useState('');
  const [pictureUser, setPictureUser] = useState('');
  const [categoryAds, setCategoryAds] = useState('');
  const [img, setImg] = useState('');
  const  [img1, setImg1] = useState('');
  const  [img2, setImg2] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [city, setCity] = useState('');
  const [openModal, setOpenModal] = useState(false);
  const [rating, setRating] = useState(null);
  const [hover, setHover] = useState(null);
  const [msg, setMsg] = useState('');

 
 
 
  const [connectUserId, setConnectUserId] = useState(null);
  const [titleNote, setTitleNote] = useState('');
  const [descriptionNote, setDescriptionNote] = useState('');
  const [note, setNote] = useState(null);

    
    useEffect(() => {
        getOneAnnonce(id)
        .then(res => {
        
          setOneAd(res.result);
          setImg(res.result.imageUrl);
          setImg1(res.result.imageUrl1);
          setImg2(res.result.imageUrl2);
          setTitle(res.result.title);
          setDescription(res.result.description);
          setPrice(res.result.price);
          setCity(res.result.city);
          setCategoryAds(res.result.category);
          setIdPosteur(res.result.user_id);

        
          
        })
        .catch(err => {
            console.log(err)
        })


        getUserInfoByAnnonce(id,userId)
        .then(res => {
         
          setUserI(res.result[0]);
          setLastName(res.result[0].lastName);
          setPhone(res.result[0].phone);
          setPictureUser(res.result[0].imageUser);
          setConnectUserId(res.result[0].id);
          setNote(res.result[0].note);
         
        })
        .catch(err => {
            console.log(err)
        })
     

        getLastTreeAdsByCat(categoryAds)
        .then(res => {
          //console.log("LAST",res.ads);
         
          setTreeAds(res.ads);
         
        })
        .catch(err => {
            console.log(err)
        })

        
    },[])

   
    
   const showModal = () => {
    setOpenModal(true);
    
  };

    //affichage du posteur de l'annonce
    //console.log("LES TROIS ANNONCES",treeAds); 
    const onSubmitForm = ()=>{

      const data = {
        note: rating,
        id_annonce: id,
        id_dunoteur: user.infos.id,
        title_note: titleNote,
        description: descriptionNote,
        id_posteur: idPosteur
      }
      saveOneNote(data)
      //console.log("ONT SAUVEGARDE",data)
      .then((res)=>{

        if(res.status === 200){
       
        console.log('le résultat',res);
        setMsg('Vous avez notez le vendeur.');
        showModal();
        }else{
          console.log('le résultat',res);
          setMsg('Vous avez déja notez le vendeur.');
          console.log(msg);
        }
      }
      )
      .catch((err)=>{
        console.log('erreur',err);
       
      }
      )


}
//Modal

const Modal = ({open,onClose}) => {

  if(!open) return null  
return (
  <div onClick={onClose} className='overlay'>
      <div onClick={(e)=>{e.stopPropagation()}} 
       className='modalContainer'>
          <img className='imgModal' src={modalimg} alt=".. " />
        <div  className="modalRight">
         <p onClick={onClose} className='closeBtn'>X</p>
          
          <div className="modalContent">

               <h5>Message</h5>
               <div className="divider"></div>
               <p>{msg}</p>
                


          </div>
    
        </div> 
      </div>
  </div>
)
}





   
    
    
  return (
    <main className="container">

      <Modal open={openModal} onClose={()=> setOpenModal(false)} />  
      <header className='detailheader'>
		           <img src={logo} alt="logo application" className="logohome"/>
                <div className='bg_detail_header'>
                     <h1 className='titledetailhead'> le Phare!</h1>
			               <p className='pfdetail'>Une aventure ,une passion ,la mer vous attend...</p>

              </div>
		
		  </header>

 <div className='detail'>
    <section className='sect_detail'>
    <article className='aside_photo_container'>

      <div className='ads-card-detail'>

          <CloudinaryContext cloudName="dehjoundt">
           <div className='ads-card-detail'>
 

           <Image publicId={img} className='imgsadetail'>
                      <Transformation quality="auto" fetchFormat="auto" />
                    </Image>
                  </div>
               </CloudinaryContext>
 
          </div>

          <div className='ads-card-detail'>

          <CloudinaryContext cloudName="dehjoundt">
           <div className='ads-card-detail'>
 
           <Image publicId={img1} className='imgsadetail'>
                      <Transformation quality="auto" fetchFormat="auto" />
                    </Image>
                  </div>
               </CloudinaryContext>
 
          </div>

          <div className='ads-card-detail'>

          <CloudinaryContext cloudName="dehjoundt">
           <div className='ads-card-detail'>
 
           <Image publicId={img2} className='imgsadetail'>
                      <Transformation quality="auto" fetchFormat="auto" />
                    </Image>
                  </div>
               </CloudinaryContext>
 
</div>

</article>

 <article className='article-detail'>
    <div className='detail_annonce'>
           <h3 className='titledet'>{title}</h3>
           <div className='divider'></div>
           <p className='descdetail'>{description}</p>
           <div className='divider'></div>
           <div className='iconNtext'>
               <BsFillCreditCardFill style={{marginRight:5}}/><p className='pricedetail'>{`Le prix: ${price}`} €</p>
           </div>
            <div className='divider'></div>
            <div className='iconNtext'>
                 <BsFillGeoFill style={{marginRight:5}}/><p className='citydetail'>{`l'annonce se situe: ${city}`}</p>
            </div>
           
            <div className='divider'></div>
            <div><h6> {msg}</h6></div>
            <div><h5> Si vous avez achetez cette article, noté ce vendeur</h5></div>
            <form onSubmit={(e) => {
                        e.preventDefault();
                        onSubmitForm();
                      }}>
  
               <input type="text" placeholder="Titre"  className='inputModal'   value={titleNote} onChange={(e) => setTitleNote(e.target.value)} />
                       
           
                <textarea placeholder="Description"  className='inputModal'    value={descriptionNote} onChange={(e) => setDescriptionNote(e.target.value)} />
                    
                    
                     <div>
        
           
       {[...Array(5)].map((star,i) => {
            const ratingValue = i + 1; 
            return (
                <label>
                    <input type="radio"
                      className='radioStarBtn'
                       name="rating" 
                       value={ratingValue} 
                       onClick={() => setRating(ratingValue)}
                       
                      
                         />
                    <FaStar color={ratingValue <= (hover || rating) ? "#ffc107" : "#e4e5e9"}
                      className="star"
                      size={50}
                      onMouseEnter={() => setHover(ratingValue)}
                      onMouseLeave={() => setHover(null)}
                       />
               
                </label>
                

                
            );
        })}

        <p> la note est de {rating}</p>
</div>
  <input type="submit" name="Enregister" className='btnOutline' />
  
                   </form>
            
    </div>
    <div className='divider'></div>
  
   </article>

    <article className='article-detail-user'>
       <div className='detail_annonce'>
       <h4>Publier par:</h4>
       <CloudinaryContext cloudName="dehjoundt">
           <div className='ads-card-detail-infouser'>
 

           <Image publicId={pictureUser} className='imginfouser'>
                      <Transformation quality="auto" fetchFormat="auto" />
                    </Image>
                  </div>
               </CloudinaryContext>

            <h3 className='titledet'>{lastName}</h3>
            <div className='iconNtext'>
            <BsTelephoneFill  style={{marginRight:5,fontSize:10}}/> <p className='descdetail'>{phone}</p>
          

            </div>
           
            
            <Link to={`/posteur/${idPosteur}/`} className='modalBtn'>Voir son profil</Link>
            
            <div className='divider'></div>

       </div>

    </article>

    </section>
  <div>

   <section className='sect_detail_adsim'>
   {/*
   
   <div className='sectforcards'>
					{treeAds.map((ad,index)=>{
						return (
							<div className='ads-card'>
					<Link to={"/detail/" + ad.id}>
					<CloudinaryContext cloudName="dehjoundt">
					 <div className='ads-card-image'>
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
   
   */}



      
   </section>

  </div>
   </div>
   </main>
  );
}


export default Detail