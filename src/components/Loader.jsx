import React from 'react'
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import { Circles,Oval} from  'react-loader-spinner'

const Loader = () => {

    return (
        <div >
            <Oval height="100" width="100" color="Red" ariaLabel='Loadind' className='middle_spinner' />
        </div>
    )
}
export default Loader;