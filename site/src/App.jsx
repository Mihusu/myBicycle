import { Routes, Route } from "react-router-dom";

import { PrivateRoutes } from "./components/Auth/PrivateRoute";

// Store pages
import BikeRegistration from "./pages/BikeRegistration";

// Non-auth pages
import Home from "./pages/Home";
import { LoginPage } from "./pages/Login";
import StoreLogin from "./BikeStore/pages/StoreLogin";
import SmsVerification from "./pages/SmsVerification";
import UserRegistration from "./pages/UserRegistration";
import ResetPassword from "./pages/ResetPassword";
import ResetPasswordVerify from "./pages/ResetPasswordVerify";
import ResetPasswordConfirm from "./pages/ResetPasswordConfirm";
import DeviceVerify from "./pages/DeviceVerify";

// Auth pages
import MyBikes from "./pages/MyBikes";
import BikeTransfer from "./pages/BikeTransfer";

import BikeTransferAccept from "./pages/BikeTransferAccept";
import BikeTransferDetail from "./pages/BikeTransferDetail";
import ActivityPage from "./pages/Activity";
import { ClaimBikePage } from "./pages/ClaimBikePage";
import { BikeLookup } from "./pages/BikeLookup";
import { BikeReportFound } from "./pages/BikeReportFound";
import DiscoveryReport from "./pages/DiscoveryReport";

function App() {
  return (
    <div className="min-w-screen relative min-h-screen overflow-x-hidden bg-gray-700">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/bikeregistration" element={<BikeRegistration />} />
        <Route path="/registration" element={<UserRegistration />} />
        <Route
          path="/smsverification/:session_id"
          element={<SmsVerification />}
        />
        <Route path="/resetpassword" element={<ResetPassword />} />
        <Route
          path="/passwordresetverification"
          element={<ResetPasswordVerify />}
        />
        <Route path="/choosepassword" element={<ResetPasswordConfirm />} />
        <Route path="/deviceverify/:session_id" element={<DeviceVerify />} />

        <Route element={<PrivateRoutes />}>
          <Route path="/mybikes" element={<MyBikes />} />
          <Route path="/transferbike/:id" element={<BikeTransfer />} />
          <Route path="/activities" element={<ActivityPage />} />
          <Route
            path="/transfers/accept/:transfer_id"
            element={<BikeTransferAccept />}
          />
          <Route
            path="/transfers/detail/:transfer_id"
            element={<BikeTransferDetail />}
          />
          <Route path="/claimbike" element={<ClaimBikePage />} />
          <Route path="/bikelookup" element={<BikeLookup />} />
          <Route
            path="/bikereportfound/:frame_number"
            element={<BikeReportFound />}
          />
          <Route path="/discoveryreport/:id" element={<DiscoveryReport />} />
        </Route>

        <Route path="/Storelogin" element={<StoreLogin />} />
      </Routes>
    </div>
  );
}

export default App;
