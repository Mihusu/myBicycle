import { Routes, Route } from "react-router-dom";

// Non-auth pages
import Home from "./pages/Home";
import UserLogin from "./pages/UserLogin";
import StoreLogin from "./BikeStore/pages/StoreLogin";
import MyBikes from "./pages/MyBikes";
import SmsVerification from "./pages/SmsVerification";
import BikeRegistration from "./pages/BikeRegistration";
import PhoneRegistration from "./pages/PhoneRegistration";
import ChoosePassword from "./pages/ChoosePassword";
import BikeTransfer from "./pages/BikeTransfer";
import ViewTransferAccept from "./pages/ViewTransferAccept";
import ViewTransferDetail from "./pages/ViewTransferDetail";
import Activity from "./pages/Activity";
import { StolenBike } from "./components/MyBikes/StolenBike";

// Auth pages
import { PrivateRoutes } from "./components/Auth/PrivateRoute";

function App() {
  return (
    <div className="min-w-screen min-h-screen bg-gray-700">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/userlogin" element={<UserLogin />} />
        <Route path="/bikeregistration" element={<BikeRegistration />} />
        <Route path="/registration" element={<PhoneRegistration />} />
        <Route
          path="/smsverification/:session_id"
          element={<SmsVerification />}
        />
        <Route path="/choosepassword" element={<ChoosePassword />} />

        <Route element={<PrivateRoutes />}>
          <Route path="/mybikes" element={<MyBikes />} />
          <Route path="/transferbike/:id" element={<BikeTransfer />} />
          <Route path="/stolenbike" element={<StolenBike />} />
          <Route path="/activities" element={<Activity />} />
          <Route
            path="/transfers/accept/:transfer_id"
            element={<ViewTransferAccept />}
          />
          <Route
            path="/transfers/detail/:transfer_id"
            element={<ViewTransferDetail />}
          />
        </Route>

        <Route path="/Storelogin" element={<StoreLogin />} />
      </Routes>
    </div>
  );
}

export default App;
