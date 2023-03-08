import React, { useState, useEffect, useContext } from 'react'
import { Navigate, useParams } from 'react-router-dom'

// Contexts
import { ApiContext } from '../contexts/apiContext';
//import { RefreshContext } from '../contexts/refreshContext';

// Components
import { SuccessToast, ErrorToast } from '../components/global/PushToast';

const ClaimBikePage = () => {

    let params = useParams();
    const API_BASE = useContext(ApiContext);
    const [updated, setUpdated] = useState(false);
    const [apiLink] = useState(`${API_BASE}/claim/${params.id}`);
    //const [claim, setClaim] = useState([]);
    //<     const [cancel, setCancel] = useState(false);
    //const [loading, setLoading] = useState(true);

    // Fetch data from API
    useEffect(() => {
        let isComponentMounted = true;
        //setLoading(true);
        const fetchData = async () => {
            const response = await fetch(apiLink);

            const responseJson = await response.json();

            if (isComponentMounted) {
                setClaim(responseJson)
                //setLoading(false);
            }
        };
        fetchData();
        return () => {
            setUpdated(false);
            isComponentMounted = false;
        }
    }, [apiLink, updated]);

    const handleRedeemClick = () => {
        fetch(apiLink + "/claim/{claim_token}", {
            method: "post"
        }).then(response => {
            if (response.ok) {
                SuccessToast("Redeemed bike")
                setUpdated(true);
            } else { ErrorToast("Bike couldn't be redeemed") }
        })
    }

    // const handleCancelClick = () => {

    //     fetch(apiLink + "/cancel", {
    //         method: "post"
    //     }).then(response => {
    //         if (response.ok) {
    //             SuccessToast("Redeem cancelled")
    //             setUpdated(true);
    //             setCancel(true);
    //         } else { ErrorToast("Redeem couldn't be cancelled") }
    //     })

    // }

    if (cancel) {
        return <Navigate to="/claim" />
    }

    //if (loading) {
    //    return (
    //        <StyledContainer>
    //          <p>Loading...</p>
    //    </StyledContainer>
    //)
    //} else {
    return (
        //<RefreshContext.Provider value={setUpdated}>
        //{claim.state === "UNCLAIMED" &&
        <div className="flex flex-col items-center justify-center my-32">
            <div className=" px-4 py-8 bg-white rounded-lg shadow dark:bg-gray-800 sm:px-6 md:px-8 lg:px-10 md:w-auto">
                <div className="self-center text-xl font-light text-gray-800 sm:text-2xl dark:text-white">
                    Indløs cykel
                </div>
                <form action="#" className='p-6 mt-8'>
                    <div className='space-y-2'>
                        <label className="font-light text-gray-800 dark:text-white">
                            Engangskode:
                            <span className="text-red-500 required-dot"> *</span>
                        </label>
                        <input
                            type="text"
                            id="required-engangskode"
                            className="rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                            name="FrameNumber"
                            placeholder="Indtast engangskode"
                        />
                    </div>
                    <button type="button" className="mt-8 py-2 px-4 flex justify-center items-center bg-blue-600 hover:bg-orange-700 
                                    focus:ring-red-500 focus:ring-offset-red-200 text-white w-full transition ease-in duration-200 text-center 
                                    text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-lg " onClick={() => handleRedeemClick()}>
                        Indløs
                    </button>
                </form>
            </div>
        </div>
        //}
        //</RefreshContext.Provider>
    )
    //}
}

export default ClaimBikePage;