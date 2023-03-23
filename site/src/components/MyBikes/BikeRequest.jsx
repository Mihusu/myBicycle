import React from "react";

export const BikeRequest = () => {

    return (
        <div className="flex justify-center bg-white rounded-lg mx-auto shadow dark:bg-gray-800 dark:text-white sm:px-3 md:px-8 lg:px-10 py-4" style={{ maxWidth: "425px" }}>
            <div className="flex flex-col items-center">
                <div className="mb-2 p-2 text-2xl mr-12">
                    Anmodning
                    <div className="space-y-2 py-4">
                        <h1 className="mb-2 text-xl">
                            <div className="ml-10">Name fetch</div>
                            <img src="image-url" alt="alt-text" className="inline-block h-4 w-4 mr-4 text-sm" />
                            <span className="text-sm ml-2">Du anmoder om overførsel af en cykel</span>
                            <div className="text-xs ml-10">Dato fetch</div>
                        </h1>
                    </div>
                </div>
                <div style={{ display: "flex", justifyContent: "center" }}>
                    <button className="btn flex w-44 max-w-xs justify-center bg-red-500 text-green-100" type="submit" onClick={() => declineBikeRequest()}>
                        Fortryd
                    </button>
                    <button className="btn flex w-44 max-w-xs justify-center bg-green-500 text-green-100" type="submit" onClick={() => acceptBikeRequest()}>
                        Åben
                    </button>
                </div>
            </div>
        </div>
    )
}