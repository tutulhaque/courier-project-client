import { FaShieldAlt, FaRocket, FaHandsWash  } from "react-icons/fa";



const Featured = () => {
    return (
        <div className="max-w-7xl mx-auto mt-20">
        <h1 className="text-5xl font-bold text-center">Our Courier Features</h1>
        <div className="py-20 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            <div className="card bg-base-100 shadow-2xl flex items-center">
                <div className="card-body">
                    <FaShieldAlt className="text-7xl text-red-600 mr-4" />
                    <div>
                        <h2 className="card-title">Parcel Safety</h2>
                        <p>Ensuring the secure and safe handling of parcels throughout the delivery process.</p>
                    </div>
                </div>
            </div>
            {/* 02 */}
            <div className="card bg-base-100 shadow-xl flex items-center">
                <div className="card-body">
                    <FaRocket  className="text-7xl text-red-600 mr-4" />
                    <div>
                        <h2 className="card-title">Super Fast Delivery</h2>
                        <p>Swift and efficient delivery services, ensuring your parcels reach their destination promptly.</p>
                    </div>
                </div>
            </div>
            {/* 03 */}
            <div className="card bg-base-100 shadow-xl flex items-center">
                <div className="card-body">
                    <FaHandsWash  className="text-7xl text-red-600 mr-4" />
                    <div>
                        <h2 className="card-title">Contactless Delivery</h2>
                        <p>Ensuring safety by delivering parcels direct contact, providing a secure and convenient experience.</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
    );
};

export default Featured;