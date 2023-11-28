import { Link } from "react-router-dom";
import img404 from '../../assets/404.gif'
import { Helmet } from "react-helmet-async";


const Error = () => {
    return (
        <div>
            <Helmet>
                <title>Error</title>
            </Helmet>
            <div className="h-screen py-28">
                <div className="flex justify-center items-center">
                    <img className="w-96" src={img404} alt="" />
                </div>
                <div className="flex justify-center items-center py-8">
                    <Link to='/'><button className="btn btn-neutral text-white">Back To Home</button></Link>
                </div>
            </div>
        </div>

    );
};

export default Error;