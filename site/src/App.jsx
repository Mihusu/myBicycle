import {
  Routes,
  Route,
} from "react-router-dom";

import { PrivateRoutes } from "./components/Auth/PrivateRoute";

// Store pages
import BikeRegistration from "./pages/BikeRegistration";

// Non-auth pages
import Home from "./pages/Home";
import Login from "./pages/Login";
import SmsVerification from "./pages/SmsVerification";
import PhoneRegistration from "./pages/PhoneRegistration";

// Auth pages
import MyBikes from "./pages/MyBikes";
import ChoosePassword from "./pages/ChoosePassword";
import BikeTransfer from "./pages/BikeTransfer";
import ViewTransferAccept from "./pages/ViewTransferAccept";
import ViewTransferDetail from "./pages/ViewTransferDetail";
import Activity from "./pages/Activity";


import { ClaimBikePage } from "./pages/ClaimBikePage";

function App() {

  return (
    <div className="relative bg-gray-700 min-w-screen min-h-screen overflow-x-hidden">
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
          <Route path="/activities" element={<Activity />} />
          <Route path="/transfers/accept/:transfer_id" element={<ViewTransferAccept />} />
          <Route path="/transfers/detail/:transfer_id" element={<ViewTransferDetail />} />
          <Route path="/claimbike" element={<ClaimBikePage />} />
        </Route>
      </Routes>
    </div>
  )
}

export default App;
