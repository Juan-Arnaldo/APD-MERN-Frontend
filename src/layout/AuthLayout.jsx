import { Outlet } from "react-router-dom";
const AuthLayout = () => {
  return (
    <>
      <main className=" container mx-auto h-screen md:grid md:grid-cols-2 content-center gap-64 items-center">
        <Outlet />
      </main>
    </>
  );
};

export default AuthLayout;
