import React from 'react'
import '../Submenu.css'
import { categorys } from '../helpers/category'


export const Submenu = (props) => {
  return (
    <div className='nav_Sub_menu'>
        {/* sous menu comprenant des boutons : annonces,category,user,avis */}
      <ul className='Sbul_menu'>
      <div className='dropdown'>
        <li className='Sbli_menu'>
          Annonces
          <ul className='dropdown-content'>
           {categorys.map((category, index) => (
               <div>

               {/*chaque category devient une props du composant*/}
             
                 <li className='catSubli' key={index}>
                      {category}
 
                 </li>
                    <div className='divider_Admin'></div>
              </div>
             
            ))}

          </ul>

        </li>
        </div>
        <li className='Sbli_menu'>
        Utilisateurs
        </li>
        <li className='Sbli_menu'>
          Avis
        </li>
      </ul>

    </div>
  )
}

export default Submenu
