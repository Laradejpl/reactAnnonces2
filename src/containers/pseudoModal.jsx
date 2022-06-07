import React from 'react'
import '../Modal.css'
import '../alert.css'

const PopupModal = (props,{onClose} ) => {
    
  return (
      <div  className='alertPop'>
       
         <h2>{props.titre}</h2>
            <p>{props.message}</p>



      </div>
            )
    }

    export default PopupModal