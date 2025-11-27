import React from 'react'
import{BrowserRouter,Routes,Route} from 'react-router-dom'
import Home from './Components/Home'
import Employee from './Components/Employee'
import AddEmployee from './Components/AddEmployee'

import FetchEmployees from './Components/FetchEmployees'
import UpdateEmployee from './Components/UpdateEmployee'
import EditEmployee from './Components/EditEmployee'
const App = () => {
  return (
    <>
       <BrowserRouter>
          <Routes>

            <Route path='/' element={<Home/>}></Route>
            <Route path='/employee' element={<Employee/>}></Route>
            <Route path='/addEmployee' element={<AddEmployee/>}></Route>
            <Route path='/fetchEmployee' element={<FetchEmployees/>}></Route>
            <Route path='/editEmployee' element={<EditEmployee/>}></Route>
            <Route path='/updateEmployee/:empId' element={<UpdateEmployee/>}></Route>
            
          </Routes>
      </BrowserRouter>
    
    
    </>
  )
}

export default App