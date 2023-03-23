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
import { StolenBike } from "./components/MyBikes/StolenBike";
import Activity from "./pages/Activity";

// Auth pages
import { PrivateRoutes } from "./components/Auth/PrivateRoute";

function App() {

  return (
    <div className="bg-gray-700 min-w-screen min-h-screen">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/bikeregistration" element={<BikeRegistration />} />
        <Route path="/registration" element={<PhoneRegistration />} />
        <Route path="/smsverification/:session_id" element={<SmsVerification />} />
        <Route path="/choosepassword" element={<ChoosePassword />} />

        <Route element={<PrivateRoutes />}>
          <Route path="/mybikes" element={<MyBikes />} />
          <Route path="/transferbike/:id" element={<BikeTransfer />} />
          <Route path="/stolenbike" element={<StolenBike />} />
          <Route path="/activities" element={<Activity />} />
        </Route>
      </Routes>
    </div>
  )
}

export default App;
