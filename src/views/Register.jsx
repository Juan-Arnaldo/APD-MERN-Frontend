import { Link } from "react-router-dom";
import { useState } from "react";
import Alert from "../components/Alert";

const Register = () => {
  const [user, setUser] = useState({
    name: "",
    email: "",
    phone: "",
    pass: "",
    repPass: "",
  });

  const [alert, setAlert] = useState({});

  const validation = () => {
    const regex = /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i;

    if ([user.name, user.email, user.pass, user.repPass].includes("")) {
      setAlert({ msg: "Campos Vacios", error: true });
      return false;
    }

    if (!regex.test(user.email)) {
      setAlert({ msg: "Invalido el formato del email", error: true });
      return false;
    }

    if (user.pass !== user.repPass) {
      setAlert({ msg: "son diferentes las pass", error: true });
      return false;
    }

    if (user.pass.length < 8) {
      setAlert({ msg: "El pass es demasiado corto", error: true });
      return false;
    }

    setAlert({});
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    validation();

    if (validation()) {
      const url = `${import.meta.env.VITE_BACKEND_URL}/api/dentist`;
      const data = {
        name: user.name,
        email: user.email,
        password: user.pass,
      };

      await fetch(url, {
        method: "post",
        body: JSON.stringify(data),
        headers: {
          "content-type": "application/json",
        },
      })
        .then((res) => {

          if (!res.ok) {
            throw Error("El usuario ya esta registrado");
          }
          return res.json();
        })
        .then((res) => {
          setAlert({
            msg: res.msg,
            error: false,
          });
        })
        .catch((error) => {
          setAlert({
            msg: error.message,
            error: true,
          });
        });
    }
  };

  return (
    <>
      <div className="shadow-lg shadow-gray-400 p-3 rounded-xl bg-white">
        <h1 className="font-black text-5xl">Register</h1>

        <Alert alert={alert} />

        <form onSubmit={handleSubmit}>
          <div className="my-3">
            <label htmlFor="" className="block text-xl">
              Name
            </label>
            <input
              type="text"
              placeholder="Name"
              className="border w-full p-1 mt-1 rounded-xl"
              onChange={(e) => setUser({ ...user, name: e.target.value })}
            />
          </div>

          <div className="my-3">
            <label htmlFor="" className="block text-xl">
              Email
            </label>
            <input
              type="text"
              placeholder="Email"
              className="border w-full p-1 mt-1 rounded-xl"
              onChange={(e) => setUser({ ...user, email: e.target.value })}
            />
          </div>

          <div className="my-3">
            <label htmlFor="" className="block text-xl">
              Phone
            </label>
            <input
              type="text"
              placeholder="Phone"
              className="border w-full p-1 mt-1 rounded-xl"
              onChange={(e) => setUser({ ...user, phone: e.target.value })}
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
              onChange={(e) => setUser({ ...user, pass: e.target.value })}
            />
          </div>

          <div className="my-3">
            <label htmlFor="" className="block text-xl">
              Repeat Password
            </label>
            <input
              type="password"
              placeholder="Password"
              className="border w-full p-1 mt-1 rounded-xl"
              onChange={(e) => setUser({ ...user, repPass: e.target.value })}
            />
          </div>

          <input
            type="submit"
            value="Register"
            className=" border rounded-xl 
                        w-full py-2 px-12 mt-5 
                      bg-blue-600 hover:bg-blue-700 hover:cursor-pointer
                      text-white text-xl 
                        md:w-auto"
          />
        </form>

        <nav className="mt-5 lg:flex lg:justify-start gap-4">
          <Link className="block text-center my-3" to="/">
            Do you have an account?
          </Link>
        </nav>
      </div>
    </>
  );
};

export default Register;
