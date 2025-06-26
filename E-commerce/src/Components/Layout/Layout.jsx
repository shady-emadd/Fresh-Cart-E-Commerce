import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import { Outlet } from "react-router-dom";

export default function Layout() {
  return (
    <>
      <Navbar />
      <div className="container m-auto pb-[300px] pt-[50px]">
        <Outlet />
      </div>
      <Footer />
    </>
  );
}
