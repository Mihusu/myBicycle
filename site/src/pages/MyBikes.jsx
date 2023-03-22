import { Footer } from "../components/Footers/footer";
import { ClaimBikeComponent } from "../components/MyBikes/ClaimBikeComponent";
import { BikeComponent } from "../components/MyBikes/BikeComponent";
import useSWR from 'swr'
import secureLocalStorage from "react-secure-storage";
import { Layout } from "../components/Layout/Layout";

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

        <Layout title="Mine cykler">
            <div className="flex-col">

                {/* Conditionally render the ClaimBikeComponent or BikeComponent component */}
                {data.length > 0 ?
                    <>
                        {data.map((bike_info, key) =>
                            <BikeComponent data={bike_info} key={key} />
                        )}
                    </>
                    :
                    <ClaimBikeComponent />}
            </div>

        </Layout>
    );
};

export default MyBikes;
