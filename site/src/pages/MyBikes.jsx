import useSWR from 'swr'
import secureLocalStorage from "react-secure-storage";

import { ClaimBikeComponent } from "../components/MyBikes/ClaimBikeComponent";
import { BikeComponent } from "../components/MyBikes/BikeComponent";
import { Layout } from "../components/Layout/Layout";


const API_URL = import.meta.env.VITE_API_URL


const get_my_bikes = async (url, token) => {

    const response = await fetch(url, {
        method: 'GET',
        headers: {
            'Authorization': 'Bearer ' + token
        }
    })

    return await response.json()
}

const MyBikes = () => {

    const token = secureLocalStorage.getItem('accesstoken')

    const { data, error, isLoading, mutate } = useSWR(
        [API_URL + '/bikes/me', token], 
        ([url, token]) => get_my_bikes(url, token),
        { refreshInterval: 5000 }
        );

    if (error) return <div>failed to load, due to error {error}</div>

    // render data
    return (

        <Layout title="Mine cykler" isLoading={isLoading}>
            <div className="flex-col mb-24">

                {/* Conditionally render the ClaimBikeComponent or BikeComponent component */}
                {data && data.length > 0 ?
                
                    data.map((bike_info, key) =>
                        <BikeComponent data={bike_info} mutate={mutate} key={key} />
                    )
                    :
                    <ClaimBikeComponent />}
            </div>

        </Layout>
    );
};

export default MyBikes;
