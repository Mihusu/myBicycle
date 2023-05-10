import secureLocalStorage from "react-secure-storage";
import { useState } from "react";
import { Link } from "react-router-dom";
import { Footer } from "./Footer";
import { ArrowLeftOnRectangleIcon, MagnifyingGlassIcon, PlusIcon } from "@heroicons/react/24/outline"
import { FaHandHoldingMedical } from "react-icons/fa"

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
        <div className="p-4 pb-20" onClick={() => setShowSidebar(false)}>
          {/* Header */}
          <div className="mb-4 flex justify-center border-b-gray-400">
            <h1 className="font-semibold text-3xl text-white">{title}</h1>
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
          className={`fixed top-0 -right-64 h-full rounded-tl-lg border-l border-white bg-gray-800 transition ease-in-out ${showSidebar ? "-translate-x-64" : "translate-x-0"
            } `}
        >
          <div className="flex flex-col items-center justify-center space-y-8 px-8 py-2 text-white">
            <div className="flex justify-center m-4 mb-8">
              <Link to="/mybikes">
                <img src="/assets/bike_logo_64_64_transparent.png" alt="bike logo" />
              </Link>
            </div>

            <Link to="/claimbike" className="w-full">
              <div className="flex items-center space-x-4">
                <PlusIcon width={26} />
                <p className="rounded-sm hover:bg-orange-400 text-lg font-medium">
                  Indløs cykel
                </p>
              </div>
            </Link>

            <Link to="/bikelookup" className="w-full">
              <div className="flex items-center space-x-4">
                <MagnifyingGlassIcon width={26} />
                <p className="rounded-sm hover:bg-orange-400 text-lg font-medium">
                  Søg stelnummer
                </p>
              </div>
            </Link>
          </div>

          {/* <div className="flex flex-col items-center fixed inset-x-0 bottom-32 space-y-2 text-lg text-white"> */}
          <Link to="/login" className="w-full">
            <div className="fixed inset-x-0 bottom-32 space-y-2 mr-5 text-white">
              <div className="flex justify-center items-center space-x-4">
                <ArrowLeftOnRectangleIcon width={26} />
                <button className="rounded-sm hover:bg-orange-400 text-lg font-medium" onClick={logout}>
                  Log af
                </button>
              </div>
            </div>
          </Link>
          {/* </div> */}
        </div>
      </div>

      <Footer toggleSidebar={toggleSidebar} />
    </>
  );
};
