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

import {updateImages, getAllAdsByUser, updateAnnonce} from '../api/annonce';
import {useDispatch,useSelector } from 'react-redux';
import {loadUserAnnonces, selectAnnonces} from '../slices/annonceSlice';
import {selectUser} from '../slices/userSlice';
import moment from "moment";
import "moment/locale/fr";

moment.locale("fr");


const ImagesAnnonces = (props)=>{

                      const params = useParams();
                      const dispatch = useDispatch();

                      const user = useSelector(selectUser);
                      const annonce = useSelector(selectAnnonces);
                      const [msg, setMsg] = useState(null);
                      const [title, setTitle] = useState('');
                      const [description, setDescription] = useState('');
                      const [price, setPrice] = useState('');
                      const [category, setCategory] = useState('');
                      const [img, setImg] = useState(null);
	                    const [picture,setPicture] = useState([])

                      console.log(params.id);
                      console.log("la categorie de id",annonce.annonce[0].id);
                      useEffect(()=>{
                          setTitle(annonce.annonce[0].title);
                          setDescription(annonce.annonce[0].description);
                          setPrice(annonce.annonce[0].price);
                          setCategory(annonce.annonce[0].category);
                          setImg(annonce.annonce[0].imageUrl);
                          // setPicture(annonce.imageUrl);
                      },[annonce])

                      useEffect(()=>{
	     
	    
                      },[picture])


                      const savePictures = ()=>{

                        let datas = {
                            imageUrl: picture[0],
                            imageUrl1: picture[1],
                            imageUrl2: picture[2],
                            id: annonce.annonce[0].id
                         
                
                
                        }
                        console.log(params.id);

                        console.log("picture",datas);
                        updateImages(datas)
                          .then((res)=>{
                            if(res.status === 200){
                            
                                setImg(annonce.annonce[0].imageUrl)
                                setMsg("Vous avez bien ajouté voss images")
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
                          updateAnnonce(datas,params.id)
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
                        <h2>annonces</h2>
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
                                    <Image publicId={annonce.annonce[0].imageUrl} id="profilImg">
                                      <Transformation quality="auto" fetchFormat="auto" />
                                    </Image>
                                    <Image publicId={annonce.annonce[0].imageUrl1} id="profilImg">
                                      <Transformation quality="auto" fetchFormat="auto" />
                                    </Image>

                                    <Image publicId={annonce.annonce[0].imageUrl2} id="profilImg">
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
                                    Ajoutez des images a votre annonces
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

export default ImagesAnnonces;