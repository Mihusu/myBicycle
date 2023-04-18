import React from 'react'
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

const DeviceVerify = () => {

    const [error, setError] = useState("");

    const {
        register,
        watch,
        handleSubmit,
    } = useForm({
        defaultValues: {
            OTP: ""
        },
    });

    const watchOTP = watch(["OTP"]);
    const navigate = useNavigate();

    const onSubmit = async () => {
        const requestOptions = {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
        };
        try {
            const response = await fetch(API_URL + `/auth/device-verify`, requestOptions);

            const body = await response.json();

            if (!(response.ok)) {
                setError(body.detail);
                return;
            }

            //Trigger a page refresh and go to main page
            navigate(0);
            navigate("/mybikes");
        } catch (error) {
            // Something failed miserably
            console.log(error);
        }

    };

    // checks whether OTP is 6 letters long.
    function matchLength(OTP) {
        if (OTP.length == 6) {
            return true;
        } else return false;
    }

    return (
        <div className="flex items-center justify-center h-screen">
            <div className="max-w-md w-full p-6">
                <h1 className="text-3xl mb-6 text-center text-white">Bekræft enhed</h1>
                <form
                    className="flex flex-col items-center justify-center bg-gray-800 rounded-lg px-10 py-8"
                    onSubmit={handleSubmit(onSubmit)}
                >
                    <div className='rounded-lg bg-white shadow dark:bg-gray-800 space-y-2'>
                        <p className='py-2 mb-1'>
                            For at bekræfte din enhed, bedes de indtaste en engangskode for at komme på din konto
                        </p>
                        <label className="font-light text-gray-800 dark:text-white">
                            Engangskode:
                            <span className="text-red-500 required-dot"> *</span>
                        </label>
                        <input
                            type="text"
                            id="required-engangskode"
                            className="rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                            placeholder="Indtast din kode her"
                            {...register(
                                "OTP",
                                { required: true },
                                { min: 6, max: 6 },
                                { pattern: /^[0-9]{6}$/i }
                            )}
                        />
                        {error && <span className="flex justify-center text-red-500">{error}</span>}
                    </div>

                    <div className='rounded-lg bg-white shadow dark:bg-gray-800 space-y-2 my-4'>
                        <p className='py-2 mb-1'>
                            For nemt at genkende din enhed blandt listen over enheder, 
                            skal du give browseren et kaldenavn
                        </p>
                        <label className="font-light text-gray-800 dark:text-white">
                            Enheds navn:
                            <span className="text-red-500 required-dot"> *</span>
                        </label>
                        <input
                            type="text"
                            id="required-brugernavn"
                            className="rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                            placeholder="Skriv et brugernavn her"
                        />
                        {error && <span className="flex justify-center text-red-500">{error}</span>}
                    </div>  

                    <button className="btn my-4 mt-8 flex w-full max-w-[320px] justify-center gap-2 bg-green-500 py-2 px-8 text-green-100"
                        type="submit"
                        disabled={!matchLength(watchOTP[0])}>
                        Bekræft
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
                </form>
            </div>
        </div>
    )
}

export default DeviceVerify;