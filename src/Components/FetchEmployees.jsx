import React, { useEffect, useState } from 'react'
import '../CSS/FetchEmployee.CSS'
import Navbar from './Navbar'
import axios from 'axios'
import {useNavigate} from 'react-router-dom'


const FetchEmployees = () => {

  const [storeLocList, setStoreLocList] = useState([]);   // all locations from backend
  const [selectedStore, setSelectedStore] = useState(""); // selected location
  const navigate = useNavigate();

const[storeLocEmp,setStoreLocEmp] = useState([])

const[defaultState,setdefaultState]= useState(true)

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
  setdefaultState(false)
  try {
        let empRes = (await axios.get(`http://localhost:8080/fetchAllEmployeeByStoreLoc?loc=${selectedStore}`)).data
  
        setStoreLocEmp(empRes)

  } catch (error) {
    console.log(error);
  }
}

let reset =()=>{
 setSelectedStore("")
 setdefaultState(true)

}

let back =()=>{
  navigate('/employee')
}


  return (
    <>
    <Navbar/>
      <div className="outerEmployee">
        <div className="inner1">
          <div className="selection"><p>Search By Branch</p></div>
          <div className="options"><select name="" id="storeSelection" value={selectedStore} onChange={(e)=>{setSelectedStore(e.target.value)}} required>
            <option value="" > Select the Branch</option>
              {
                storeLocList.map((ele,index)=>(

                  <option key={index} value={ele}>{ele}</option>
                ))
              }
            
            </select>
            </div>
            <div className="button">

            <button id='search' onClick={fetchEmpByStore}>Search</button>
            </div>
        </div>

        <div className="buttonss">
          <button id='reset' onClick={reset}>Reset</button>
          <button id='b1' onClick={back}>Back</button>
        </div>

        <div className="inner2">
          <div className="card">
              {
                  defaultState === true ? ( <p>Select the Branch to View the Employee Details ..!</p>
                  ) : storeLocEmp.length > 0 ? (
                  storeLocEmp.map((ele) => (
               <div className="empCard" key={ele.employeeId}>
                  
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
                 </div>
                    ))
                  ) : (
                    <p>No employees found for this branch...</p>
                  )}
                </div>

         
          
        </div>
      </div>
    
    </>
  )
}

export default FetchEmployees