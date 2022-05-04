import React, {useState,useEffect,useRef } from "react";
import { Navigate, Link } from "react-router-dom";
import lottie from 'lottie-web'
import { forgotPassword } from "../../api/user";

const Forgot = () => {
  const [email, setEmail] = useState("");
  const [redirect, setRedirect] = useState(false);
  const [error, setError] = useState(null);
  const containa = useRef(null)

  const onSubmitForm = () => {
    let data = {
      email: email,
    };
		forgotPassword(data)
      .then((res) => {
        setRedirect(true);
      })
      .catch((err) => {
        console.log(err);
        setError(err);
      });
  }

  useEffect(() => {
    lottie.loadAnimation({
        container:containa.current,
        renderer: 'svg',
        loop: true,
        autoplay: true,
        animationData: require('../../assets/forgotpassword.json')
    })
  }, [])
  
  return (
    <div className="main_forget_cont">
    <div className="log-container-img">
    <div className='containa' ref={containa}></div>
					</div>
      {redirect && <Navigate to="/forgot" />}
      <h1 className="c-g title2">
				Bin <span className="santa-monica">,</span><span className="d">ca arrive même à des gens bien</span> <span>!</span>
			</h1>
			{error !== null && <p className="errorMsg">{error}</p>}
			<div className="log-container bgc-bel-air">
			
				<div>
				    <h3>Mot de passe oublié</h3>
					<div className="log-container-form">
					    {/*FORM*/}
						<form
              className="c-form"
              onSubmit={(e) => {
                e.preventDefault();
                onSubmitForm();
              }}
            >
              <label>Email</label>
              <input
                type="text"
                required
                name="email"
                onChange={(e) => {
                  setEmail(e.currentTarget.value);
                }}
              />
              <input
                className="buttonsbmt"
                type="submit"
                value="Envoyer un nouveau mot de passe"
              />
            </form>
					</div>
          <div className="row_cont_center">
					
						<Link to="/login" className="link_forgot">S'identifier | </Link>
					
					
						<Link to="/register" className="link_forgot"> S'enregistrer :</Link>
					
				</div>
					
				</div>
			</div>
    </div>
    )
}

export default Forgot;
