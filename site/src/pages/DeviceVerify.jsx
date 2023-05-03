import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { HiArrowLeft } from 'react-icons/hi';
import { useNavigate, useParams } from "react-router-dom";


const API_URL = import.meta.env.VITE_API_URL;


const DeviceVerify = () => {

    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);

    const {
        register,
        watch,
        handleSubmit,
    } = useForm({
        defaultValues: {
            otp: "",
            deviceName: ""
        },
    });

    const watchOtp = watch(["otp"]);
    const navigate = useNavigate();
    const { session_id } = useParams();

    const onSubmit = async (data) => {
        setIsSubmitting(true);

        try {
            const response = await fetch(API_URL + `/auth/trust-device`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    session_id: session_id,
                    otp: data.otp,
                    device_name: data.deviceName
                })
            });

            const body = await response.json();

            if (!(response.ok)) {
                setError("Forkert engangskode eller sessionen er udløbet");
                setIsSubmitting(false);
                return;
            }

            setError(null); // Clear any previous error message

            // Response was okay. Redirect back to login page
            setSuccess("Din enhed er blevet tilføjet til listen af godkendte enheder. Omdirigerer dig til login...");
            setTimeout(() => navigate("/login"), 3000);
            setIsSubmitting(false);

        } catch (error) {
            // Something failed miserably
            console.error(error);
        }

    };

    // checks whether OTP is 6 letters long.
    function matchLength(otp) {
        if (otp.length === 6) {
            return true;
        } else return false;
    }

    return (
        <div className="flex items-center justify-center h-screen">
            <div className="max-w-md w-full p-6">
                <div className='flex items-center text-center w-full p-2'>
                    <button className='pr-8' onClick={() => navigate(-1)}>
                        <HiArrowLeft size={24} />
                    </button>
                    <h1 className="text-3xl text-white">Bekræft enhed</h1>
                </div>

                {/* Response error */}
                {error && <p className="p-4 mb-4 rounded-lg bg-error text-white">{error}</p>}
                {/* Response success */}
                {success && <p className="p-4 mb-4 rounded-lg bg-green-500 text-white">{success}</p>}

                <form
                    className="flex flex-col items-center justify-center bg-gray-800 rounded-lg px-10 py-8"
                    onSubmit={handleSubmit(onSubmit)}
                >
                    <div className='rounded-lg bg-gray-800 shadow space-y-2'>
                        <p className='text-white py-2 mb-1'>
                            Hej, det lader til at du logger ind fra en ny enhed. Som en ekstra sikkerhed beder vi dig
                            bekræfte enheden ved at indtaste sms-koden vi har sendt til dig.
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
                                "otp",
                                { required: true },
                                { min: 6, max: 6 },
                                { pattern: /^[0-9]{6}$/i }
                            )}
                        />
                    </div>

                    <div className='rounded-lg bg-gray-800 text-white space-y-2 my-4'>
                        <p className='py-2 mb-1'>
                            For nemt at genkende din enhed blandt listen over enheder,
                            bedes du give din enhed et kaldenavn
                        </p>
                        <label className="font-light text-gray-800 dark:text-white">
                            Navn på enhed:
                            <span className="text-red-500 required-dot"> *</span>
                        </label>
                        <input
                            type="text"
                            id="required-brugernavn"
                            className="rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                            placeholder="Ex. Peter's-PC"
                            {...register("deviceName", { required: true })}
                        />
                    </div>

                    <button className={`btn my-4 mt-8 flex w-full max-w-[320px] justify-center gap-2 bg-green-500 py-2 px-8 text-green-100 ${isSubmitting && 'loading'}`}
                        type="submit"
                        disabled={!matchLength(watchOtp[0])}>
                        {!isSubmitting &&
                            <>
                                <span className="text-center mt-0.5 mr-2">Bekræft</span>
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
                </form>
            </div>
        </div>
    )
}

export default DeviceVerify;