import React,{useState,useEffect} from 'react';
import { useParams } from "react-router";
import {Navigate} from 'react-router-dom';
import {categorys} from '../helpers/category';

import {
    Image,
    Video,
    Transformation,
    CloudinaryContext
  } from "cloudinary-react";

import {updateImages,updateAnnonce,getOneAnnonce,getAllAdsByUser} from '../api/annonce';
import {useDispatch,useSelector } from 'react-redux';
import {selectUser} from '../slices/userSlice';
import {loadUserAnnonces, selectAnnonces} from '../slices/annonceSlice';
import moment from "moment";
import "moment/locale/fr";

moment.locale("fr");



 const Edityourads = (props) => {

                    
                      const dispatch = useDispatch();
                      const id = props.params.id;
                      const [annonce,setAnnonce] = useState({});
                      const user = useSelector(selectUser);
                      const [msg, setMsg] = useState(null);
                      const [title, setTitle] = useState('');
                      const [description, setDescription] = useState('');
                      const [price, setPrice] = useState('');
                      const [category, setCategory] = useState('');
                      const [img, setImg] = useState(null);
	                  const [picture,setPicture] = useState([])

                      console.log(id);
                        useEffect(() => {
                            getOneAnnonce(id)
                            .then(res => {
                                console.log( "VOICI MON ANNONCE",res.result.imageUrl);
                                setAnnonce(res.result);
                                setTitle(res.result.title);
                                setDescription(res.result.description);
                                setPrice(res.result.price);
                                setCategory(res.result.category);
                                setImg(res.result.imageUrl);
                            })
                            .catch(err => {
                                console.log(err);
                            }
                            
                            
                            )
                            }, [])


                            useEffect(()=>{
	     
	    
                            },[picture])
      
      
                            const savePictures = ()=>{
      
                              let datas = {
                                  imageUrl: picture[0],
                                  imageUrl1: picture[1],
                                  imageUrl2: picture[2],
                                  id:id
                               
                              }
                             
      
                              console.log("picture",datas);
                              updateImages(datas)
                                .then((res)=>{
                                  if(res.status === 200){
                                 
                                      setImg(annonce.annonce.imageUrl)
                                      setMsg("Vous avez bien ajouté vos images")
                                  }else{
                                    setMsg("L'image n'a pas été ajouter");
                                  }
                                })
                                .catch((err)=>{
                                  console.log(err);
                                }
                                )
                              }
                              
                               const checkUploadResult = (resultEvent) => {
                                 setMsg(null)
                                 //si l'envoi est réussit
                                    if (resultEvent.event === "success") {
                                        console.log("RESULT", resultEvent);
                          
                                          console.log("result info", resultEvent.info);
                                              let pictures = picture
                                              pictures.push(resultEvent.info.public_id )
                                              console.log("mypicts",pictures);
                                              setPicture(pictures)
                                             savePictures()
                                    
                                       }else{
                                              console.log("Erreur envoi fichier")
                                            }
                                   }
      
      
                                       const showWidget = () => {
                                   //paramètrage de l'interface
                                   let widget = window.cloudinary.createUploadWidget(
                                     {
                                       cloudName: "dehjoundt",//nom de mon cloud
                                       uploadPreset: "coachme",//dossier ou l'on veut envoyer
                                       maxImageWidth: 800,//on peut paramètrer la taille max de l'image
                                       cropping: false,//recadrage
                                     },
                                       (error, result) => {
                                  //console.log(error);
                                  //console.log(result);
                                     checkUploadResult(result);//appel de notre callback
                                    }
                                  );
                               //ouverture de notre interface
                                widget.open();
                              }


                            const onSubmitForm = ()=>{

                                let datas = {
                                  title: title,
                                  description: description,
                                  price: price,
                                  category: category
                                  
        
                                 }
                                 updateAnnonce(datas,id)
                                 .then((res)=>{
                                   if(res.status === 200){
                                    getAllAdsByUser(user.infos.id)
                                       .then((response)=>{
                                         let myAnnonce = response.result
      
                                          dispatch(loadUserAnnonces(myAnnonce))
                                         
                                          setImg(response.result.imageUrl)
                                      })
      
                                          setMsg("Vous avez bien modifié votre annonce")
                                      }else{
                                             setMsg("L'annonce n'a pas été modifié");
                                        }
                                     }
                                     )     
                                 
                               }




                               return (
                                <div>
                              <h2> Mpdifiez votre annonce</h2>
                              {msg !== null && <p>{msg}</p>}
                              
                                  <br />
                                  <form
                                      className="c-form"
                                        onSubmit={(e)=>{
                                            e.preventDefault();
                                            onSubmitForm();
                                          }}
                                  >	
                                      {img !== null && <CloudinaryContext cloudName="dehjoundt">
                                        <div>
                                          <Image publicId={annonce.imageUrl} id="profilImg">
                                            <Transformation quality="auto" fetchFormat="auto" />
                                          </Image>
                                          <Image publicId={annonce.imageUrl1} id="profilImg">
                                            <Transformation quality="auto" fetchFormat="auto" />
                                          </Image>
      
                                          <Image publicId={annonce.imageUrl2} id="profilImg">
                                            <Transformation quality="auto" fetchFormat="auto" />
                                          </Image>
                                        </div>
                                     </CloudinaryContext>}
                                      
                                      <button
                                          onClick={(e) => {
                                            e.preventDefault();
                                            showWidget();
                                          }}
                                      >
                                          Modifiez les images de votre annonce
                                      </button>
                                <input 
                                  type="text" 
                                  placeholder="Titre de l'annonce"
                                  value={title}
                                  onChange={(e)=>{
                                    setTitle(e.currentTarget.value)
                                  }}
                                />
                               
                                <textarea
                                  type="decription" 
                                  placeholder="Description de l'annonce"
                                  value={description}
                                  onChange={(e)=>{
                                    console.log(e.currentTarget.value)
                                    setDescription(e.currentTarget.value)
                                  }}
                                >
                                </textarea>
                                <input 
                                  type="text" 
                                  placeholder="prix de l'annonce" 
                                  value={price}
                                  onChange={(e)=>{
                                    setPrice(e.currentTarget.value)
                                  }}
                                />
                               
                                <label className='labelcat'>{category}</label>
                        <select
                          name="category"
                          onChange={(e) => {
                            setCategory(e.currentTarget.value);
                          }}
                        >
                          {categorys.map((category, index) => (
                            <option key={index} value={category}>
                              {category}
                            </option>
                          ))}
                        </select>
                            
                               
                                      
                                      <input type="submit" name="Enregister"/>
                                 </form>
                              </div>
                            )
}

export default Edityourads;

