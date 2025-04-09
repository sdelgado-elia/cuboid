import React from 'react';
import '../style/Home.css'
import Navbar from './Navbar'; 
import Footer from './Footer';

const Home = () => {
  return (
    <div>
      <Navbar />
      <div class="cube_home">
          <div class="face front"></div>
          <div class="face right"></div>
          <div class="face top"></div>
        </div>
        <div class="cube_home2">
          <div class="face front"></div>
          <div class="face right"></div>
          <div class="face top"></div>
        </div>
        <div class="cube_home3">
          <div class="face front"></div>
          <div class="face right"></div>
          <div class="face top"></div>
        </div>
        <div class="cube_home4">
          <div class="face front"></div>
          <div class="face right"></div>
          <div class="face top"></div>
        </div>
        <div class="cube_home5">
          <div class="face front"></div>
          <div class="face right"></div>
          <div class="face top"></div>
        </div>
      <h1>Welcome to Cuboid</h1>
      <p>The app to manage, analyse and simulate the future for your business!</p>

      {/* Más contenido para hacer scroll */}
      <section>
        <h2>About Cuboid</h2>
        <p>
          Cuboid is an innovative platform designed to help businesses plan and analyze future outcomes with powerful data management and simulation tools.
        </p>
        <p>
          Our platform provides real-time insights and predictive analytics to drive business decisions. It's easy to integrate, intuitive to use, and scalable for all types of organizations.
        </p>
        <p>
          Whether you're in manufacturing, retail, or any other industry, Cuboid can help you optimize your operations and improve your forecasting.
        </p>
        <h3>Key Features:</h3>
        <ul>
          <li>Real-time data analysis</li>
          <li>Easy-to-use dashboard</li>
          <li>Powerful forecasting and simulation tools</li>
          <li>Seamless integration with existing systems</li>
        </ul>
      </section>

      <section>
        <h2>Get Started</h2>
        <p>
          Getting started with Cuboid is simple! Sign up today and start exploring all of the features that can help your business thrive.
        </p>
        <p>
          If you need help, our support team is here 24/7 to assist you with any questions you may have.
        </p>
      </section>

      {/* Este es el footer que quedará al final de la página */}
      <Footer />
    </div>
  );
};

export default Home;