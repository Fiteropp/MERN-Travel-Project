import { Footer } from "./components/Footer";
import { Navigation, MenuProvider } from "./components/Navigation";
import { AlertProvider } from "./contexts/AlertContext";
import { UserProvider } from "./contexts/UserContext";
import MobileMenu from "./components/MobileMenu";
import { Outlet } from "react-router-dom";
import './App.css';

const App = () => {
  return (
    <UserProvider>
      <MenuProvider>
        <AlertProvider>
          <Navigation />
          <MobileMenu />
          <Outlet />
          <section>
            <Footer />
          </section>
        </AlertProvider>
      </MenuProvider>
    </UserProvider>
    
  );
};

export default App;