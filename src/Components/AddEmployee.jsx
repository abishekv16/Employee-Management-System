import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Navbar from './Navbar'
import '../CSS/AddEmployee.CSS'

const AddEmployee = () => {

let navigate =useNavigate()


let[storeLoc,setStoreLoc] = useState([])

let [empName,setEmpName] = useState("")
let[empPhone,setEmpPhone] = useState("")
let[empGender,setEmpGender] = useState("")
let[empAddress,setEmpAddress] = useState("")
let[empStoreLocation,setEmpStoreLocation] = useState("")

let [storeDetails,setStoreDetails] = useState({})


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

useEffect(()=>{

let getStoreName = async()=>{

try {
    let result = (await axios.get(`http://localhost:8080/getAllStoreLoc`)).data
    setStoreLoc(result)
    

} catch (error) {
    console.log(error);
    
}
}

getStoreName()

},[])


let getStore =async(loc)=>{
try {
            let storeRes = (await axios.get(`http://localhost:8080/getByStore?loc=${loc}`)).data
            setStoreDetails(storeRes)
            
        } catch (error) {
            console.log(error);
            
        }
}


    let handleAddEmployee =async(e)=>{
        e.preventDefault()
        validate()
 
        let addEmployees = {
            employeeName : empName,
            employeePhone : empPhone,
            employeeGender : empGender,
            employeeAddress : empAddress,
            store:storeDetails
             
        }

        try {
            let res = (await axios.post(`http://localhost:8080/addEmployee?sid=${storeDetails.storeId}`,addEmployees)).data
             alert('Employee Added Successfully')
            
        } catch (error) {
            console.log(error);
            
        }

        setEmpName("")
        setEmpPhone("")
        setEmpGender("")
        setEmpAddress("")
        setStoreLoc("")
        
    
    }
useEffect(()=>{
    getStore(empStoreLocation);
},[empStoreLocation])

    let backEmployee =()=>{
        navigate(-1)
    }

  return (
    <>
    <Navbar/>

    <div className="outer">
           
            <h3>Enter the Employee Details</h3>
        <div className='inner'>
            
            <div className="addEmployee">
             <form action="" onSubmit={handleAddEmployee}>

                <input type="text" name="" id="" placeholder='Enter Employee Name' value={empName} onChange={(e)=>{setEmpName(e.target.value)}} required/>

                <input type="text" name="" id="" placeholder='Enter Employee Phone' maxLength={10} value={empPhone} onChange={(e)=>{setEmpPhone(e.target.value)}} required/>

                <input type="text" name="" id="" placeholder='Enter Employee Gender' value={empGender} onChange={(e)=>{setEmpGender(e.target.value)}}  required/>

                <input type="text" name="" id="" placeholder='Enter Employee Address' value={empAddress} onChange={(e)=>{setEmpAddress(e.target.value)}}  required/>

                <select name="" id="storeLocationSelect" value={empStoreLocation}  onChange={(e)=>{setEmpStoreLocation(e.target.value) }} required>
                    <option value="" >Select the Branch</option>
                    {
                      Array.isArray(storeLoc) &&  storeLoc.map((ele,index)=>(
                        <option key={index} value={ele}>{ele}</option>
                       ))
                    }
                </select>
                <button id='add' type="submit">Add Employee</button>
                </form>
            </div>
        </div>
            <button id='b1' onClick={backEmployee}>Back</button>
    </div>
       
    </>  )
}

export default AddEmployee