import React, { useEffect, useState } from 'react'
import Navbar from './Navbar'
import '../CSS/UpdateEmployee.CSS'
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom'

const UpdateEmployee = () => {

  let navigate = useNavigate()

 const [storeLocList, setStoreLocList] = useState([]);  
const [selectedStore, setSelectedStore] = useState(""); 

const [ empDetailsId, setEmpDetailsId]= useState({})

const [empPhone, setEmpPhone] = useState("")
const [empAddress, setEmpAddress] = useState("")

const[newStore, setNewStore]=useState({})

const[updateState,setUpdateState]=useState(false)

let {empId}= useParams()
console.log(empId)

  let validate =async()=>{
  try {
    const res1 = await axios.get('http://localhost:8080/getSession', { withCredentials: true });


    if(res1.data==="No Session Found"){
          alert("Login Required !")
      navigate("/")
    }
  } catch (error) {
    console.log(error);
  }
}

let[oldStore,setOldStore]=useState({})

useEffect (()=>{
  let fetchById= async()=>{
    try {
          let empIdRes = (await axios.get(`http://localhost:8080/fetchEmployeeByEmpId?id=${empId}`)).data
         
          setEmpDetailsId(empIdRes)

         setEmpPhone(empIdRes.employeePhone)
         setEmpAddress(empIdRes.employeeAddress)
          

  } catch (error) {
    console.log(error);
  }

try {
      let oldStore = (await axios.get(`http://localhost:8080/getStoreByEmp?id=${empId}`)).data
      setOldStore(oldStore)
    setSelectedStore(oldStore.storeLocation)
     } catch (error) {
      console.log(error);
      
     }

  }

  let fetchStore = async()=>{

    
    try {
            let storeRes = (await axios.get(`http://localhost:8080/getAllStoreLoc`)).data
           
            setStoreLocList(storeRes)
    } catch (error) {
      console.log(error);
      
    }
  }
  validate()
  fetchStore()
  fetchById()
},[])


let assignStore =async()=>{
  if (updateState) {
    try {
  let storeObj = (await axios.get(`http://localhost:8080/getByLoc/${selectedStore}`)).data
setNewStore(storeObj)



} catch (error) {
   console.log(error);
}
  }
  
}

useEffect(()=>{
  assignStore()
},[updateState])


let updateEmp = async()=>{
   
if(empPhone==empDetailsId.employeePhone && empAddress==empDetailsId.employeeAddress && !updateState){
  alert("Change the Details First !")
  return
}

if(empPhone==""){
 
  setEmpPhone(empDetailsId.employeePhone)
}
if(empAddress==""){
  setEmpAddress(empDetailsId.employeeAddress)
}



    let updatedEmp ={
     employeeId:empDetailsId.employeeId,
     employeeName:empDetailsId.employeeName,
     employeePhone:empPhone,
     employeeGender:empDetailsId.employeeGender,
     employeeAddress:empAddress,
     store:updateState ? newStore : oldStore
    }
 setUpdateState(false)
    console.log(updatedEmp);
  
    

    try {
          let updateRes = (await axios.put(`http://localhost:8080/updateEmployee?id=${empId}`,updatedEmp)).data
    
         
          
    } catch (error) {
      console.log(error)
    }

    alert("Employee Details Updated !")
 navigate(-1)
}

let back=()=>{
  navigate(-1)
}



  return (
    <>
      <Navbar/>

      <div className="outerUpdate">

        <div className="updateDetails">
         
          <div className="updateCard" >
             <div className="heading"><h3>Employee Id  </h3></div> 
             <div className="heading"><h3>Employee Name  </h3></div> 
             <div className="heading"><h3>Employee PhoneNo  </h3></div> 
             <div className="heading"><h3>Employee Gender  </h3></div> 
             <div className="heading"><h3>Employee Address  </h3></div> 
          
          
          </div>
          <div className="newCard">
            <h3> : AK{empDetailsId.employeeId}</h3>
            <h3> : {empDetailsId.employeeName}</h3>
            <h3> : {empDetailsId.employeePhone}</h3>
            <h3> : {empDetailsId.employeeGender}</h3>
            <h3> : {empDetailsId.employeeAddress}</h3>
          </div>
        
        </div>
          <div className="updateNewDetails">
            <h3>Enter the Updated Details</h3>
          </div>
          <div className="updateEmpDetails">
            <div className="i1"> <h3>Employee PhoneNo :</h3> </div>
            <input type="text"  placeholder={empDetailsId.employeePhone} maxLength={10} value={empPhone} onChange={(e)=>{setEmpPhone(e.target.value)}}/>
          </div>
           <div className="updateEmpDetails">
            <div className="i1"> <h3>Employee Address :</h3> </div>
            <input type="text" placeholder= {empDetailsId.employeeAddress} value={empAddress} onChange={(e)=>{setEmpAddress(e.target.value)}} />
          </div>

        

        <div className="updateEmpDetails">
        <div className="i1"><h3>Select the Branch : </h3></div>
        <div className="options"><select name="" id="" value={selectedStore}  onChange={(e)=>{setSelectedStore(e.target.value); setUpdateState(true)}} >
          <option value="">Select the Branch</option>
          {
            storeLocList.map((ele,index)=>(

              <option  key={index} value={ele}>{ele}</option>
            ))
            
          }
          </select></div>
        </div>

        <div className="updateButton">
          <button id='u1' onClick={updateEmp}>Update</button>
          <button id='b1' onClick={back}>Back</button>
        </div>

      </div>

    </>
  )
}

export default UpdateEmployee