import React from 'react';
import { ClientsContainer } from '../components/ClientsContainer';
import FlyInSection from '../components/FlyInAnim';
import { AboutUs } from '../components/AboutUs';
import client from "../assets/images/client.jpg";
import HotelsSlider from "../components/FeaturedHotelsSlider";
import { Hero } from "../components/Hero";
import "../styles/HomePage.css";


export function HomePage() {
  
  return (
    <>
      <Hero />
      
      <FlyInSection>
        <AboutUs />
        <HotelsSlider />
        <ClientsContainer   client={client}  />
      </FlyInSection>
      
    </>
  );
}

