import { useState } from "react";
import { Link } from "react-router-dom";
import Alert from "../components/Alert";

const RecoverPass = () => {
  const [email, setEmail] = useState('')
  const [alert, setAlert] = useState({})

  const validation = () => {
    const regex = /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i;

    if(email === '' || !regex.test(email)){
      setAlert({msg: 'Ingrese un email correctamente', error: true})
      return false
    }

    setAlert({})
    return true;
  }

  const handleSubmit = async e => {
    e.preventDefault();
    if(validation()){

      const url = `${import.meta.env.VITE_BACKEND_URL}/api/dentist/recover-password`
      const data = {
        email: email
      }

      await fetch(url,{
        method: 'post',
        body: JSON.stringify(data),
        headers: {
          "content-type": "application/json",
        },
      })
      .then(res => {
        if(!res.ok){
          throw Error('El usuario no existe');
        }
        return res.json();
      })
      .then(res => {
        setAlert({msg: res.msg, error: false})
      })
      .catch((error) => {
        setAlert({msg: error.message, error: true})
      })
    }

  }


  return (
    <>
      <div className="shadow-lg p-3 rounded-xl bg-white h-min ">
        <div className="font-black text-5xl">
          <h1> Recover Password</h1>
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
              value={email}
              onChange={e => setEmail(e.target.value)}
            />
          </div>

          <input
            type="submit"
            value="Send Instructions"
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
          <Link className="block text-center my-3" to="/">
            Do you have an account?
          </Link>
        </nav>
      </div>
    </>
  );
};

export default RecoverPass;
