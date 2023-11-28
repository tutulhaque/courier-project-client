import { Helmet } from "react-helmet-async";
import Banner from "../Banner/Banner";
import Featured from "../Featured/Featured";
import Testimonials from "../Testimonials/Testimonials";
import DeliveryMen from "../DeliveryMen/DeliveryMen";
import Statistics from "../Statistics/Statistics";

const Home = () => {
    return (
        <div>
            <Helmet>
                <title>PH Courier| Home</title>
            </Helmet>
            <Banner></Banner>
            <Featured></Featured>
            <Statistics></Statistics>
            <DeliveryMen></DeliveryMen>
            <Testimonials></Testimonials>
        </div>
    );
};

export default Home;