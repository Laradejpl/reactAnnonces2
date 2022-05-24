   import React, {useState, useEffect,useRef} from 'react';
   import '../pseudochat.css'   
    import { getAllMessagesByReceiverIdAndIdannonce,saveOneMessage} from '../api/messages';
    import {getOneAnnonce} from '../api/annonce'
    import lottie from 'lottie-web'
    import ReactAudioPlayer from 'react-audio-player';
  
  
  
    import {getOneUser} from '../api/user';
    import {IoChevronBackSharp,IoPaperPlaneSharp} from "react-icons/io5";
    
    import {
        Image,
        Video,
        Transformation,
        CloudinaryContext
      } from "cloudinary-react";
      import {useDispatch,useSelector } from 'react-redux';
      import {selectUser,connectUser} from '../slices/userSlice';
      import axios from 'axios'
      import moment from "moment";
    moment.locale('fr');
    
    const Chat = (props) => {

      const user = useSelector(selectUser)
      const dispatch = useDispatch()
      const [infosPosteur,setInfosPosteur] = useState({});
      const [messagesPosteur, setMessagesPosteur] = useState([]);
      const [messagesReceiver, setMessagesReceiver] = useState([]);
      const [message, setMessage] = useState({});
      const [openModal, setOpenModal] = useState(false);
      const [infoAnnonce, setInfoAnnonce] = useState({});
      const [titleMessage, setTitleMessage] = useState('');
      const [contentMessage, setContentMessage] = useState('');
      const containar = useRef(null)
      const [itsMe, setItsMe] = useState(false);
      const [istYou, setIstYou] = useState(false);
      const [vide,setVide] = useState(true);
      const [isLoading,setIsLoading] = useState(false);
      const idPosteur = props.params.idpost
      const idReceiver = user.infos.id
      const idannonce = props.params.idannonce
      const [tabchat,setTabchat] = useState([])
      const messagesEndRef = useRef(null)

      




    const filterDate = (date1,date2) => {

  let dateRecup = new Date(date1.dateCreationMessage)
  let dateRecup1 = new Date(date2.dateCreationMessage)

    return dateRecup > dateRecup1 ? 1 : -1


    }

    const scrollToBottom = () => {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
    }


      const onSubmitForm = ()=>{
        
        const data = {
          posteurId: user.infos.id,
          receiverId: idPosteur,
          titleMessage:" à propos de l'annonce ",
          contentMessage:contentMessage,
          idannonce:idannonce
          
        }
        saveOneMessage(data)
        .then((result)=>{
            setMessage(result)

            if(vide === false){
                
                setTitleMessage('')
                setContentMessage('')
            }
           
        }
        )
        .catch((err)=>{
            console.log(err)
        }
        )

    }


    useEffect(() => {
      lottie.loadAnimation({
          container:containar.current,
          renderer: 'svg',
          loop: true,
          autoplay: true,
          animationData: require('../assets/loadingdots.json')
      })
    }, [])


    useEffect(() => {
      scrollToBottom()
    }, [tabchat]);



 const minuteurLoading = ()=>{
    setTimeout(()=>{
        setIsLoading(false)
    },5000)
 }

 const loadinglot = ()=>{
    setIsLoading(true)
    console.log("lLOADING LOADING")
    minuteurLoading()
  }
  





      useEffect(()=>{
        getOneUser(idPosteur)
        .then(res=>{
          setInfosPosteur(res.result)
          
        })
        .catch(err=>console.log(err))

        getOneAnnonce(idannonce)
        .then(res=>{
          setInfoAnnonce(res.result)
          
        }
        )
        .catch(err=>console.log(err))

      },[])


      useEffect(() => {
        const interval = setInterval(() => {
          loadinglot()
           let messageChat = [];

          getAllMessagesByReceiverIdAndIdannonce(idReceiver,idannonce,idPosteur)
          .then(res=>{

            for(let i=0;i<res.results.length;i++){
              res.results[i].role="receiver"
             messageChat.push(res.results[i])
            }

            setMessagesReceiver(res.results)
            setIstYou(true)
        





            getAllMessagesByReceiverIdAndIdannonce(idPosteur,idannonce,idReceiver)
            .then(response=>{
              setMessagesPosteur(response.results)
              setItsMe(true)

              for(let i=0;i<response.results.length;i++){
                response.results[i].role="poster"
                messageChat.push(response.results[i])
               }

               messageChat.sort(filterDate)
               setTabchat(messageChat)
              //let messageTableaux = [res.results,response.results]
              
            
            })
            .catch(err=>console.log(err))
           
          })
          .catch(err=>console.log(err))
         


        }, 5000);
        return () => clearInterval(interval);
      }, []);






      <ReactAudioPlayer
      src="notif.ogg"
      autoPlay
      controls
    />


      




      
         



      return (
        <main className="container">
       
        
      <div className="row_margin">
          

       
        
        <CloudinaryContext cloudName="dehjoundt">
		            <div className='row'>
               
		              <Image publicId={infosPosteur.imageUser} id="rounder_img">
		                <Transformation quality="auto" fetchFormat="auto" />
						
		              </Image>
					<div>
				         <h5 className='nameWithRound'>{infosPosteur.lastName}  </h5> 
                
                 <div className='small_date'>{` | Inscris depuis:  ${moment(infosPosteur.creationTimestamp).format("YYYY-MM-DD")}`}</div>
                 <div className='divider'></div>
						
					</div>
					<div>

			
				 </div>
		            </div>
                
		         </CloudinaryContext>

             <div className='row_marginInfo'>


             <CloudinaryContext cloudName="dehjoundt">
		            <div className='row'>
                
               
		              <Image publicId={infoAnnonce.imageUrl} id="round_imgInfo">
		                <Transformation quality="auto" fetchFormat="auto" />
						
		              </Image>
					<div>
				         <h5 className='nameWithRoundInfo'>{infoAnnonce.title} | <span className=''>{`${infoAnnonce.price} €`} </span>  </h5> 
                

						
					</div>
					<div>

			
				 </div>
		            </div>
		         </CloudinaryContext>


             </div>


        </div>

        <section>
        <div className='wide_message_eara'>
 

    
{tabchat.map((message,index)=>{
          return(
            <div>
            <div  className = {message.role ==='receiver' ? 'row_message_bubble' :'row_message_bubble_red'} key={index}>
              <div className='row_message_left'>
            
              </div>
              <div className='row_message_right'>
                <div className='row_message_right_top'>
                 <p>{message.lastName}</p>
                  <p>{message.contentMessage}</p>
                </div>
                <div className='row_message_right_bottom'>
                 
                </div>
              </div>
            </div>
            <p>{moment(message.dateCreationMessage).format("YYYY-MM-DD hh:mm")}</p>
            <div ref={messagesEndRef} />
            </div>
          )
        }
        )
      }
     
 
      

    



        </div>


        </section>

        <div className=''>

          <form 
            className="c-forma"
                onSubmit={(e)=>{
                    e.preventDefault();
                    onSubmitForm();
                }}
          >

         <div className="form-group">
                
                <textarea className="form-control" id="contentMessage" placeholder='votre message' value={contentMessage} required onChange={(e)=>{

                setContentMessage(e.target.value)
                setVide(false)
                }}></textarea>
            </div>
            <button type="submit" className="buttonsbmt-info">Envoyer</button>
        </form>

        </div>
        </main> 

      )
    }
    
    export default Chat