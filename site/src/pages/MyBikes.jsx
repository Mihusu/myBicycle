import { Footer } from "../components/Footers/footer";
import { ClaimBikeComponent } from "../components/MyBikes/ClaimBikeComponent";
import { BikeComponent } from "../components/MyBikes/BikeComponent";
import useSWR from 'swr'
import secureLocalStorage from "react-secure-storage";

const API_URL = import.meta.env.VITE_API_URL

const get_my_bikes = async (url, token) => {

    console.log(url, token);

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

    const { data, error, isLoading } = useSWR([API_URL + '/bikes/me', token], ([url, token]) => get_my_bikes(url, token))

    console.log(data);
    if (error) return <div>failed to load, due to error {error}</div>
    if (isLoading) return <div>loading...</div>

    console.log(data)

    // render data
    return (
        <div className="max-w flex h-screen flex-col">
            <div className="flex flex-col items-center justify-center h-full rounded-lg bg-white shadow dark:bg-gray-800 sm:px-6 md:px-8 lg:px-10">
                {/* Conditionally render the ClaimBikeComponent or BikeComponent component */}
                { data.length > 0 ? 
                    <>
                        {data.map((bike_info, key) => 
                            <BikeComponent data={bike_info} key={key} /> 
                        )}
                    </>
                    : 
                    <ClaimBikeComponent />}
            </div>
            <Footer />
        </div>
    );
};

export default MyBikes;
