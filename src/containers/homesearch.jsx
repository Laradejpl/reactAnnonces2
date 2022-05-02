import React, { useState, useEffect } from 'react';
import {Link} from 'react-router-dom';
import GoogleMapReact from 'google-map-react';
import {categorys} from '../helpers/category';

import axios from 'axios';
import '../temporary.css';


import {getAdsByDistance} from '../api/annonce'

import {
  Image,
  Video,
  Transformation,
  CloudinaryContext
} from "cloudinary-react";

const API_KEY = 'AIzaSyDnxU0AwNwyTGSo1RAcsa4Dr27Xt0ngbaI';

const Homesearch = (props)=>{
    
    const defaultProps = {
					    center: {
					      lat: 49.8865792,
					      lng: 2.359296
					    },
					    zoom: 13
					  };
    
    const [position, setPosition] = useState(defaultProps.center)
    const [zoom, setZoom] = useState(defaultProps.zoom)
    const [address, setAddress] = useState("")
    const [radius, setRadius] = useState(5)
    const [adsLocalized, setAdsLocalized] = useState([])
    const [category, setCategory] = useState("")
    const [error, setError] = useState(null)
    
    useEffect(()=>{
        mygeoloc()
    }, [position])
    
    const mygeoloc = ()=>{
        console.log("coucou")
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
			              <Image publicId={locals.imageUrl}  id ="MarkerImage">
			                <Transformation quality="auto" fetchFormat="auto" />
			              </Image>
			            </div>
			         </CloudinaryContext>
		          	<Link to={"/detail/"+locals.id}>{locals.title} </Link>
			     </div>
                
            )
        })
    }
    
    return(
        <div>
            <h1>Trouvez une annonce à proximité</h1>
            <form
				className="c-form"
				onSubmit={(e)=>{
					e.preventDefault();
					onSubmitForm()
				}}
			>
				<input 
					type="text" 
					placeholder="Tapez un adresse"
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
				<input type="submit" name="Chercher"/>
			</form>
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
          
        </div>
    )
}

export default Homesearch;