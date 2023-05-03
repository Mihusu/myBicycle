import React, { useState, useEffect } from "react";
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

export const LoginPage = () => {

    const [error, setError] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [cdSeconds, setCdSeconds] = useState(0);
    const [cooldownStarted, setCooldownStarted] = useState(false);

    const {
        register,
        control,
        handleSubmit,
    } = useForm();

    const navigate = useNavigate();

    useEffect(() => {
        if (cdSeconds > 0 && cooldownStarted) {
            setTimeout(() => setCdSeconds(cdSeconds - 1), 1000);
        }
        else {
            setCooldownStarted(false)
        }

    }, [cdSeconds])

    const onAuthOkay = async (body) => {
        const { user_id, phone_number } = await get_user_details(API_URL + `/owners/me`, body.access_token);

        secureLocalStorage.setItem('accesstoken', body.access_token);
        secureLocalStorage.setItem('user_id', user_id);
        secureLocalStorage.setItem('phone_number', phone_number);

        navigate(`/mybikes`, { replace: true });
    };

    const onUnknownDevice = (error) => {
        // Navigate to device verification page
        navigate('/deviceverify/' + error.detail.session_id);
    };

    const onInvalidCredentials = (error) => {
        const TOTAL_ATTEMPTS_BEFORE_BLACKLIST = 7
        const TOTAL_ATTEMPTS_BEFORE_COOLDOWN = 3;

        const { attempts_left: attemptsLeftBeforeBlacklist } = error.detail;

        const attemptsLeftBeforeCooldown = TOTAL_ATTEMPTS_BEFORE_COOLDOWN - (TOTAL_ATTEMPTS_BEFORE_BLACKLIST - attemptsLeftBeforeBlacklist)
        setError(`Ugyldigt brugernavn eller adgangskode. Forsøg tilbage før nødkøling: ${attemptsLeftBeforeCooldown}`);
    };

    const onUserNotFound = (error) => {
        setError("Bruger med givent telefonummer er ikke registreret");
    };

    const onBlacklisted = (error) => {
        setError("Du har skrevet din adgangskode forkert ind for mange gange. Adgang fra denne enhed er blevet blokeret");
    };

    const onCooldownPenalty = (error) => {
        const { cooldown_expires_at } = error.detail;

        setError("Du har skrevet din adgangskode forkert ind for mange gange");

        const timeDeltaSeconds = Math.floor((new Date(cooldown_expires_at).getTime() - Date.now()) / 1000);

        if (!cooldownStarted) {
            setCdSeconds(timeDeltaSeconds);
            setCooldownStarted(true);
        }

    };

    const tooEarlySmsRequest = (error) => {
        const { cooldown_expires_at } = error.detail;

        setError("Du har for nyligt forsøgt at logge ind på en ukendt enhed");

        const timeDeltaSeconds = Math.floor((new Date(cooldown_expires_at).getTime() - Date.now()) / 1000);

        if (!cooldownStarted) {
            setCdSeconds(timeDeltaSeconds);
            setCooldownStarted(true);
        }
    }

    const onSubmit = async (data) => {
        setIsSubmitting(true);

        const response = await fetch(API_URL + '/auth/token', {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        })

        const result = await response.json()

        switch (response.status) {
            case 200: await onAuthOkay(result); break;
            case 307: onUnknownDevice(result); break;
            case 401: onInvalidCredentials(result); break;
            case 404: onUserNotFound(result); break;
            case 423: onBlacklisted(result); break;
            case 425: tooEarlySmsRequest(result); break;
            case 429: onCooldownPenalty(result); break;
        }

        setIsSubmitting(false);
    }

    return (
        <div className="grid h-screen place-items-center p-4 max-w-[385px] mx-auto">
            <div className="bg-white rounded-lg shadow dark:bg-gray-800">
                {/* Use a form element to wrap the inputs and button */}
                <form
                    className="rounded-lg bg-white py-6 px-10 dark:bg-gray-800"
                    onSubmit={handleSubmit(onSubmit)}
                >
                    {/* Use input elements for phoneNumber and password */}
                    <h1 className="flex justify-center text-3xl mb-4">Login</h1>
                    {/* Errors */}
                    {error &&
                        <div className="p-4 my-4 rounded-lg bg-error text-white">
                            {error}
                            {/* Cooldown */}
                            {cdSeconds > 0 && (
                                <p>
                                    Prøv igen om:{" "}
                                    {cdSeconds === 1
                                        ? `${cdSeconds} sekund`
                                        : cdSeconds < 60
                                            ? `${cdSeconds} sekunder`
                                            : cdSeconds === 61
                                                ? `1 minut og 1 sekund`
                                                : cdSeconds < 120
                                                    ? `1 minut og ${cdSeconds % 60} sekunder`
                                                    : `${Number.parseInt(cdSeconds / 60)} minutter og ${cdSeconds % 60} sekund${cdSeconds % 60 === 1 ? "" : "er"}`}
                                </p>
                            )}
                        </div>
                    }
                    <div className="pb-2 font-light text-xl text-gray-800 dark:text-white" >
                        Tlf nr.
                        <span className="required-dot text-red-500"> *</span>
                    </div>

                    <div className="flex flex-col space-y-2 max-w-xs">
                        <PhoneNumber
                            name="phone_number"
                            control={control}
                            rules={{ required: true }}
                        />

                        <div className='space-y-2 py-4'>
                            <label className="font-light text-gray-800 dark:text-white">
                                Adgangskode:
                                <span className="text-red-500 required-dot"> *</span>
                            </label>
                            <input
                                type="password"
                                className="rounded-lg border-transparent flex-1 border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                                placeholder="Adgangskode"
                                {...register('password')}
                            />
                        </div>
                    </div>

                    <div className="flex flex-col justify-center items-center space-y-2">

                        <button type="submit" className={`btn my-2 mt-8 w-full bg-green-500 py-2 text-green-100 ${isSubmitting && 'loading'}`} >
                            {!isSubmitting &&
                                <>
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
                                </>
                            }
                        </button>

                        <p>Har du ikke registreret dig som bruger? <Link to='/registration'><span className="text-blue-500">Registrer her</span></Link></p>
                        <p>
                            Har du glemt dit kodeord?{" "}
                            <Link to="/resetpassword">
                                <span className="text-blue-500">Nulstil dit kodeord her</span>
                            </Link>
                        </p>
                    </div>
                </form>
            </div>
        </div>
    );
}
