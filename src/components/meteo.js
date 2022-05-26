import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {selectUser} from '../slices/userSlice';
import {useSelector } from 'react-redux'; 
import {WiCloud,WiRaindrop,WiThermometer} from "react-icons/wi";
import { BsFillGeoFill,BsTelephoneFill,BsCloudy } from "react-icons/bs"; 
import { FiWind} from 'react-icons/fi';   

const Meteo = (props) => {
    
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
    
    },[])
    
  return (
    <div>

{!error &&  
       
       <div className='weather'>
       <div className='weather_info'>
    
       <p><WiThermometer />{weather.main.temp}°C</p>
       </div>
       <div className='iconeNdescWeather'>

        <div className='weather_img'>
         {!error && 
          <img src={`https://openweathermap.org/img/w/${weather.weather[0].icon}.png`} alt="logo application" className="weather_img"/>}
       </div>
         
      


       </div>


       </div>
     
      
      }


    </div>
  )
}

export default Meteo;