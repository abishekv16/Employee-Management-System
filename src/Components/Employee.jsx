import React from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import Navbar from './Navbar'
import '../CSS/Employee.CSS'
import emp_img from '../assets/Employees.png'
import axios from 'axios'

const Employee = () => {



  let validate =async()=>{
  try {
    const res1 = await axios.get('http://localhost:8080/getSession', { withCredentials: true });


    if(res1.data==="No Session Found"){
          alert("Login Required !")
      navigate("/")
    }
  } catch (error) {
    
  }
}
validate()

  let navigate = useNavigate()

  let addEmployee =()=>{
    navigate('/addEmployee')
  }

  let fetchEmployee =()=>{
    navigate('/fetchEmployee')
  }

  let editEmployee =()=>{
    navigate('/editEmployee')
  }

 

   let logOut=async()=>{
    const res1 = await axios.get('http://localhost:8080/deleteSession', { withCredentials: true });
    alert("Logout")
    navigate('/')
  }
  
  return (
    <>
    <Navbar/>
    <div className="outerEmp">
      <div className="leftEmp">
        <h2>Employee Management System</h2>
        <img src={emp_img} alt="" />
        <button id='b2' onClick={logOut} >Logout</button>
      </div>

      <div className="rightEmp">
        <div className="buttons">
        <button id='a1' onClick={addEmployee}>Add Employee</button>
        <button id='f1' onClick={fetchEmployee}>Fetch Employee</button>
        <button id='e1' onClick={editEmployee}>Edit Employee</button>
        
        

        </div>
      </div>
    </div>
   
    

    
    </>
  )
}

export default Employee