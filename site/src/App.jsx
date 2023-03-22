import {
  Routes,
  Route,
} from "react-router-dom";

// Non-auth pages
import Home from "./pages/Home";
import Login from "./pages/Login";
import MyBikes from "./pages/MyBikes";
import SmsVerification from "./pages/SmsVerification";
import BikeRegistration from "./pages/BikeRegistration";
import PhoneRegistration from "./pages/PhoneRegistration";
import ChoosePassword from "./pages/ChoosePassword";
import BikeTransfer from "./pages/BikeTransfer";
import BikeStolen from "./pages/BikeStolen";

// Auth pages
import { PrivateRoutes } from "./components/Auth/PrivateRoute";

function App() {

  return (

    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/bikeregistration" element={<BikeRegistration />} />
      <Route path="/registration" element={<PhoneRegistration />} />
      <Route path="/smsverification/:session_id" element={<SmsVerification />} />
      <Route path="/choosepassword" element={<ChoosePassword />} />
      
      <Route element={<PrivateRoutes />}>
        <Route path="/mybikes" element={<MyBikes />} />
        <Route path="/transferbike" element={<BikeTransfer />} />
        <Route path="/stolenbike" element={<BikeStolen />} />
      </Route>
    </Routes>

  )
}

export default App;
