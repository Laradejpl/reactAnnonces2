import React,{useEffect,useRef} from 'react';
import {Link} from 'react-router-dom';
import lottie from 'lottie-web';


//import { FcAssistant } from 'react-icons/fc';
//import {FcShop} from 'react-icons/fc'
//import { FcFeedback } from 'react-icons/fc';




const Footer = (props)=>{

   

    const sociowap = useRef(null);
    const socioinsta = useRef(null);
    const sociotwitter = useRef(null);
    const sociolinkedin = useRef(null);
   
    
    useEffect(() => {
        lottie.loadAnimation({
            container:sociowap.current,
            renderer: 'svg',
            loop:false,
            autoplay: true,
            animationData: require('../assets/whatsapp.json')
        })
       
    }, [])
    useEffect(() => {
        lottie.loadAnimation({
            container:socioinsta.current,
            renderer: 'svg',
            loop:false,
            autoplay: true,
            animationData: require('../assets/instagram.json')
        })
    }, [])
    useEffect(() => {
        lottie.loadAnimation({
            container:sociotwitter.current,
            renderer: 'svg',
            loop:false,
            autoplay: true,
            animationData: require('../assets/twitter.json')
        })
    }, [])
    useEffect(() => {
        lottie.loadAnimation({
            container:sociolinkedin.current,
            renderer: 'svg',
            loop:false,
            autoplay: true,
            animationData: require('../assets/linkedin.json')
        })
    }, [])

 
 

      
    
    return (
        <footer>
            <div className='footer'>
               
                   
                    <p>
                        Restez en contact
                        jean-philippe larade @2022 | tel:07 69 97 56 67
                    </p>
                    <div className='dividerfooter'></div>
                    <div className='socialfooter'>
                         <div className='iconsocio' ref={sociowap} ></div>
                         <div className='iconsocio  ' ref={socioinsta}></div>
                        <div className='iconsocio' ref={sociotwitter}></div>
                        <div className='iconsocio' ref={sociolinkedin}></div>
                         
                    </div>
                   
                
           
            </div>
        </footer>
    )
}
export default Footer;
