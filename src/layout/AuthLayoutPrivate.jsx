import { Outlet, Navigate } from "react-router-dom";
import Footer from "../components/Footer";
import Header from "../components/Header";
import useAuth from "../hooks/useAuth";

const AuthLayoutPrivate = () => {
  const { auth, token } = useAuth();

  return (
    <>
      <div className="container flex flex-col justify-between max-w-full min-h-screen">
        <div>
          <Header />
        </div>

        <div>
          {auth && token ? (
            <main className="container mx-auto">
              <Outlet />
            </main>
          ) : (
            <Navigate to="/" />
          )}
        </div>

        <div className="2xl:mb-10">
          <Footer />
        </div>
      </div>
    </>
  );
};

export default AuthLayoutPrivate;
