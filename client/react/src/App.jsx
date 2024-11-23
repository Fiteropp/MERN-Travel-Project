import { Footer } from "./components/Footer";
import { Navigation } from "./components/Navigation";
import { Outlet } from "react-router-dom";

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
