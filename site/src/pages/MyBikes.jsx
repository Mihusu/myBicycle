import { Footer } from "../components/Footers/footer";
import { ClaimBikeComponent } from "../components/MyBikes/ClaimBikeComponent";
import { BikeComponent } from "../components/MyBikes/BikeComponent";
import useSWR from 'swr'

const MineCykler = () => {

    const fetcher = (...args) => fetch(...args).then(res => res.json())
    const { data, error, isLoading } = useSWR('http://127.0.0.1:8000/bikes/me', fetcher)

    if (error) return <div>failed to load</div>
    if (isLoading) return <div>loading...</div>

    console.log(data)

    // render data
    return (
        <div className="max-w flex h-screen flex-col">
            <div className="flex h-full flex-col items-center justify-center rounded-lg bg-white shadow dark:bg-gray-800 sm:px-6 md:px-8 lg:px-10">
                {/* Conditionally render the ClaimBikeComponent or BikeComponent component */}
                { data > 0 ? <BikeComponent /> : <ClaimBikeComponent />}
            </div>
            <Footer />
        </div>
    );
};

export default MineCykler;
