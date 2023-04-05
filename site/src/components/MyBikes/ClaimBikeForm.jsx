import React from 'react'
import { motion } from "framer-motion";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import secureLocalStorage from "react-secure-storage";

export const ClaimBikeForm = () => {

    const [error, setError] = useState("");

    const token = secureLocalStorage.getItem('accesstoken');

    const {
        register,
        watch,
        handleSubmit,
    } = useForm({
        defaultValues: {
            claimBikeCode: ""
        },
    });

    const watchClaimBikeCode = watch(["claimBikeCode"]);
    const navigate = useNavigate();

    const onSubmit = async (data) => {
        const requestOptions = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
        };
        try {
            const response = await fetch(API_URL + `/bikes/claim/${data.claimBikeCode}`, requestOptions);

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

    // checks whether claimcode is 36 letters long.
    function matchLength(claimBikeCode) {
        if (claimBikeCode.length == 36) {
            return true;
        } else return false;
    }

    return (
        <form
            className='p-6 bg-gray-800 rounded-lg'
            onSubmit={handleSubmit(onSubmit)}>
            <div className='space-y-2'>
                <p className='py-2 mb-4'>
                    Skriv din indløsningskode du har modtaget på sms nedenfor 
                    for at indløse din cykel. 
                </p>
                <label className="font-light text-gray-800 dark:text-white">
                    Engangskode:
                    <span className="text-red-500 required-dot"> *</span>
                </label>
                <input
                    type="text"
                    id="required-engangskode"
                    className="rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                    placeholder="XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX"
                    {...register(
                        "claimBikeCode",
                        { required: true },
                        { min: 36, max: 36 },
                        { pattern: /^[A-Za-z0-9]{8}-[A-Za-z0-9]{4}-[A-Za-z0-9]{4}-[A-Za-z0-9]{4}-[A-Za-z0-9]{12}$/i }
                    )}
                />
                {error && <span className="flex justify-center text-red-500">{error}</span>}
            </div>

            <button className="btn my-2 mt-8 flex w-full max-w-xs justify-center gap-2 bg-green-500 py-2 px-4 text-green-100"
                type="submit"
                disabled={!matchLength(watchClaimBikeCode[0])}>
                Indløs
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
    )
}
