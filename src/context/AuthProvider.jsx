import { useEffect, useState, createContext } from "react";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({});

  useEffect(() => {
    const authUser = async () => {
      const token = localStorage.getItem('token');

      if(!token) return

      const url = `${import.meta.env.VITE_BACKEND_URL}/api/dentist/profile`

      await fetch(url, {
        method: 'get',
        headers: {
          'Content-Type': 'application/app',
          authorization: `Bearer ${token}`
        }
      })
      .then(res => res.json())
      .then(res => {
        setAuth(res);
      })
      .catch(err => {
        console.log(err);
        setAuth({})
      })
      
    }

    authUser()
  })

  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthProvider };

export default AuthContext;
