import { Footer } from "../components/Footers/footer";
import { ClaimBikeComponent } from "../components/MyBikes/ClaimBikeComponent";
import { BikeComponent } from "../components/MyBikes/BikeComponent";

const MineCykler = () => {
    return (
        <div className="max-w flex h-screen flex-col">
            <div className="flex h-full flex-col items-center justify-center rounded-lg bg-white shadow dark:bg-gray-800 sm:px-6 md:px-8 lg:px-10">
                {/* Conditionally render the ClaimBikeComponent or BikeComponent component */}
                {/* bikes.length > 0 ? */}
                {false ? <BikeComponent /> : <ClaimBikeComponent />}
            </div>
            <Footer />
        </div>
    );
};

export default MineCykler;
