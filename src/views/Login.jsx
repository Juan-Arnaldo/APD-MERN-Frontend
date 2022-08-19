import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import useAuth from "../hooks/useAuth";
import Alert from "../components/Alert";

const login = () => {

  const [alert, setAlert] = useState({});
  const [user, setUser] = useState({
    email: '',
    password: ''
  })

  const {setAuth} = useAuth();
  const navigation = useNavigate();

  const validation = () => {
    const regex = /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i;

    if([user.email, user.password].includes('')){
      setAlert({msg: 'Todos los campos deben estar completos', error: true});
      return false;
    }

    if(!regex.test(user.email)){
      setAlert({msg: 'Ingrese un correo correctamente', error:true});
      return false;
    }

    setAlert({});
    return true;

  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    if(validation()){

      const url = `${import.meta.env.VITE_BACKEND_URL}/api/dentist/login`

      const data = {
        email: user.email,
        password: user.password,
      }
      
      await fetch(url, {
        method: "post",
        body: JSON.stringify(data),
        headers: {
          "content-type": "application/json",
        }
      })
      .then(res => {
        if(!res.ok){
          throw Error('El email o password son incorrectos');
        }
        return res.json()
      })
      .then(res => {
        localStorage.setItem('token', res.token);
        setAuth(res)

        setAlert({msg: res.msg, error: false});

        navigation('/admin');
      })
      .catch(err => {
        setAlert({msg: err.message, error: true});
      })

    }
  }

  return (
    <>
      <div className="shadow-lg p-3 rounded-xl bg-white h-min ">
        <div className="font-black text-5xl">
          <h1> Login</h1>
        </div>

        <Alert 
          alert={alert}  
        />

        <form action="" onSubmit={handleSubmit}>
          <div className="my-3">
            <label htmlFor="" className="block text-xl">
              Email
            </label>
            <input
              type="text"
              placeholder="Email"
              className="border w-full p-1 mt-1 rounded-xl"
              value={user.email}
              onChange={(e) => setUser({...user, email: e.target.value})}
            />
          </div>

          <div className="my-3">
            <label htmlFor="" className="block text-xl">
              Password
            </label>
            <input
              type="password"
              placeholder="Password"
              className="border w-full p-1 mt-1 rounded-xl"
              value={user.password}
              onChange={(e) => setUser({...user, password: e.target.value})}
            />
          </div>

          <input
            type="submit"
            value="Login"
            className=" border rounded-xl 
                        w-full py-2 px-12 mt-5 
                      bg-blue-600 hover:bg-blue-700 hover:cursor-pointer
                      text-white text-xl 
                        md:w-auto"
          />
        </form>

        <nav className="mt-5 lg:flex lg:justify-start gap-4">
          <Link className="block text-center my-3" to="/register">
            Register
          </Link>
          <Link className="block text-center my-3" to="/recover-pass">
            Recover Password
          </Link>
        </nav>
      </div>
    </>
  );
};

export default login;
