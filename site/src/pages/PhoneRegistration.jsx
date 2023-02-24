import React, { useState, useEffect, useContext } from 'react'
import { Navigate, useParams } from 'react-router-dom'

const PhoneRegistration = () => {
    return (
        <div className="flex flex-col items-center justify-center my-16">
            <div className=" px-4 py-8 bg-white rounded-lg shadow dark:bg-gray-800 sm:px-6 md:px-8 lg:px-20 md:w-auto">
                <div className="py-2 self-center text-xl font-light text-gray-800 sm:text-2xl dark:text-white">
                    Tlf nr.
                    <span className="text-red-500 required-dot"> *</span>
                </div>
                <label className="font-light text-gray-800 dark:text-white">
                </label>
                <input
                    type="text"
                    id="required-phoneNumber"
                    className=" rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-10 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                    name="FrameNumber"
                    placeholder="Indtast telefonnummer"
                />
                <div className="py-2 self-center text-xl font-light text-gray-800 sm:text-2xl dark:text-white">
                    Kode:
                    <span className="text-red-500 required-dot"> *</span>
                </div>  
                <label className="py-4 font-light text-gray-800 dark:text-white">
                </label>
                <input
                    type="text"
                    id="required-phoneNumber"
                    className="rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-10 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                    name="FrameNumber"
                    placeholder="Indtast telefonnummer"
                />
                <button type="button" className="gap-2 mt-8 py-2 px-4 flex justify-center bg-blue-600 hover:bg-orange-700 
                    focus:ring-red-500 focus:ring-offset-red-200 text-white w-full transition ease-in duration-200 text-center 
                    text-xl font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-lg " onClick={() => handleRedeemClick()}>
                    Send
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3" />
                    </svg>
                </button>
            </div>
        </div>
    )
}

export default PhoneRegistration;
