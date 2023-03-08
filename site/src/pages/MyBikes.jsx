import { Footer } from "../components/Footers/footer";
import { ClaimBikeComponent } from "../components/MyBikes/ClaimBikeComponent";
import { BikeComponent } from "../components/MyBikes/BikeComponent";

const MineCykler = () => {

    return (
        <div className="flex flex-col h-screen max-w">
            <div className="flex flex-col h-full items-center justify-center bg-white rounded-lg shadow dark:bg-gray-800 sm:px-6 md:px-8 lg:px-10">
                {/* Conditionally render the ClaimBikeComponent or BikeComponent component */}
                {/* bikes.length > 0 ? */}
                { false ?
                    <BikeComponent />
                    :
                    <ClaimBikeComponent />
                }
            </div>
            <Footer />
        </div>
    );
};

export default MineCykler;
