import React, { useContext } from 'react';
import Loading from '../../../components/Loading/Loading';
import { AuthContext } from '../../../Context/AuthProvider';
import useTitle from '../../../Hooks/useTitle';
import AdvertismentItems from '../AdvertismentItem/AdvertismentItems';
import Banner from '../Banner/Banner';
import Categories from '../Categories/Categories';
import FAQ from '../FAQ/FAQ';

const Home = () => {
  const {loading} = useContext(AuthContext)
  useTitle('Home')
  if(loading){
    return  <div className=" my-5 mx-auto w-16 h-16 border-4 border-dashed rounded-full animate-spin dark:border-violet-400"></div> 
}
    return (
        <div>
          <Banner></Banner> 
          <Categories></Categories> 
          <AdvertismentItems></AdvertismentItems>
          <FAQ></FAQ>
        </div>
    );
};

export default Home;