import React, { useState, useEffect } from 'react';
import jetskimg from '../assets/jetskii.png'
import { BsSearch } from "react-icons/bs";
import {Link} from 'react-router-dom';
import {getAllAdsByCat,getNbAdsByCat} from '../api/annonce';
import {
    Image,
    Video,
    Transformation,
    CloudinaryContext
  } from "cloudinary-react";

import moment from "moment";
import '../card.css';

moment.locale('fr');


const Jetski = (props) => {



const [annonces, setAnnonces] = useState([]);
const [totalAdsCat, setTotalAdsCat] = useState(0);




let category = props.category;
category="Jetski";
useEffect(()=>{
	getAllAdsByCat(category)
	.then((res)=>{
		console.log(res);
		setAnnonces(res.result)
		

	})
	.catch((err)=>{
		console.log(err);
	})
},[])
useEffect(()=>{
	
},[annonces])

// le nombre total d'annonces
useEffect(()=>{
	getNbAdsByCat(category)
	.then((res)=>{
		setTotalAdsCat(res.result[0].totalbyCategory)
	})
	.catch((err)=>{
		console.log(err);
	})
	
		
		
},[])



    return (
        <main className='main_home'>
		  <header className='homeheader'>
		  <img src={jetskimg} alt="logo application" className="logohome"/>
			<h1 className='titlehome'>Jetski</h1>
			<p>Plus qu'un bateau une monture puissante</p>
		  </header>
		  
		  <div className='totalAds'>{`Nous avons ${totalAdsCat} Annonces`}</div>
		  <h2> les meilleurs  Jetski d'occasion</h2>
		  <div className='divider'></div>
		  <section className='sectforcards'>

			{annonces.map((annonce, index) => {
				return (
                
					<div className='ads-card'>
					<Link to={"/detail/" + annonce.id}>
					<CloudinaryContext cloudName="dehjoundt">
					 <div className='ads-card-image'>
					 <BsSearch  className='iconsearch'></BsSearch>
					
					 <Image publicId={annonce.imageUrl1} className='imgsads'>
			                <Transformation quality="auto" fetchFormat="auto" />
			              </Image>
			            </div>
			         </CloudinaryContext>
					 </Link>

					 <span className='ads-card-date'>{moment(annonce.creationTimestamp).format("YYYY-MM-DD")}</span><p className='ads-card-title'>{annonce.title}</p>
								  <p className='ads-card-description'>{`${annonce.description.substr(0, 80)} ...`}</p>
								  <p className='slider-card-price'>{`${annonce.price} €`}</p>
								  <p className='ads-card-city'>{annonce.city}</p>

                     </div>



				
				)
			})}
		
			</section>
		
		   
			
		</main>
    );
    }
    export default Jetski;