import React from "react";
import { RadioButton } from "../components/register/Radiobutton";
import { PhoneNumber } from "../components/register/PhoneNumber";
import { useForm } from "react-hook-form";

const API_URL = import.meta.env.VITE_API_URL;

const BikeRegistration = () => {
  const {
    register,
    control,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm({
    defaultValues: {
      phone_number: "",
      frame_number: "",
      gender: "",
      is_electric: "",
      kind: "",
      brand: "",
      color: "",
      image: undefined,
    },
  });

  const onSubmit = async (data) => {

    try {

      const formData = new FormData();
      for (const key in data) {
        if (key === "image") { formData.append(key, data.image[0]) }
        else { formData.append(key, data[key]) }
        
      }

      const response = await fetch(API_URL + "/bikes", {
        method: "POST",
        body: formData,
      });

      const body = response;
      if (!response.ok) {
        setError(body.detail);
        return;
      }

    } catch (error) {
      console.error(error);
    }

  };

  const onError = (error) => {
    console.error(error);
  };

  return (
    <div className="my-8 flex flex-col items-center justify-center ">
      <div className=" rounded-lg bg-white px-4 py-8 shadow dark:bg-gray-800 sm:px-6 md:w-auto md:px-8 lg:px-10">
        <div className="self-center text-xl font-light text-gray-800 dark:text-white sm:text-2xl">
          Cykel registering
        </div>

        <div className="mt-4 p-2">
          <form onSubmit={handleSubmit(onSubmit, onError)}>
            <div className="space-y-2">
              <div className="rounded-lg bg-white p-4 shadow dark:bg-gray-800">
                <h1 className="mb-2">
                  Stelnummer:
                  <span className="required-dot text-red-500"> *</span>
                </h1>
                <input
                  type="text"
                  id="stelnummer"
                  className="w-full flex-1 appearance-none rounded-lg border border-transparent border-gray-300 bg-white py-2 px-4 text-base text-gray-700 placeholder-gray-400 shadow-sm focus:border-transparent focus:outline-none focus:ring-2 focus:ring-purple-600"
                  placeholder="Indtast stelnummer"
                  {...register(
                    "frame_number",
                    { required: true },
                    { min: 8, max: 32 }
                  )}
                  />
              </div>

              {/* Phonenumber */}
              <div className="rounded-lg bg-white p-4 shadow dark:bg-gray-800 ">
                <h2 className="mb-2">
                  Indtast mobiloplysninger på den nye ejer:
                  <span className="required-dot text-red-500"> *</span>
                </h2>
                <div>
                  <PhoneNumber
                    name="phone_number"
                    control={control}
                    rules={{ required: true }}
                  />
                </div>
              </div>

              {/* Bike model */}
              <div className=" rounded-lg bg-white p-4 shadow dark:bg-gray-800">
                <h2 className="mb-2">Vælg model:</h2>
                <div className="grid grid-cols-3 place-items-center px-4 py-2">
                  <RadioButton
                    labelName={"Herre"}
                    value="male"
                    color={"radio border-blue-500 bg-content"}
                    {...register("gender", {
                      required: true,
                    })}
                  />
                  <RadioButton
                    labelName={"Dame"}
                    value="female"
                    color={"radio border-pink-500 bg-content"}
                    {...register("gender", {
                      required: true,
                    })}
                  />
                  <RadioButton
                    labelName={"Unisex"}
                    value="uni_sex"
                    color={"radio border-purple-500 bg-content"}
                    {...register("gender", {
                      required: true,
                    })}
                  />
                </div>
              </div>

              {/* Electic */}
              <div className=" rounded-lg bg-white p-4 shadow dark:bg-gray-800">
                <h2 className="mb-2">Er det en El-cykel?</h2>
                <div className="grid grid-cols-2 place-items-center px-4 py-2">
                  <RadioButton
                    labelName={"El-cykel"}
                    color={"radio border-green-500 bg-content"}
                    value={true}
                    {...register("is_electric", {
                      required: true,
                    })}
                  />
                  <RadioButton
                    labelName={"Ikke El-cykel"}
                    color={"radio border-yellow-900 bg-content"}
                    value={false}
                    {...register("is_electric", {
                      required: true,
                    })}
                  />
                </div>
              </div>

              {/* Bike type */}
              <div className="rounded-lg bg-white p-4 shadow dark:bg-gray-800">
                <h2 className="mb-2">Vælg cykel type:</h2>
                <div className="grid grid-cols-2 place-items-center px-4 py-2">
                  <RadioButton
                    labelName={"City"}
                    color={"radio border-teal-500 bg-content"}
                    value="city"
                    {...register("kind", {
                      required: true,
                    })}
                  />
                  <RadioButton
                    labelName={"Gravel"}
                    color={"radio border-indigo-500 bg-content"}
                    value="gravel"
                    {...register("kind", {
                      required: true,
                    })}
                  />
                  <RadioButton
                    labelName={"Lad"}
                    color={"radio border-yellow-500 bg-content"}
                    value="cargo"
                    {...register("kind", {
                      required: true,
                    })}
                  />
                  <RadioButton
                    labelName={"Racer"}
                    color={"radio border-red-500 bg-content"}
                    value="race"
                    {...register("kind", {
                      required: true,
                    })}
                  />
                </div>
              </div>

              {/* Brand */}
              <div className="rounded-lg bg-white p-4 shadow dark:bg-gray-800">
                <h1 className="mb-2">Brand:</h1>
                <input
                  type="text"
                  id="brand"
                  className="w-full flex-1 appearance-none rounded-lg border border-transparent border-gray-300 bg-white py-2 px-4 text-base text-gray-700 placeholder-gray-400 shadow-sm focus:border-transparent focus:outline-none focus:ring-2 focus:ring-purple-600"
                  placeholder="Skriv brandet Ex. 'MBK'"
                  {...register(
                    "brand",
                    { required: true },
                    { min: 1, max: 32 }
                  )}
                />
              </div>

              {/* Color */}
              <div className="rounded-lg bg-white p-4 shadow dark:bg-gray-800">
                <h2 className="mb-2">Vælg en farve:</h2>

                <div className="grid grid-cols-2 place-items-center ">
                  <RadioButton
                    labelName={"Sort"}
                    color={"radio border-neutral-900 bg-content"}
                    value="black"
                    {...register("color", {
                      required: true,
                    })}
                  />
                  <RadioButton
                    labelName={"Hvid"}
                    color={"radio border-neutral-50 bg-content"}
                    value="white"
                    {...register("color", {
                      required: true,
                    })}
                  />
                  <RadioButton
                    labelName={"Grå"}
                    color={"radio border-gray-400 bg-content"}
                    value="gray"
                    {...register("color", {
                      required: true,
                    })}
                  />
                  <RadioButton
                    labelName={"Rød"}
                    color={"radio border-red-500 bg-content"}
                    value="red"
                    {...register("color", {
                      required: true,
                    })}
                  />
                  <RadioButton
                    labelName={"Blå"}
                    color={"radio border-blue-700 bg-content"}
                    value="blue"
                    {...register("color", {
                      required: true,
                    })}
                  />
                  <RadioButton
                    labelName={"Grøn"}
                    color={"radio border-green-700 bg-content"}
                    value="green"
                    {...register("color", {
                      required: true,
                    })}
                  />
                  <RadioButton
                    labelName={"Gul"}
                    color={"radio border-yellow-400 bg-content"}
                    value="yellow"
                    {...register("color", {
                      required: true,
                    })}
                  />
                  <RadioButton
                    labelName={"Orange"}
                    color={"radio border-orange-500 bg-content"}
                    value="orange"
                    {...register("color", {
                      required: true,
                    })}
                  />
                  <RadioButton
                    labelName={"Purple"}
                    color={"radio border-purple-400 bg-content"}
                    value="purple"
                    {...register("color", {
                      required: true,
                    })}
                  />
                  <RadioButton
                    labelName={"Andet"}
                    color={"radio radio-primary"}
                    value="other"
                    {...register("color", {
                      required: true,
                    })}
                  />
                </div>
              </div>
            </div>

            {/* Images */}
            <div className="py-8">
              {/* <DropZoneComponent></DropZoneComponent> */}
              <input
                type="file"
                id="file-image"
                {...register("image", { required: true })}
              />
            </div>

            <button
              type="submit"
              className="flex w-full items-center justify-center rounded-lg bg-blue-600 py-2 px-4 text-center text-base font-semibold text-white shadow-md transition duration-200 ease-in hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-blue-200 "
            >
              Registrer Cykel
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default BikeRegistration;
