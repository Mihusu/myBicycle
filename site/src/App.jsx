import { createBrowserRouter, RouterProvider, Navigate } from "react-router-dom"

// Non-auth pages
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";
import MineCykler from "./pages/MineCykler";
import BikeRegistration from "./pages/RegistrationOfBikes";

function App() {
  // router
  const router = createBrowserRouter([
    { // Homepage is left unused
      path: "/",
      element: <Navigate to={"/minecykler"} />,
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
      path: "/minecykler",
      element: <MineCykler />,
      errorElement: <NotFound />,
    }])
    




  return <RouterProvider router={router} />
    
}

export default App
