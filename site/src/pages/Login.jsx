import React, { useState } from "react";
import { useForm } from "react-hook-form";

const URL = "http://127.0.0.1:8000/auth/token";

function PageLogin() {
    const {
        register,
        control,
        watch,
        handleSubmit,
        setError,
        formState: { errors },
    } = useForm({
        defaultValues: {
            phoneNumber: "",
            password: "",
        },
    });

    // Define state variables to store the phoneNumber and password inputs
    // phoneNumber regex: ^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$
    const [phoneNumber, setPhoneNumber] = useState('');
    const [password, setPassword] = useState("");

    // Watches the inputs given from the user
    const watchInputs = watch(["phoneNumber", "password"]);

    // checks whether password matches verification
    function matchPassword(phoneNumber, password) {
        if (phoneNumber.length == 0 || password.length == 0) {
            return false;
        }

        if (phoneNumber.length >= 8 && password == verify) {
            return true;
        } else return false;
    }

    const onError = (err) => {
        console.log(err);
    };

    // Define a function to handle form submission
    const onSubmit = async (event) => {
        // Prevent the default browser behavior
        event.preventDefault();
        // Do something with the phoneNumber and password inputs
        console.log(phoneNumber, password);

        console.log(event);
        let formData = new FormData();
        formData.append("username", username);
        formData.append("password", password);
        const requestOptions = await fetch(apiLink, {
            method: "POST",
            body: formData,
        });
        fetch(URL, requestOptions)
            .then((response) => response.json())
            .then((event) => navigate(`/login/${event.access_token}`))
            .catch((error) => setError(error.message));

        // Clear the inputs
        setPhoneNumber("");
        setPassword("");
    };

    return (
        <div className="flex flex-col items-center justify-center py-56">
            <div className="bg-white rounded-lg shadow dark:bg-gray-800 md:w-auto">
                {/* Use a form element to wrap the inputs and button */}
                <form
                    className="rounded-lg bg-white py-8 shadow dark:bg-gray-800 sm:px-2 md:px-4 lg:px-10"
                    onSubmit={handleSubmit(onSubmit, onError)}
                >
                    {/* Use input elements for phoneNumber and password */}
                    <div className="pb-2 font-light text-gray-800 dark:text-white px-8"
                        control={control}
                        rules={{ required: true }}>
                        <h1 className="flex justify-center text-3xl mb-4">Login</h1>
                        Tlf nr:
                        <span className="required-dot text-red-500"> *</span>
                    </div>
                    <div className="px-8">
                        <input
                            type="text"
                            placeholder="Telefonnummer"
                            className="rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                            value={phoneNumber}
                            onChange={(event) => setPhoneNumber(event.target.value)}
                        />
                        {errors.password && <span>This field is required</span>}
                    </div>
                    <div className='space-y-2 py-4 px-8'>
                        <label className="font-light text-gray-800 dark:text-white">
                            Adgangskode:
                            <span className="text-red-500 required-dot"> *</span>
                        </label>
                        <input
                            type="password"
                            id="password"
                            className="rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                            name="FrameNumber"
                            placeholder="Adgangskode"
                            value={password}
                            onChange={(event) => setPassword(event.target.value)}
                        />
                        {errors.verify && <span>This field is required</span>}
                    </div>

                    <div className="flex justify-center">
                        {/* Use a button element to submit the form */}
                        {matchPassword(watchInputs[0], watchInputs[1]) ? (
                            <button className="btn my-2 mt-8 w-full max-w-xs bg-green-500 py-2 px-4 text-green-100"
                                type="submit">
                                Login
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
                            </button>
                        ) : (
                            <button className="btn my-2 mt-8 w-full max-w-xs bg-green-500 py-2 px-4 text-green-100"
                                type="submit"
                                disabled>
                                Login
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth={1.5}
                                    stroke="currentColor"
                                    className="h-8 w-10"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"
                                    />
                                </svg>
                            </button>
                        )}
                    </div>
                </form>
            </div>
        </div>
    );
}

export default PageLogin;