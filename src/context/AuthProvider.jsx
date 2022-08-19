import { useEffect, useState, createContext } from "react";
const AuthContext = createContext();

const AuthProvider = ({ children }) => {

  const [auth, setAuth] = useState({});
  console.log(auth);

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
        console.log(res); 
        console.log(auth)
      })
      .catch(err => {
        console.log(err);
        setAuth({})
      })
      
    }

    authUser()
  }, [])

  const logOut = () => {
    localStorage.removeItem('token');
    setAuth({})
  }


  return (
    <AuthContext.Provider value={{ auth, setAuth, logOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthProvider };

export default AuthContext;
