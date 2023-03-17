import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from "react-router-dom";

// Non-auth pages
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";
import MyBikes from "./pages/MyBikes";
import SmsVerification from "./pages/SmsVerification";
import BikeRegistration from "./pages/BikeRegistration";
import PhoneRegistration from "./pages/PhoneRegistration";
import ChoosePassword from "./pages/ChoosePassword";
import BikeTransfer from "./pages/BikeTransfer";
import BikeStolen from "./pages/BikeStolen";
// Auth pages
import ClaimBike from "./pages/ClaimBike";

function App() {
  // router
  const router = createBrowserRouter([
    {
      // Homepage is left unused
      path: "/",
      element: <NotFound /> /*<Navigate to={"/mybikes"}*/,
      errorElement: <NotFound />,
    },
    {
      path: "/login",
      element: <Login />,
      errorElement: <NotFound />,
    },
    {
      path: "/bikeregistration",
      element: <BikeRegistration />,
      errorElement: <NotFound />,
    },
    {
      path: "/mybikes",
      element: <MyBikes />,
      errorElement: <NotFound />,
    },
    {
      path: "/registration",
      element: <PhoneRegistration />,
      errorElement: <NotFound />,
    },
    {
      path: "/smsverification/:session_id",
      element: <SmsVerification />,
      errorElement: <NotFound />,
    },
    {
      path: "/claimbike",
      element: <ClaimBike />,
      errorElement: <NotFound />,
    },
    {
      path: "/choosepassword",
      element: <ChoosePassword />,
      errorElement: <NotFound />,
    },
    {
      path: "/transferbike",
      element: <BikeTransfer />,
      errorElement: <NotFound />,
    },
    {
      path: "/stolenbike",
      element: <BikeStolen />,
      errorElement: <NotFound />,
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
