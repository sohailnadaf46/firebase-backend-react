
import "./auth.css";
import { auth, googleAuthenticationProvider } from "../config/auth.config.js"
import { createUserWithEmailAndPassword, signInWithPopup, signOut} from "firebase/auth"
import { useState } from 'react'

const Auth = () => {
  const [data, setData] = useState({email:"", password:""});
  console.log(auth?.currentUser?.email)

  const handleChange = (e) =>{
    const {name , value} = e.target;
    setData((prevData) =>({
      ...prevData, [name]: value
    }));
  };

  const handleSubmitForm = async() =>{
     try {
      await createUserWithEmailAndPassword(auth, data.email, data.password);
      setData({email:"", password:""})

     } catch (error) {
      console.error(error)
     }
  }

  const handleGoogleSubmit =async() =>{
    try {
      await signInWithPopup(auth, googleAuthenticationProvider)

    } catch (error) {
      console.error(error)
    }
  }

  const handleLogOut = async () =>{
    try {
      await signOut(auth)

    } catch (error) {
      console.error(error)
    }
  }

  return (
    <form className="container" onClick={((e) => e.preventDefault())}>
    <input type='email' placeholder='email' value={data.email} name='email' onChange={handleChange}/>

    <input type='password' placeholder='password' value={data.password} name='password' onChange={handleChange} />

    <button type="button" onClick={handleSubmitForm}>Sign In</button>

    <button type="button" onClick={handleGoogleSubmit}><img src="https://developers.google.com/static/identity/images/branding_guideline_sample_lt_sq_lg.svg" /></button>

    <button type="button" onClick={handleLogOut}>Logout</button>
    </form>
  )
}

export default Auth
