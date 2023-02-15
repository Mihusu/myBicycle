<<<<<<< Updated upstream
import { createBrowserRouter,
   RouterProvider,
    Navigate } from "react-router-dom"

// Non-auth pages
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";
import MineCykler from "./pages/MineCykler";

import './App.css'

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
      path: "/minecykler",
      element: <MineCykler />,
      errorElement: <NotFound />,
    }])

  return <RouterProvider router={router} />
    
=======
import { useState } from 'react'
import reactLogo from './assets/react.svg'

function App() {
  const [count, setCount] = useState(0)
  let col_val = 500;

  return (
    <div className="App">
      <div className='container max-w-sm mx-auto p-2 flex flex-col -space-y-24 hover:space-y-2'>
        {[...Array(4)].map((_, key) => {
          return (
            <div key={key} className={`w-full h-44 bg-blue-500 shadow-xl border rounded -py-20`}>1</div>
          )
        })}
      </div>
    </div>
  )
>>>>>>> Stashed changes
}

export default App
