import React, { useState } from "react";
import secureLocalStorage from "react-secure-storage";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { PhoneNumber } from "../components/register/PhoneNumber";


const API_URL = import.meta.env.VITE_API_URL;


const get_user_details = async (url, token) => {

    const response = await fetch(url, {
        method: 'GET',
        headers: {
            'Authorization': 'Bearer ' + token
        }
    })

    return await response.json()
}

function UserLogin() {

    const [error, setError] = useState("")

    const {
        register,
        control,
        handleSubmit,
    } = useForm();

    const navigate = useNavigate();

    const onSubmit = async (data) => {

        console.log(data);

        const response = await fetch(API_URL + '/auth/token', {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        })

        const result = await response.json()

        if (response.ok) {
            const { user_id, phone_number } = await get_user_details(API_URL + `/owners/me`,  result.access_token);

            secureLocalStorage.setItem('accesstoken', result.access_token);
            secureLocalStorage.setItem('user_id', user_id);
            secureLocalStorage.setItem('phone_number', phone_number);

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
                    <div className="pb-2 font-light text-gray-800 dark:text-white px-8" >
                        Tlf nr:
                        <span className="required-dot text-red-500"> *</span>
                    </div>
                    <div className="px-8">
                        <PhoneNumber
                            name="phone_number"
                            control={control}
                            rules={{ required: true }}
                        />
                    </div>
                    <div className='space-y-2 py-4 px-8'>
                        <label className="font-light text-gray-800 dark:text-white">
                            Adgangskode:
                            <span className="text-red-500 required-dot"> *</span>
                        </label>
                        <input
                            type="password"
                            className="rounded-lg border-transparent flex-1 border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 focus:ring-2 focus:ring-purple-600 focus:border-transparent action-password"
                            placeholder="Adgangskode"
                            {...register('password')}
                        />
                    </div>

                    <div className="flex flex-col justify-center items-center space-y-2 px-8">

                        <button className="btn my-2 mt-8 w-full bg-green-500 py-2 text-green-100" type="submit">
                            Login
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={1.5}
                                stroke="currentColor"
                                className="h-8 w-10 login-button"
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

export default UserLogin;