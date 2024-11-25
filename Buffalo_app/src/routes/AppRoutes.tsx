import { BrowserRouter, Route, Routes } from "react-router-dom"
import Frame1 from "../components/Frame1"
import Info1 from "../components/Info1"
import '../App.css'
import SignIn from "../components/SignIn"
import SignUp from "../components/SignUp"
import HeightChoice from "../components/HeightChoice"
import WeightChoice from "../components/WeightChoice"
import AgeChoice from "../components/AgeChoice"
import GenderChoice from "../components/GenderChoice"
import { useEffect, useState } from "react"
import { AuthContext } from "../context/AuthContext"
import Private from "./Private"
import Dashboard from "./Dashboard"
import UploadStores from "../components/UploadStores"




const AppRoutes = () => {

  const currentUser =JSON.parse(localStorage.getItem('currentUser'))
  const obj= currentUser?.isAuthenticated || false;
  const [isLoggedIn, setIsLoggedIn] = useState(obj || false)

  useEffect(() => {
    setIsLoggedIn(obj === true)
  }, []);

  return (
    <AuthContext.Provider
    value={[isLoggedIn, setIsLoggedIn]}>

    
    <BrowserRouter>
      <Routes>
         {/* Rutas Publicas */}
        <Route path="/" element={<Frame1/>}/>
        <Route path="/info1" element={<Info1/>}/>
        <Route path="/login" element={<SignIn/>}/>
        <Route path="/signUp" element={<SignUp/>}/>
        <Route path="/heightChoice" element={<HeightChoice/>}/>
        <Route path="/weightChoice" element={<WeightChoice/>}/>
        <Route path="/ageChoice" element={<AgeChoice/>}/>
        <Route path="/genderChoice" element={<GenderChoice/>}/>
        <Route path="/upload" element={<UploadStores/>}/>

         {/* Rutas Privadas */}
         <Route path='/*' element={<Private isAuthenticated={isLoggedIn}> <Dashboard/></Private>}>
         </Route>

      </Routes>
    </BrowserRouter>
    </AuthContext.Provider>
  )
}

export default AppRoutes