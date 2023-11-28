import HomeBanner from '../../../assets/banner-main.png';
const Banner = () => {
  return (
    <div className="hero min-h-[600px] bg-red-400">
      <div className="hero-content flex-col lg:flex-row-reverse">
        <div className='flex-1'>
          <img className="justify-end" src={HomeBanner} />
        </div>
        <div className='flex-1'>
          <h1 className="text-5xl font-bold text-white">Box Office News!</h1>
          <p className="py-6 text-white">Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem quasi. In deleniti eaque aut repudiandae et a id nisi.</p>
          <div className="join">
            <input className="input input-bordered join-item" placeholder="Email" />
            <button className="btn join-item rounded-r-full">Subscribe</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;