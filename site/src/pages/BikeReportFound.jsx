import React from "react";
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
    try {
      // console.log("submitting data: ", data);
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
        // console.log(body.detail);
      }
      if (!response.ok) {
        console.log(body.detail);
        return;
      }
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
        <div className="flex flex-col items-center justify-center mx-auto max-w-[425px] bg-white">
          {/* Find my location button */}
          <button className="btn-info btn" onClick={() => findLocation()}>
            Find min lokation
          </button>

          {/* Address form */}
          <div className="mt-8 p-6">
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="mb-2 flex flex-col">
                <div className="relative">
                  <h1 className="text-purple-300">
                    Angiv adressen hvor cyklen er fundet eller tryk på "Find min
                    lokation"
                    <span className="required-dot text-red-500"> *</span>
                  </h1>
                  <input
                    className="w-full flex-1 appearance-none rounded-lg border border-gray-300 bg-white py-2 px-4 text-base text-gray-700 placeholder-gray-400 shadow-sm focus:border-transparent focus:outline-none focus:ring-2 focus:ring-purple-600"
                    type="text"
                    placeholder="Vejnavn Nummer, Postnummer By"
                    {...register("address", { required: true })}
                  />
                  {errors.address && (
                    <span className="text-red-300">This field is required</span>
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

              <label className="text-purple-300" htmlFor="name">
                Eventuel kommentar
              </label>
              <textarea
                className="w-full flex-1 appearance-none rounded-lg border border-gray-300 bg-white px-4 py-2 text-base text-gray-700 placeholder-gray-400 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-purple-600"
                id="comment"
                placeholder="Fx dine kontaktoplysninger eller andre noter angående cykelfundet"
                name="comment"
                rows="5"
                cols="40"
                type="text"
                {...register("comment")}
              ></textarea>

              {/* Images */}
              <div className="py-8">
                {/* <DropZoneComponent></DropZoneComponent> */}
                <h1 className="mb-2">Upload billede af lokation</h1>
                <input
                  type="file"
                  id="file-image"
                  {...register("image", { required: true })}
                />
              </div>

              <div className="my-4 flex justify-center w-full">
                <button
                  type="submit"
                  className="w-full rounded-lg bg-purple-600 py-2 px-4 text-center text-base font-semibold text-white shadow-md transition duration-200 ease-in hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-purple-200 "
                >
                  Send
                </button>
              </div>
            </form>
          </div>
        </div>
      </LayoutWithBack>
    </div>
  );
};
