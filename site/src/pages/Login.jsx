import React, { useState } from "react";
import { useForm } from "react-hook-form";

const URL = "http://127.0.0.1:8000/auth/login/me";

function Login() {
    const {
        login,
        control,
        watch,
        handleSubmit,
        setError,
        formState: { errors },
    } = useForm({
        defaultValues: {
            email: "",
            password: "",
        },
    });

    // Define state variables to store the email and password inputs
    // email regex: ^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState("");

    // Watches the 
    const watchInputs = watch(["email", "password"]);

    // checks whether password matches verification
    function matchPassword(password, verify) {
        if (password.length == 0 || verify.length == 0) {
            return false;
        }

        if (password.length >= 8 && password == verify) {
            return true;
        } else return false;
    }

    const onError = (err) => {
        console.log(err);
    };

    // Define a function to handle form submission
    const onSubmit = (data) => {
        // Prevent the default browser behavior
        data.preventDefault();
        // Do something with the email and password inputs
        console.log(email, password);

        console.log(data);
        const requestOptions = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data),
        };
        fetch(URL, requestOptions)
            .then((response) => response.json())
            .then((data) => navigate(`/login/${data.access_token}`))
            .catch((error) => setError(error.message));

        // Clear the inputs
        setEmail("");
        setPassword("");
    };

    return (
        <div className="flex flex-col items-center justify-center py-64">
            <div className="bg-white rounded-lg shadow dark:bg-gray-800 md:w-auto">
                {/* Use a form element to wrap the inputs and button */}
                <form   
                    className="rounded-lg bg-white py-8 shadow dark:bg-gray-800 sm:px-2 md:w-auto md:px-8 lg:px-20"
                    onSubmit={handleSubmit(onSubmit, onError)}
                >
                    {/* Use input elements for email and password */}
                    <div className="pt-4 pb-2 font-light text-gray-800 dark:text-white px-8"
                        control={control}
                        rules={{ required: true }}>
                        E-mail:
                        <span className="required-dot text-red-500"> *</span>
                    </div>
                    <div className="px-8">
                        <input
                            type="text"
                            placeholder="E-mail"
                            className="rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
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
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        {errors.verify && <span>This field is required</span>}
                    </div>

                    <div className="flex justify-center">
                    {/* Use a button element to submit the form */}
                    {matchPassword(watchInputs[0], watchInputs[1]) ? (
                        <button className="btn my-2 mt-8 w-full max-w-xs bg-green-500 py-2 px-4 text-green-100" 
                            type="submit">
                            Registrer
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
                            Registrer
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
                    )}
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Login;