import React, { useState } from "react";
import { useForm } from "react-hook-form";
import secureLocalStorage from "react-secure-storage";
import { Link, useNavigate } from "react-router-dom";

const API_URL = import.meta.env.VITE_API_URL;

function PageLogin() {

    const [error, setError] = useState("")

    const {
        register,
        control,
        handleSubmit,
    } = useForm();

    const navigate = useNavigate();

    const onSubmit = async (data) => {

        const response = await fetch(API_URL + '/auth/token', {            
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        })

        const result = await response.json()

        if (response.ok) {
            secureLocalStorage.setItem('accesstoken', result.access_token)
            navigate(`/mybikes`, { replace: true });
            
        }
        else {
            setError(result.detail)
        }

    }

    return (
        <div className="grid h-screen place-items-center p-4">
            <div className="bg-white rounded-lg shadow dark:bg-gray-800 p-4">
                {/* Errors */}
                {error && <div className="p-4 rounded-lg bg-error text-white">{error}</div>}

                {/* Use a form element to wrap the inputs and button */}
                <form
                    className="rounded-lg bg-white p-2 shadow dark:bg-gray-800 sm:px-2 md:px-4 lg:px-10"
                    onSubmit={handleSubmit(onSubmit)}
                >
                    {/* Use input elements for phoneNumber and password */}
                    <h1 className="flex justify-center text-3xl mb-4">Login</h1>
                    <div className="pb-2 font-light text-gray-800 dark:text-white px-8"
                        control={control}
                        rules={{ required: true }}>
                        Tlf nr:
                        <span className="required-dot text-red-500"> *</span>
                    </div>
                    <div className="px-8">
                        <input
                            type="text"
                            placeholder="Telefonnummer"
                            className="rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                            {...register('phone_number')}
                        />
                    </div>
                    <div className='space-y-2 py-4 px-8'>
                        <label className="font-light text-gray-800 dark:text-white">
                            Adgangskode:
                            <span className="text-red-500 required-dot"> *</span>
                        </label>
                        <input
                            type="password"
                            className="rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                            placeholder="Adgangskode"
                            {...register('password')}
                        />
                    </div>

                    <div className="flex flex-col justify-center items-center space-y-2">

                        <button className="btn my-2 mt-8 w-full max-w-xs bg-green-500 py-2 px-4 text-green-100" type="submit">
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

                        <p>Har du ikke registreret dig som bruger? <Link to='/registration'><span className="text-blue-500">Registrer her</span></Link></p>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default PageLogin;