import {useState,useEffect} from 'react';
import '../Modal.css';

 export const PopUp = (props) => {
  return(

    <div>
    {props.isPopUp && 
    <div className='popups'> 
   
    
        <h3 className='tit'>{props.titre}</h3>
        <div className='dividerx'></div>
        <div className='modalCont'>
        <p className='content' onClick={
            (e)=>{props.onClickClose()}
        }>{props.content}</p>
        <div className='mssg'></div>
        
        <p className='mssgCont'> {props.mssg}</p>

        </div>
        
    </div>}
    </div>
)
}

export const ModalSimple= (props) => {
  return(

    <div >
    {props.isPopUp && 
    <div className='popups'> 
   
    
        <h3 className='tit'>{props.titre}</h3>
        <div className='dividerx'></div>
        <div className='modalCont'>
        <p className='content' onClick={
            (e)=>{props.onClickClose()}
        }>{props.content}</p>
       
        
       

        </div>
        
    </div>}
    </div>
)
} 

export default ModalSimple