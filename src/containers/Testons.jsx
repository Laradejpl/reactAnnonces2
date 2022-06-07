import React, {useState,useEffect} from 'react'
import '../Modal.css'
import Popup from '../components/Modal'
import PopupModal from './pseudoModal'

const Testons = (props) => {

  const [openModal, setOpenModal] = useState(false);
  useEffect(() => {
    setOpenModal(true);
  }, []);
  

  
  return (
    <div>
    

    {openModal &&   
    <div >

    <h3 onClick={()=>{setOpenModal(false)}} className="closedBtn">close</h3>
    <PopupModal  titre="yo"  message="blues" open ={openModal}  
		  //setOpenModal(false) 
		   /> 

    </div>
    }  

    
    
    
    
    
    </div>
  )
}

export default Testons