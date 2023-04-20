import { useState } from "react";
import { Link } from "react-router-dom";
import { Footer } from "./Footer";
import secureLocalStorage from "react-secure-storage";

export const Layout = ({ title = "Ukendt", isLoading = false, children }) => {
  const [showSidebar, setShowSidebar] = useState(false);

  const toggleSidebar = () => {
    setShowSidebar(!showSidebar);
  };

  const logout = () => {
    secureLocalStorage.clear("accesstoken", null);
  };

  return (
    <>
      <div id="layout">
        <div className="p-4 pb-20">
          {/* Header */}
          <div className="mb-4 flex justify-center border-b-gray-400">
            <h1 className="text-3xl text-white">{title}</h1>
          </div>
          {/* Content */}
          {isLoading ? (
            <div className="flex justify-center">
              <button className="btn-outline loading btn border-none"></button>
            </div>
          ) : (
            children
          )}
        </div>

        {/* Sidebar */}
        <div
          className={`absolute top-0 -right-64 h-full rounded-tl-lg border-l border-white bg-gray-800 transition ease-in-out ${
            showSidebar ? "-translate-x-64" : "translate-x-0"
          } `}
        >
          <ul className="flex flex-col items-center justify-center space-y-4 p-2 text-white">
            <li
              onClick={toggleSidebar}
              className="cursor-pointer self-end rounded-sm p-2 hover:bg-orange-400"
            >
              X
            </li>

            <li className="rounded-sm px-16 hover:bg-orange-400">Profil</li>
            <Link to="/claimbike">
              <li className="rounded-sm px-16 hover:bg-orange-400">
                Indløs cykel
              </li>
            </Link>

            <Link to="/bikelookup">
              <li className="rounded-sm hover:bg-orange-400">
                Søg efter stelnummer
              </li>
            </Link>

            <Link to="/login">
              <button
                className="rounded-sm px-16 hover:bg-orange-400"
                onClick={logout}
              >
                Log af
              </button>
            </Link>
          </ul>
        </div>
      </div>

      <Footer toggleSidebar={toggleSidebar} />
    </>
  );
};
