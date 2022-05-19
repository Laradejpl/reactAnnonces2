    import React from 'react'
    import { getInfoAdsByMessage } from '../api/messages';
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
    
    const chat = () => {
      return (
        <div>chat</div>
      )
    }
    
    export default chat