import { useEffect, useState, createContext } from "react";
const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({});
  const token = localStorage.getItem("token");

  useEffect(() => {
    const authUser = async () => {
      
      if (!token) return;

      const url = `${import.meta.env.VITE_BACKEND_URL}/api/dentist/profile`;

      await fetch(url, {
        method: "get",
        headers: {
          "Content-Type": "application/app",
          authorization: `Bearer ${token}`,
        },
      })
        .then((res) => res.json())
        .then((res) => {
          setAuth(res);
        })
        .catch((err) => {
          console.log(err);
          setAuth({});
        });
    };

    authUser();
  }, []);

  const logOut = () => {
    localStorage.removeItem("token");
    setAuth(null);
  };

  return (
    <>
        <AuthContext.Provider value={{ auth, setAuth, logOut, token }}>
          {children}
        </AuthContext.Provider>
    </>
  );
};

export { AuthProvider };

export default AuthContext;
