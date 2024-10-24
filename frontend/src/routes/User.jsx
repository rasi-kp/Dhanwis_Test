import { Route, Routes } from "react-router-dom";
import Main from "../components/Main";
import Login from "../components/Login";
import Otp from "../components/Otp";
const User = () => {
  return (
    <div>
         <Routes>
            <Route path="/home" element={<Main/>}/>
            <Route path="/" element={<Login/>}/>
            <Route path="/otp" element={<Otp/>}/>
        </Routes>
    </div>
  )
}

export default User