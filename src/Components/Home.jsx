import React, { useState } from 'react'
import Navbar from './Navbar'
import {Link, useNavigate} from 'react-router-dom'
import axios from 'axios'
import '../CSS/Home.CSS'
import login_img from '../assets/Login.png'
// 1
const Home = () => {

  let [email,setEmail]=useState("")
  let [password,setPassword]= useState("")

  let navigate = useNavigate()

  let handleSubmit = async(e)=>{
    e.preventDefault()
let result

  try {
       result= (await axios.get(`http://localhost:8080/login?adminEmail=${email}`)).data

  } catch (error) {
    console.log(error);
    
  }
    
  if (email==result.adminEmail && password==result.adminPassword) {


  const res = await axios.get('http://localhost:8080/createSession', { withCredentials: true });
 
    alert("Login Done")
    setEmail("")
    setPassword("")

    navigate('/employee')
  } else {
    alert("Wrong Data")
  }

}

  return (
    <>
    <Navbar/>
    
   
    <div className="homepage">
        <div className="left">
           <h1>Store Management</h1>
          <img src={login_img} alt="" />
          
        </div>
        <div className="right">
           <h2>Store Manager Login</h2>
             <div className="login">
            <form action="" onSubmit={handleSubmit}>
                 <label htmlFor="">Email Id</label>
                 <input type="email" name="" id="email"  placeholder='Enter your Email id' required value={email} onChange={(e)=>setEmail(e.target.value)}/>

                 <label htmlFor="">Password</label>
                 <input type="password" name="" id="password" placeholder='Enter your Password' required value={password} onChange={(e)=>setPassword(e.target.value)} />

                 <button type="submit">Login</button>

             </form>

        </div>
        </div>
       
        
    </div>

    </>
  )
}

export default Home