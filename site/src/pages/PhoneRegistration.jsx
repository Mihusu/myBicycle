import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { PhoneNumber } from '../components/register/PhoneNumber';

const PhoneRegistration = () => {

    const { register, control, watch, handleSubmit,  formState: { isDirty, dirtyFields, touchedFields } } = useForm(
        {
        defaultValues: {
            phone_number: '',
            password: '',
            verify: ''
            
        }
    }
    )

    const URI = "http://127.0.0.1:8000/auth/register/me";

    const watchPassword = watch(["password", 'verify']);

    const onSubmit = data => {
        console.log("submit");  
        fetch(URI)
    
    }

    // checks whether password matches verification
    function matchPassword(password, verify) {

        if (password.length == 0 || verify.length == 0) {
            return false
        }

        if (password.length >= 8 && password == verify) {
            return true
        } else
            return false

    }

    return (
        <div className="flex flex-col items-center justify-center my-16">
            <form className='w-full flex items-center self-center justify-center lg:w-1/3 md:w-1/2' onSubmit={handleSubmit(onSubmit)}>
                <div className=" px-4 py-8 bg-white rounded-lg shadow dark:bg-gray-800 sm:px-6 md:px-8 lg:px-20 md:w-auto">
                    <div className="py-2 self-center text-xl font-light text-gray-800 sm:text-2xl dark:text-white">
                        Tlf nr.
                        <span className="text-red-500 required-dot"> *</span>
                    </div>
                    <label className="font-light text-gray-800 dark:text-white">
                    </label>
                    <div className='form-control w-full max-w-xs'>< PhoneNumber control={control} {...register('phone_number', { required: true })} type="number" /><div />
                        <div className="pt-4 pb-2 font-light text-gray-800 dark:text-white">
                            Vælg adgangskode
                            <span className="text-red-500 required-dot"> *</span>
                        </div>

                        {/* password */}
                        <div className="">

                            <input type="text" pattern='\d*'
                                {...register('password', { required: true }, { min: 8, max: 32 })}
                                name="password"
                                
                                placeholder="Adgangskode"
                                className="rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent" />

                        </div>

                        {/* verify */}
                        <div className="pt-4 pb-2">
                            <label className="label">
                                <span className="font-light text-gray-800 dark:text-white">Bekræft kode</span>
                            </label>
                            <input type="text"
                            {...register('verify', { required: true }, { min: 8, max: 32 })}
                            name="verify"
                                
                                placeholder="Adgangskode"
                                className="rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent" />
                        </div>
                        <button type="submit" disabled={
                            !matchPassword(watchPassword[0], watchPassword[1])
                        }
                            className="gap-2 mt-8 py-2 px-4 flex justify-center btn text-green-100 my-2 w-full max-w-xs bg-green-500 " onClick={() => onSubmit()}>
                            Registrer
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3" />
                            </svg>
                        </button>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default PhoneRegistration;
