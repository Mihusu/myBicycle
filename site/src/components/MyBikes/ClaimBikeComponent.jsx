import React from "react";
import { motion } from "framer-motion";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import secureLocalStorage from "react-secure-storage";

const API_URL = import.meta.env.VITE_API_URL;

export const ClaimBikeComponent = () => {

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
            
            //Trigger a page refresh
            navigate(0);
        } catch (error) {
            // Something failed miserably
            console.log(error);
        }

    };

    // checks whether OTP is 36 letters long.
    function matchLength(claimBikeCode) {
        if (claimBikeCode.length == 36) {
            return true;
        } else return false;
    }

    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="flex flex-col h-full items-center justify-center bg-white rounded-lg shadow dark:bg-gray-800 sm:px-6 md:px-8 lg:px-10">
            <motion.div
                transition={{ layout: { duration: 1, type: "spring" } }}
                layout="position"
                onClick={() => setIsOpen(!isOpen)}>
                <button>
                    <img
                        src="../src/assets/bicycle-svgrepo.svg"
                        alt="Bike"
                        className="mx-auto py-4"
                        width="300px"
                    />
                </button>
            </motion.div>
            <div className="self-center justify-center text-l font-light text-gray-800 sm:text-4xl dark:text-white">
                Hej!
            </div>
            <div className="self-center justify-center text-m font-light text-gray-800 sm:text-3xl dark:text-white">
                Vi kan se at du ikke har en cykel endnu
            </div>
            <div className="flex justify-center mb-4 text-l font-light text-gray-800 sm:text-3xl dark:text-white">
                Indløs din første cykel ved at trykke på cyklen
            </div>

            {/* After clicking on the bike, this will appear */}
            {isOpen && (
                <motion.div>
                    <form
                        action="#"
                        className='p-6'
                        onSubmit={handleSubmit(onSubmit)}>
                        <div className='space-y-2'>
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
                        {matchLength(watchClaimBikeCode[0]) ? (
                            <button className="btn my-2 mt-8 flex w-full max-w-xs justify-center gap-2 bg-green-500 py-2 px-4 text-green-100" type="submit">
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
                        ) : (
                            <button className="btn my-2 mt-8 flex w-full max-w-xs justify-center gap-2 bg-green-500 py-2 px-4 text-green-100"
                                type="submit"
                                disabled>
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
                        )}
                    </form>
                </motion.div>
            )}
        </div>
    );
};