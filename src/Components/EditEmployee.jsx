import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import '../CSS/EditEmployee.CSS'
import axios from 'axios';
import Navbar from './Navbar';
const EditEmployee = () => {
  const [storeLocList, setStoreLocList] = useState([]);   // all locations from backend
  const [selectedStore, setSelectedStore] = useState(""); // selected location
  const navigate = useNavigate();

const[storeLocEmp,setStoreLocEmp] = useState([])

const[defaultState,setdefaultState]= useState(true)
const[searchState,setSearchState] = useState(true)
const[empIdState,setEmpIdState] = useState(true)
const[empPhoneState,setEmpPhoneState] = useState(true)

const [empDetailsId,setEmpDetailsId] = useState({})
const[empId,setEmpId]= useState("")


const [empDetailsPhone,setEmpDetailsPhone] = useState({})
const[empPhone,setEmpPhone] = useState("")

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


useEffect (()=>{

  let fetchStore = async()=>{
    try {
            let storeRes = (await axios.get(`http://localhost:8080/getAllStoreLoc`)).data
            setStoreLocList(storeRes)
    } catch (error) {
      
    }
  }
  validate()
  fetchStore()
},[])


let fetchEmpByStore = async()=>{
  setSearchState(true)
  setdefaultState(false)
  setEmpIdState(false)
  setEmpPhoneState(false)
  try {
        let empRes = (await axios.get(`http://localhost:8080/fetchAllEmployeeByStoreLoc?loc=${selectedStore}`)).data
        setStoreLocEmp(empRes)

  } catch (error) {
    console.log(error);
  }
}

let fetchEmpById = async()=>{
 setdefaultState(false)
 setSearchState(false)
 setEmpIdState(true)
 setEmpPhoneState(false)
 
  try {
          let empIdRes = (await axios.get(`http://localhost:8080/fetchEmployeeByEmpId?id=${empId}`)).data

          setEmpDetailsId(empIdRes)
          fetchStoreByEmpId(empId)

  } catch (error) {
    console.log(error);
  }
}

let fetchEmpByPhone = async()=>{
   setdefaultState(false)
 setSearchState(false)
 setEmpIdState(false)
 setEmpPhoneState(true)
  try {
        let empPhoneRes = (await axios.get(`http://localhost:8080/fetchAllEmployeeByEmpPhone?phone=${empPhone}`)).data

        setEmpDetailsPhone(empPhoneRes)
        fetchStoreByEmpId(empPhoneRes.employeeId)
  } catch (error) {
    console.log(error)
  }
}

let [storeByEmpId, setStoreByEmpId] = useState({})

let fetchStoreByEmpId = async(empid)=>{
  try {
    
        let storeObj = (await axios.get(`http://localhost:8080/getStoreByEmp?id=${empid}`)).data
 
        setStoreByEmpId(storeObj)
        
  } catch (error) {
    console.log(error)
  }

}


let reset =()=>{
 setSelectedStore("")
 setEmpId("")
 setEmpPhone("")
 setdefaultState(true)

}

let back =()=>{
  navigate('/employee')
}

let update =(empId)=>{
  navigate(`/updateEmployee/${empId}`)
}


let removeEmployee= async(empId)=>{
   
      const confirmed = window.confirm(" Do you want to remove this employee?");
      if(confirmed) {
        try {
            let res = await axios.delete(`http://localhost:8080/deleteEmployee?id=${empId}`)
            alert("Employee deleted successfully")
        } catch (error) {
          console.log("Error deleting employee",error);
      }
    }else{
      alert("Employee Deletion Cancelled")
    }
     fetchEmpByStore()
     reset()
  }



  return (
    <>
    <Navbar/>
      <div className="outerEmployee">
        <div className="innerRemove">
          <div className="selection"><p>Search By Branch</p></div>
          <div className="options"><select name="" id="storeSelection" value={selectedStore} onChange={(e)=>{setSelectedStore(e.target.value);setEmpId("");setEmpPhone("")}} required>
            <option value="" > Select the Branch</option>
              {
                storeLocList.map((ele,index)=>(

                  <option key={index} value={ele}>{ele}</option>
                ))
              }
            
            </select>
            </div>
            <div className="button">

            <button id='search1' onClick={fetchEmpByStore}>Search</button>
            </div>
        </div>

        <div className="innerRemove">
          <div className="selection"><p>Search By Emp ID </p></div>
          <div className="options"><input type="text" name='' id='' placeholder='Enter the Employee Id'  value={empId} onChange={(e)=>{setEmpId(e.target.value);setSelectedStore("");setEmpPhone("")}}/>
              
            </div>
            <div className="button">
            <button id='search1' onClick={fetchEmpById}>Search</button>

            </div>
        </div>

         <div className="innerRemove">
          <div className="selection"><p>Search By Emp PhoneNo </p></div>
          <div className="options"><input type="text" name='' id='' placeholder='Enter the Employee PhoneNo' value={empPhone} onChange={(e)=>{setEmpPhone(e.target.value);setEmpId("");setSelectedStore("")}} />
            
          </div>
          <div className="button">

            <button id='search1' onClick={fetchEmpByPhone}>Search</button>
          </div>
        </div>

        <div className="buttonss">
          <button id='reset' onClick={reset}>Reset</button>
          <button id='b1' onClick={back}>Back</button>
        </div>

        <div className="innerRemove2">
          <div className="card">
            {
              
             defaultState == true ? <p>Select the Branch to View the Employee Details ..!</p>: searchState ? ( storeLocEmp.length > 0 ? (
            storeLocEmp.map((ele)=>(
          
              
              

          <div className="empCard"  key={ele.employeeId} >
            
            <div className="emp-card">

            <div className="empLabels">
                      
              <p className='heading'>Employee Id </p>
              <p className='heading'>Employee Name </p>
              <p className='heading'>Employee PhoneNo </p>
              <p className='heading'>Employee Gender </p>
              <p className='heading'>Employee Address </p>
             
            </div>
            
           <div className="empValues">
              <p>: AK{ele.employeeId}</p>
              <p>: {ele.employeeName}</p>
              <p>: {ele.employeePhone}</p>
              <p>: {ele.employeeGender}</p>
              <p>: {ele.employeeAddress}</p>
           
              
            </div>
        
            </div>
            <div className="editButtons">

                <button id='remove1'  onClick={()=>removeEmployee(ele.employeeId)}>Remove</button>
                <button id='u1' onClick={()=>update(ele.employeeId)}>Update</button>
            
            </div>
          </div>
            ))):(
              <p>No employees found for this branch...</p>
            )
             ) : empIdState ? ( empDetailsId !="" ? (<div className="empCard"  key={empDetailsId.employeeId} >


              <div className="branch">
                 <p>Branch : {storeByEmpId.storeLocation}</p>
              </div>

              <div className="emp-card">
                
              <div className="empLabels">
                      
              <p id='mark' className='heading'>Employee Id </p>
              <p className='heading'>Employee Name </p>
              <p className='heading'>Employee PhoneNo </p>
              <p className='heading'>Employee Gender </p>
              <p className='heading'>Employee Address </p>
             
            </div>  

             <div className="empValues">
              <p id='mark'>: AK{empDetailsId.employeeId} </p>
              <p>: {empDetailsId.employeeName} </p>
              <p>: {empDetailsId.employeePhone}</p>
              <p>: {empDetailsId.employeeGender} </p>
              <p>: {empDetailsId.employeeAddress} </p>
              <p></p>
              
            </div>   
            
              </div>

              
              

             <div className="editButtons">
              
                <button id='remove1' onClick={()=>removeEmployee(empDetailsId.employeeId)}>Remove</button>
                <button id='u1' onClick={()=>update(empDetailsId.employeeId)}>Update</button>
            </div>   

          </div>) : <p>No Employee Found For This Id</p> ) : empPhoneState ? ( empDetailsPhone !="" ? (<div className="empCard"  key={empDetailsPhone.employeeId} >

             <div className="branch">
                 <p>Branch : {storeByEmpId.storeLocation}</p>
              </div>
             <div className="emp-card">
             
            <div className="empLabels">
                      
              <p className='heading'>Employee Id </p>
              <p className='heading'>Employee Name </p>
              <p id='mark' className='heading'>Employee PhoneNo </p>
              <p className='heading'>Employee Gender </p>
              <p className='heading'>Employee Address </p>
           
            </div>

            <div className="empValues">

            <p>: AK{empDetailsPhone.employeeId} </p>
            <p>: {empDetailsPhone.employeeName} </p>
            <p id='mark'>: {empDetailsPhone.employeePhone}</p>
            <p>: {empDetailsPhone.employeeGender} </p>
            <p>: {empDetailsPhone.employeeAddress} </p>
            
            </div>
             </div> 


             <div className="editButtons">
              
              <button id='remove1' onClick={()=>removeEmployee(empDetailsPhone.employeeId)}>Remove</button>
              <button id='u1' onClick={()=>update(empDetailsPhone.employeeId)} >Update</button>
            </div> 
          </div>) : <p>No Employee Found For This Id</p> ) : <p>Phone State</p>
            
          }

          </div>
          
        </div>
      </div>
    
    </>
  )
}

export default EditEmployee