import React, {useState,useEffect} from 'react';
import {Link} from 'react-router-dom';

//@TODO mettre les icon sur les liens

const Categories = (props)=>{
    
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
            <div className='connected_aside_cat'>
               <ul className="connected_ul">
                
                        <div className='container_cat_inter'>
                        <li><Link to="/jetski"  className="profile_link">Jetski</Link></li>
                        {( screenWidth > 500) && (
                                   <div className='divider'></div>

                          )}

                        </div>
                        
                        <div className='container_cat_inter'>
                        <li><Link to="/voillier"  className="profile_link">Voillier</Link></li>
                        {( screenWidth > 500) && (
                                    <div className='divider'></div>
  
                            )}
  
                          </div>
                          
                          <div className='container_cat_inter'>
                          <li><Link to="/cruiser"  className="profile_link">Cruiser</Link></li>
                          {( screenWidth > 500) && (
                                    <div className='divider'></div>
  
                            )}
  
                          </div>
                          
                          <div className='container_cat_inter'>
                          <li><Link to="/yatch"  className="profile_link">Yatch</Link></li>
                          {( screenWidth > 500) && (
                                    <div className='divider'></div>
  
                            )}
  
                          </div>
                          
                          <div className='container_cat_inter'>
                          <li><Link to="/peniche"  className="profile_link">Peniche</Link></li>
                          {( screenWidth > 500) && (
                                    <div className='divider'></div>
  
                            )}
  
                          </div>
                          
                          <div className='container_cat_inter'>
                          <li><Link to="/jetboat"  className="profile_link">Jetboat</Link></li>
                          {( screenWidth > 500) && (
                                    <div className='divider'></div>
  
                            )}
  
                          </div>
                          
                          <div className='container_cat_inter'>
                          <li><Link to="/accessoires"  className="profile_link">Accessoires</Link></li>
                          {( screenWidth > 500) && (
                                    <div className='divider'></div>
  
                            )}
  
                          </div>
                          
                          <div className='container_cat_inter'>
                          <li><Link to="/service"  className="profile_link">Service</Link></li>
                          {( screenWidth > 500) && (
                                    <div className='divider'></div>
  
                            )}
  
                          </div>
              </ul>

             </div>

        )

              
}
export default Categories;