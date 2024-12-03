import { Footer } from "./components/Footer";
import { Navigation } from "./components/Navigation";
import { Outlet } from "react-router-dom";
import { useState } from 'react'
//import reactLogo from './assets/react.svg'
//import viteLogo from '/vite.svg'
import './App.css'
import ModDash from './pages/ModDash'

const App = () => {
  return (
    <>
      <Navigation />
      <Outlet />
      <section>
        <Footer />
      </section>
    </>
  );
};

export default App;
