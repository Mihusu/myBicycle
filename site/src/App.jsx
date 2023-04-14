import { Routes, Route } from "react-router-dom";

import { PrivateRoutes } from "./components/Auth/PrivateRoute";

// Store pages
import BikeRegistration from "./pages/BikeRegistration";

// Non-auth pages
import Home from "./pages/Home";
import UserLogin from "./pages/UserLogin";
import StoreLogin from "./BikeStore/pages/StoreLogin";
import SmsVerification from "./pages/SmsVerification";
import PhoneRegistration from "./pages/PhoneRegistration";
import ResetPassword from "./pages/ResetPassword";
import PasswordResetVerification from "./pages/PasswordResetVerification";
import ChoosePassword from "./pages/ChoosePassword";
import DeviceVerify from "./pages/DeviceVerify";

// Auth pages
import MyBikes from "./pages/MyBikes";
import BikeTransfer from "./pages/BikeTransfer";
import ViewTransferAccept from "./pages/ViewTransferAccept";
import ViewTransferDetail from "./pages/ViewTransferDetail";
import Activity from "./pages/Activity";

import { ClaimBikePage } from "./pages/ClaimBikePage";
import { ReportFoundBike } from "./pages/ReportFoundBike";
import { BikeReportForm } from "./pages/BikeReportForm";

function App() {
  return (
    <div className="min-w-screen relative min-h-screen overflow-x-hidden bg-gray-700">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<UserLogin />} />
        <Route path="/bikeregistration" element={<BikeRegistration />} />
        <Route path="/registration" element={<PhoneRegistration />} />
        <Route
          path="/smsverification/:session_id"
          element={<SmsVerification />}
        />
        <Route path="/resetpassword" element={<ResetPassword />} />
        <Route
          path="/passwordresetverification"
          element={<PasswordResetVerification />}
        />
        <Route path="/choosepassword" element={<ChoosePassword />} />
        <Route path="/deviceverify" element={<DeviceVerify />} />

        <Route element={<PrivateRoutes />}>
          <Route path="/mybikes" element={<MyBikes />} />
          <Route path="/transferbike/:id" element={<BikeTransfer />} />
          <Route path="/activities" element={<Activity />} />
          <Route
            path="/transfers/accept/:transfer_id"
            element={<ViewTransferAccept />}
          />
          <Route
            path="/transfers/detail/:transfer_id"
            element={<ViewTransferDetail />}
          />
          <Route path="/claimbike" element={<ClaimBikePage />} />
          <Route path="/reportfoundbike" element={<ReportFoundBike />} />
          <Route path="/bikereportform" element={<BikeReportForm />} />
        </Route>

        <Route path="/Storelogin" element={<StoreLogin />} />
      </Routes>
    </div>
  );
}

export default App;
