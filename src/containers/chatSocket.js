import {useState,useEffect} from 'react';
import socket from './socket';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useSelector } from "react-redux";
import {selectUser} from '../slices/userSlice';

 const ChatSocket = () => {
    const user = useSelector(selectUser)
    const [username, setUsername] = useState('');
    const [message, setMessage] = useState('');
    const [messageOfChat, setMessageOfChat] = useState('');
    const [messagesOfChat, setMessagesOfChat] = useState([]);
    const [connected,setConnected] = useState(true);
   
    useEffect (() => {
        setUsername(user.infos.firstName);
      //Un utilisateur est parmis nous est le mot clef de socket qui doit etre le meme que dans le server
      socket.on('message', (messageOfChat) => {
      

       
            console.log("Message du serveur: " , messageOfChat);
            // push un message dans le tableau messagesOfChat
            setMessagesOfChat((previousMessage) =>[...previousMessage, messageOfChat]);
           
       
        
        return () => {
          socket.off('Un utilisateur est parmis nous');
        }
      }
      );
    }
    ,[]);
  
    
        const handleMessage = (e) => {
        e.preventDefault();
        console.log('Voici le message:',messageOfChat);
        socket.emit('message',`${username} - ${messageOfChat}`);
        setMessageOfChat('');
        }
    return (
      
      <div className="container text-center " style ={{marginTop:100}}>
        <h1>{`Chat de ${user.infos.firstName}`}</h1>
        <div className='col-12 '>{message}</div>
      <div className="row">
        <form onSubmit={handleMessage} className='text-center pt-3'>
        <div className="row g-3">
         <div className="col-md-8">
          <input type="text" 
          className="form-control" 
          placeholder="Type your message here"
           value={messageOfChat} 
          onChange={(e) => setMessageOfChat(e.target.value)} 
          

           />
  
         </div>
  
          <div className="col-md-4">
          <button className="btn btn-primary" type='submit'>Send</button>
  
          </div>
  
        </div>
  
        </form>
      </div>
        <div className="row">
        <pre>
            {JSON.stringify(messagesOfChat, null, 4)}
        </pre>
        </div> 
       
      </div>
    );
}

export default ChatSocket;

