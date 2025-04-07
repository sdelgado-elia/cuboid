import React from 'react';
import '../style/Home.css'
import Navbar from './Navbar'; 
import Footer from './Footer';

const Home = () => {
  return (
    <div >
    <Navbar/>
      <h1>Welcome to Cuboid</h1>
      <p>The app to manage, analyse and simulte the future for your bussiness!</p>
    <Footer/>
    </div>
  );
};

export default Home;
