
import "./auth.css";
import { auth } from "../config/auth.config.js"
import { createUserWithEmailAndPassword } from "firebase/auth"
import { useState } from 'react'

const Auth = () => {
  const [data, setData] = useState({email:"", password:""});

  const handleChange = (e) =>{
    const {name , value} = e.target;
    setData((prevData) =>({
      ...prevData, [name]: value
    }));
  };

  const handleSubmitForm = async() =>{
     try {
      await createUserWithEmailAndPassword(auth, data.email, data.password);
      console.log("usercreated ");
      setData({email:"", password:""})

     } catch (error) {
      console.error(error)
     }
  }




  return (
    <form className="container" onClick={((e) => e.preventDefault())}>
    <input type='email' placeholder='email' value={data.email} name='email' onChange={handleChange}/>

    <input type='password' placeholder='password' value={data.password} name='password' onChange={handleChange} />

    <button type="button" onClick={handleSubmitForm}>Sign In</button>
    </form>
  )
}

export default Auth
