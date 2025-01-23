import { Footer } from "./components/Footer";
import { Navigation, MenuProvider } from "./components/Navigation";
import MobileMenu from "./components/MobileMenu";
import { Outlet } from "react-router-dom";
import './App.css';

const App = () => {
  return (
    <MenuProvider>
      <Navigation />
      <MobileMenu />
      <Outlet />
      <section>
        <Footer />
      </section>
    </MenuProvider>
  );
};

export default App;