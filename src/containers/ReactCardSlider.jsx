import React,{useState,useEffect} from 'react';
import '../Slider.css';
import {MdChevronLeft,MdChevronRight} from 'react-icons/md';
import {Link} from 'react-router-dom';
import image1 from '../assets/voilier.png';
import image2 from '../assets/monocok.png';
import image3 from '../assets/jetskii.png';
import image4 from '../assets/fwinns.png';
import image5 from '../assets/remorque.png';
import image6 from '../assets/peniche.png'; 
import image7 from  '../assets/moteur.png';





const ReactCardSlider = (props) => {

    const slides =[

        {image:image1,title:'Voillier',description:'Voillier de plaisance sans moteur',link:'voillier'},
        {image:image2,title:'Semi-rigide',description:'Monocoque bateau',link:'semirigide'},
        {image:image3,title:'Jetski',description:'Jet ski petit et gros cylindré',link:'Jetski'},
        {image:image4,title:'Cabin cruiser',description:'Bateau cabine',link:'Cruiser'},
        {image:image5,title:'Remorque',description:'Remorque bateau de plaisance',link:'remorque'},
        {image:image6,title:'Peniche',description:'Peniche ',link:'peniche'},
        {image:image7,title:'Moteur',description:'Moteur bateau de plaisance',link:'moteur'},
    ];
    const sliderLeft = () => {
        let slider = document.getElementById('slider');
        slider.scrollLeft = slider.scrollLeft + 500;
    }

    const sliderRight = () => {
        let slider = document.getElementById('slider');
        slider.scrollLeft = slider.scrollLeft - 500;
    }


    const [screenWidth, setScreenWidth] = useState(window.innerWidth)

    useEffect(() => {

        const changeWidth = () => {
            setScreenWidth(window.innerWidth);
        }

        window.addEventListener('resize', changeWidth)

        return () => {
            window.removeEventListener('resize', changeWidth)
        }

    }, [])

    


    return (
     <div className='boxSlider'>

     
        <div className='prisonslider'>
        <MdChevronLeft size={40} className='slider-icon left' onClick={sliderLeft}/>
        <MdChevronRight size={40} className='slider-icon right' onClick={sliderRight}/>
    </div>

           <div id="main-slider-container">
               
                <div className='title_slider_home'>
			    <h5 style={{marginLeft: -110}}>Top catégories</h5>
                
               </div>
                    <div id="slider">

                      { slides.map((slide,index)=>{
                          
                          return(

                              <Link to={`/${slide.link}`} key={index}>

                              <div className='slider-card'>
                             
                      <div className='slider-card-image'><img src={slide.image} alt="desc" className='imgsliderhome'/></div>
                                   <p className='slider-card-title'>{slide.title}</p>
                                   <p className='slider-card-description'>{slide.description}</p>

                                 

                              </div>
                                </Link>
                          )
                               
                        })
                        }

                    </div>
                    
                        
                  
           </div>
        </div>

       )
}

export default ReactCardSlider;