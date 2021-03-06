import React, { useState, useEffect } from 'react';
import jetskimg from '../assets/jetskii.png'
import logo from '../assets/point.png'
import { BsSearch } from "react-icons/bs";
import {Link} from 'react-router-dom';
import {getAllAdsByCat,getNbAdsByCat} from '../api/annonce';
import {getAdsByPriceAndCat} from '../api/annonce';
import {marques} from '../helpers/marque';
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


const Jetski = (props) => {



const [annonces, setAnnonces] = useState([]);
const [annoncesByPrice, setAnnoncesByPrice] = useState([]);
const [totalAdsCat, setTotalAdsCat] = useState(0);
const [rangevalMax, setRangevalMax] = useState(100000);
const [rangevalMin, setRangevalMin] = useState(0);
const [marque, setMarque] = useState('');
const [searchActiv, setSearchActiv] = useState(false);
const [msg, setMsg] = useState('');
const [openModal, setOpenModal] = useState(false);




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

//LES FONCTIONS 
const Modal = ({open,onClose}) => {
	
  if(!open) return null  
return (
  <div onClick={onClose} className='overlay'>
	  <div onClick={(e)=>{e.stopPropagation()}} 
	   className='modalContainer'>
		  <img className='imgModal' src={logo} alt=".. " />
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

 //avoir toute les annonces  entre deux prix et category et marque
const onSubmitForm = () => {

	const datas = {
		priceMax:rangevalMax,
		priceMin:rangevalMin,
		category:"Jetski",
		marque:marque
	}
	getAdsByPriceAndCat(datas)
		.then((res) => {
			setAnnoncesByPrice(res.result)
			setSearchActiv(true)
			//openModal(true)
			if(res.result.length===0){
				//setVoidAds(true)
				setSearchActiv(false)
				openModal(true)
				setMsg('Aucune annonce ne correspond ?? votre recherche')
			}
			

			console.log("FILTER",res.result);
		})
		.catch((err) => {
			console.log(err);
			setMsg("Aucune annonce ne correspond ?? votre recherche");
		})
}







    return (
        <main className='main_home'>
		 <Modal open={openModal} onClose={()=> setOpenModal(false)} />  
		  <header className='homeheader'>
		  <img src={jetskimg} alt="logo application" className="logohome"/>
			<h1 className='titlehome'>Jetski</h1>
			<p>Plus qu'un bateau une monture puissante</p>
		  </header>
		  
		  <div className='totalAds'>{`Nous avons ${totalAdsCat} Annonces`}</div>
		  <h2> les meilleurs  Jetski d'occasion</h2>
		  <div className='divider'></div>
		  <div className='filtre'>
		
		<div className='row_container_filter'>
		  <h6 className='title_filter_bar'>affinnez votre recherche</h6>
		  <div className='divider'></div>
		  <form
                      className="filter-f"
                      onSubmit={(e) => {
                        e.preventDefault();
                        onSubmitForm();
                      }}
                    >
          <label>{`Min :${rangevalMin}???`}</label>
		  <div>
		<input type="range"  className="custom-range" min="100" max="10000" steps={100} value={rangevalMin} 

		 onChange={(event) => setRangevalMin(event.target.value)} />
		
	  </div>
			<label>{`Max :${rangevalMax}???`}</label>
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
							<h6 className='ads-card-city'>{annonce.city} |</h6>
			            </div>
			         </CloudinaryContext>
					 </Link>

					 <span className='ads-card-date'>{moment(annonce.creationTimestamp).format("YYYY-MM-DD")}</span><p className='ads-card-title'>{annonce.title}</p>
								  <p className='ads-card-description'>{`${annonce.description.substr(0, 80)} ...`}</p>
								  <p className='slider-card-price'>{`${annonce.price} ???`}</p>
								 

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
					  <p className='slider-card-price'>{`${ad.price} ???`}</p>
					 

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
    export default Jetski;