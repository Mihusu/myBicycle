import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { LayoutWithBack } from "../components/Layout/LayoutWithBack";
import { useLocation, useParams, useNavigate } from "react-router-dom";
import secureLocalStorage from "react-secure-storage";

const API_URL = import.meta.env.VITE_API_URL;
const token = secureLocalStorage.getItem("accesstoken");

export const BikeReportFound = () => {
  const { frame_number: frameNumber } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);

  let userId = "";

  if (location.state != null) {
    userId = location.state.userId;
  }

  // const [location, setLocation] = useState(null);
  const {
    register,
    handleSubmit,
    setValue,
    setError,
    formState: { errors },
  } = useForm({
    defaultValues: {
      address: "",
      comment: "",
      image: undefined,
    },
    resetOptions: {
      keepDirtyValues: true, // user-interacted input will be retained
      keepErrors: true, // input errors will be retained with value update
    },
  });

  const onSubmit = async (data) => {
    setIsSubmitting(true);

    try {

      const formData = new FormData();
      for (const key in data) {
        if (key === "image") {
          formData.append(key, data.image[0]);
        } else {
          formData.append(key, data[key]);
        }
      }
      formData.append("frame_number", frameNumber);
      formData.append("bike_owner", userId);

      // console.log(`formData object: `, Object.fromEntries(formData.entries()));

      const response = await fetch(API_URL + "/bikes/discoveries", {
        method: "POST",
        headers: {
          Authorization: "Bearer " + token,
        },
        body: formData,
      });

      const body = await response.json();
      if (response.ok) {
        navigate("/mybikes");

      }
      if (!response.ok) {
        console.log(body.detail);
        return;

      }

      setIsSubmitting(false);

    } catch (error) {
      console.error(error);
    }
  };

  // Find user's geolocation
  const findLocation = () => {
    try {
      window.navigator.geolocation.getCurrentPosition(async (loc) => {
        // setLocation(loc);
        const { latitude: lat, longitude: lon } = loc.coords;
        const formattedAddress = await fetchAddress(lat, lon);
        setValue("address", formattedAddress);
      });
    } catch (error) {
      console.error(error);
    }
  };

  // Retrieve real world address of a coordinate pair
  const fetchAddress = async (lat, lon) => {
    try {
      // example // https://api.geoapify.com/v1/geocode/reverse?lat=57.0323&lon=9.9456&lang=da&apiKey=f4cffa4927fa4a22a6be5d8114711b0f
      const response = await fetch(`
        https://api.geoapify.com/v1/geocode/reverse?lat=${lat}&lon=${lon}&lang=da&apiKey=f4cffa4927fa4a22a6be5d8114711b0f`);
      if (response.ok) {
        const result = await response.json();
        const addr = result.features[0].properties.formatted;
        return addr;
      } else {
        console.error("geolocation response failed");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <LayoutWithBack title="Indrapporter cykel">
        <div className="flex flex-col items-center justify-center mx-auto max-w-[385px] rounded-lg border bg-gray-800 hover:shadow-xl dark:bg-gray-800 sm:px-6 md:px-8 lg:px-10 m-4">
          {/* Find my location button */}
          <button className={`btn-info btn mt-8`} onClick={() => findLocation()}>

                Find min lokation
          </button>

          {/* Address form */}
          <div className="p-6">
            <form className="items-center justify-center" onSubmit={handleSubmit(onSubmit)}>
              <div className="mb-6 flex flex-col">
                <div className="relative">
                  <h1 className="text-white mb-2">
                    Angiv adressen hvor cyklen er fundet eller tryk på "Find min
                    lokation":
                    <span className="required-dot text-red-500"> *</span>
                  </h1>
                  <input
                    className="w-full flex-1 appearance-none rounded-lg border border-gray-300 bg-white py-2 px-4 text-base text-gray-700 placeholder-gray-400 shadow-sm focus:border-transparent focus:outline-none focus:ring-2 focus:ring-purple-600"
                    type="text"
                    placeholder="Vejnavn Nummer, Postnummer By"
                    {...register("address", { required: true })}
                  />
                  {errors.address && (
                    <span className="text-red-400">This field is required</span>
                  )}
                  {/* <input
                  type="text"
                  id="create-account-pseudo"
                  className="w-full flex-1 appearance-none rounded-lg border border-transparent border-gray-300 bg-white py-2 px-4 text-base text-gray-700 placeholder-gray-400 shadow-sm focus:border-transparent focus:outline-none focus:ring-2 focus:ring-purple-600"
                  name="pseudo"
                  placeholder="Gadenavn"
                /> */}
                </div>
              </div>

              <label className="text-white">
                Eventuel kommentar:
              </label>
              <textarea
                className="w-full flex-1 mt-2 appearance-none rounded-lg border border-gray-300 bg-white px-4 py-2 text-base text-gray-700 placeholder-gray-400 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-purple-600"
                id="comment"
                placeholder="Fx dine kontaktoplysninger eller andre noter angående cykelfundet"
                name="comment"
                rows="5"
                cols="40"
                type="text"
                {...register("comment")}
              ></textarea>

              {/* Images */}
              <div className="py-4">
                <h1 className="text-white mb-2">Upload billede af lokation:
                  <span className="required-dot text-red-500"> *</span>
                </h1>
                <input
                  type="file"
                  id="file-image"
                  {...register("image", { required: true })}
                />
              </div>

              <div className="my-4 flex justify-center w-full">
                <button
                  type="submit"
                  className={`btn flex justify-center w-full rounded-lg bg-green-600 py-2 text-center text-base font-semibold text-white shadow-md hover:bg-red-600 ${isSubmitting && 'loading'}`}
                >
                  {!isSubmitting &&
                    <>
                      <span className="text-center mt-0.5 mr-2">Send</span>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="h-8 w-8"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"
                        />
                      </svg>
                    </>
                  }
                </button>
              </div>
            </form>
          </div>
        </div>
      </LayoutWithBack>
    </div>
  );
};
