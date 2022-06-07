import React from 'react'
import modalimg from '../assets/voilier.png'
import '../Modal.css'


 const Popup = (props,{open,onClose}) => {
      
    if(!open) return null  
  return (
    <div onClick={onClose} className='overlay'>
        <div onClick={(e)=>{e.stopPropagation()}} 
         className='modalContainer'>
            <img className='imgModal' src={modalimg} alt=".. " />
          <div  className="modalRight">
           <p onClick={onClose} className='closeBtn'>X</p>
            
            <div className="modalContent">

                
                
                 <h5>message</h5>
                 <div className="divider"></div>
                 <p> {props.message} </p>
                  


            </div>
      
          </div> 
        </div>
    </div>
  )
}

export default Popup;
