import { createBrowserRouter, RouterProvider, Navigate } from "react-router-dom"

// Non-auth pages
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";
import MyBikes from "./pages/MyBikes";
import BikeRegistration from "./pages/RegistrationOfBikes";

// Auth pages
import ClaimBikePage from "./pages/ClaimBike";

function App() {
  // router
  const router = createBrowserRouter([
    { // Homepage is left unused
      path: "/",
      element: <Navigate to={"/mybikes"} />,
      errorElement: <NotFound />
    },
    {
      path: "/login",
      element: <Login />,
      errorElement: <NotFound />,
    },
    {
      path: "/bicycleregistration",
      element: <BikeRegistration />,
      errorElement: <NotFound />,
    },
    {
      path: "/mybikes",
      element: <MyBikes />,
      errorElement: <NotFound />,
    },
    {
      path: "/claim",
      element: <ClaimBikePage />,
      errorElement: <NotFound />,
    }])
    




  return <RouterProvider router={router} />
    
}

export default App
