import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from "react-router-dom";

// Non-auth pages
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";
import MyBikes from "./pages/MyBikes";
import Test from "./pages/Test";
import BikeRegistration from "./pages/BikeRegistration";
import PhoneRegistration from "./pages/PhoneRegistration";
import ChoosePassword from "./pages/ChoosePassword";

// Auth pages
import ClaimBikePage from "./pages/ClaimBike";

function App() {
  // router
  const router = createBrowserRouter([
    {
      // Homepage is left unused
      path: "/",
      element: <Test /> /*<Navigate to={"/mybikes"}*/,
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
      path: "/claim",
      element: <ClaimBikePage />,
      errorElement: <NotFound />,
    },
    {
      path: "/choosepassword",
      element: <ChoosePassword />,
      errorElement: <NotFound />,
    }
  ]);

  return <RouterProvider router={router} />;
}

export default App;
