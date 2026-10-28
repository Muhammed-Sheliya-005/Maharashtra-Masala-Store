import { Outlet, useLocation } from "react-router-dom";

import Navbar from "./Navbar";
import UserNavbar from "./UserNavbar";
import Footer from "./Footer";

function CustomerLayout() {
  const location = useLocation();

  const user = JSON.parse(localStorage.getItem("user"));

  // These pages always use the public Home header
  const publicPages = [
    "/",
    "/signup",
    "/login",
    "/about",
    "/contact",
  ];

  const isPublicPage = publicPages.includes(location.pathname);

  // Logged-in user pages use UserNavbar
  const showUserNavbar = user && !isPublicPage;

  return (
    <div className="min-h-screen bg-white">

      {/* Header */}
      {showUserNavbar ? <UserNavbar /> : <Navbar />}

      <main>
        <Outlet />
      </main>

      <Footer />

    </div>
  );
}

export default CustomerLayout;