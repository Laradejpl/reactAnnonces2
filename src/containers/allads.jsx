import React, { useState, useEffect } from 'react';
import jetskimg from '../assets/pharelogo.png'
import logo from '../assets/point.png'
import { BsSearch } from "react-icons/bs";
import {Link} from 'react-router-dom';
import {getAllAds,getAllAdsByCat,getNbAds,getAdsByPriceAndCat} from '../api/annonce';
import {marques} from '../helpers/marque';
import {categorys} from '../helpers/category';
import {
    Image,
    Video,
    Transformation,
    CloudinaryContext
  } from "cloudinary-react";

import moment from "moment";
import '../card.css';
import '../App.css';

moment.locale('fr');

const Allads = (props) => {

    const [annonces, setAnnonces] = useState([]);
    const [allAnnonces, setAllAnnonces] = useState([]);
    const [totalAdsCat, setTotalAdsCat] = useState(0);
    const [nombreTotalAds, setNombreTotalAds] = useState(0);
    const [annoncesByPrice, setAnnoncesByPrice] = useState([]);
    const [rangevalMax, setRangevalMax] = useState(100000);
    const [rangevalMin, setRangevalMin] = useState(0);
    const [marque, setMarque] = useState('');
    const [category, setCategory] = useState('');
    const [searchActiv, setSearchActiv] = useState(false);
    const [Message, setMessage] = useState('');
    
    
    
  
    useEffect(()=>{
       
        getAllAds()
        .then((res)=>{
            console.log(res);
            setAllAnnonces(res.ads)
          
        }
        )
        .catch((err)=>{
            console.log(err);
        }
        )
    },[])
    useEffect(()=>{
        
    },[annonces])
    
    // le nombre total d'annonces
    useEffect(()=>{
        getNbAds()
        .then((res)=>{
            setTotalAdsCat(res.result[0].totalbyCategory)
            setNombreTotalAds(res.result[0].total)
        })
        .catch((err)=>{
            console.log(err);
        })
        
            
            
    },[])
    
    //LES FONCTIONS 
    
    
     //avoir toute les annonces  entre deux prix et category et marque
    const onSubmitForm = () => {
    
        const datas = {
            priceMax:rangevalMax,
            priceMin:rangevalMin,
            category:category,
            marque:marque
        }
        getAdsByPriceAndCat(datas)
            .then((res) => {
                setAnnoncesByPrice(res.result)
                setSearchActiv(true)
                console.log(" annonces trouvées",res.result.length)
                setTotalAdsCat(res.result.length)
            
                if(res.result.length===0){
                    //setVoidAds(true)
                    setSearchActiv(false)
                    
                    setMessage('Aucune annonce ne correspond à votre recherche')
                }
                
    
                console.log("FILTER",res.result);
            })
            .catch((err) => {
                console.log(err);
                setMessage("Aucune annonce ne correspond à votre recherche");
            })
    }
    
    
    
    
    
    
    
        return (
            <main className='main_home'>
              
              <header className='homeheader'>
              <img src={jetskimg} alt="logo application" className="logohome"/>
                <h1 className='titlehomeski'>LES ANNONCES</h1>
                
              </header>
              {totalAdsCat >0? <div className='totalAds'>{`Nous avons ${totalAdsCat} Annonces`}</div>: null}
              
            
    
              <h2> Les meilleurs annonces nautiques neufs et d'occasions.</h2>
              <div className='divider'></div>
              <div className='filtre'>
            
            <div className='row_container_filter'>
              <h6 className='title_filter_bar'>Affinnez votre recherche.</h6>
              <div className='divider'></div>
              <form
                          className="filter-f"
                          onSubmit={(e) => {
                            e.preventDefault();
                            onSubmitForm();
                          }}
                        >
              <label>{`Min :${rangevalMin}€`}</label>
              <div>
            <input type="range"  className="custom-range" min="100" max="10000" steps={100} value={rangevalMin} 
    
             onChange={(event) => setRangevalMin(event.target.value)} />
            
          </div>
                <label>{`Max :${rangevalMax}€`}</label>
                <div>
            <input type="range" className="custom-range" min="100" max="100000" steps={100} value={rangevalMax}
             onChange={(event) => {
                 setRangevalMax(event.target.value)
                 
                 }} />
          </div>
            <section >
            <div className='divider'></div>
                <la>Marque</la>
                
    
                <select className='sect_filter_search'
                        name="marque"
                        onChange={(e) => {
                          setMarque(e.currentTarget.value);
                        }}
                      >
                        {marques.map((marque, index) => (
                          <option key={index} value={marque}>
                            {marque}
                          </option>
                        ))}
                      </select>

                      <select className='sect_filter_search'
                        name="category"
                        onChange={(e) => {
                          setCategory(e.currentTarget.value);
                        }}
                      >
                        {categorys.map((cat, index) => (
                          <option key={index} value={cat}>
                            {cat}
                          </option>
                        ))}
                      </select>
    
                
                      <div className='divider'></div>
                
            </section>
            <input
                            className="btn_dodger"
                            type="submit"
                            value="Actualiser"
                          />
          </form>
          </div>
            <div className='divider'></div>
    
    
           </div>
              <div className='mainCardNFilter'>
            
              {!searchActiv ? (
                 
                    <>
              <section className='sectforcards'>
    
             
    
                {allAnnonces.map((adss, index) => {
                    return (
                    
                        <div className='ads-card'>
                        <Link to={"/detail/" + adss.id}>
                        <CloudinaryContext cloudName="dehjoundt">
                         <div className='ads-card-image'>
                         <BsSearch  className='iconsearch'></BsSearch>
                        
                         <Image publicId={adss.imageUrl1} className='imgsads'>
                                <Transformation quality="auto" fetchFormat="auto" />
                              </Image>
                                <h6 className='ads-card-city'>{adss.city} |</h6>
                            </div>
                         </CloudinaryContext>
                         </Link>
    
                         <span className='ads-card-date'>{moment(adss.creationTimestamp).format("YYYY-MM-DD")}</span><p className='ads-card-title'>{adss.title}</p>
                                      <p className='ads-card-description'>{`${adss.description.substr(0, 80)} ...`}</p>
                                      <p className='slider-card-price'>{`${adss.price} €`}</p>
                                     
    
                         </div>
    
    
    
                    
                    )
                })}
            
                </section>
                </>
                                  ) : ( 
                                       
                                      <>
                                                
                                    <section className='sectforcards'>
    
    
         {annoncesByPrice.map((ad, index) => {
        return (
        
            <div className='ads-card'>
            <Link to={"/detail/" + ad.id}>
            <CloudinaryContext cloudName="dehjoundt">
             <div className='ads-card-image'>
             <BsSearch  className='iconsearch'></BsSearch>
            
             <Image publicId={ad.imageUrl1} className='imgsads'>
                    <Transformation quality="auto" fetchFormat="auto" />
                  </Image>
                    <h6 className='ads-card-city'>{ad.city} |</h6>
                </div>
             </CloudinaryContext>
             </Link>
    
             <span className='ads-card-date'>{moment(ad.creationTimestamp).format("YYYY-MM-DD")}</span><p className='ads-card-title'>{ad.title}</p>
                          <p className='ads-card-description'>{`${ad.description.substr(0, 80)} ...`}</p>
                          <p className='slider-card-price'>{`${ad.price} €`}</p>
                         
    
             </div>
    
    
    
    
        
        )
    
    })}
    
    </section>
                                          
    
    </>
                                      )}
    
                
                </div>
               
                
            </main>
        );
}

export default Allads
