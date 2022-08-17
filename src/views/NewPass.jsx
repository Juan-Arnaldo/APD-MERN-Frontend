import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import Alert from "../components/Alert";

const NewPass = () => {
  const params = useParams();
  const { token } = params;

  const [user, setUser] = useState({
    password: "",
    repeatPass: "",
  });
  const [alert, setAlert] = useState({});
  const [validate, setValidate] = useState(false);
  const [login, setLogin] = useState(false);

  const validation = () => {
    if (user.password !== user.repeatPass) {
      setAlert({ msg: "Las passwords son diferentes", error: true });
      return false;
    }

    if (user.password.length < 8) {
      setAlert({ msg: "El password es demasiado corto", error: true });
      return false;
    }

    setAlert({});
    return true;
  };

  useEffect(() => {
    const checkToken = async () => {
      const url = `${
        import.meta.env.VITE_BACKEND_URL
      }/api/dentist/recover-password/${token}`;

      await fetch(url)
        .then((res) => {

          if (!res.ok) {
            throw Error("Token no valido, error en el enlace");
          }
          setValidate(true);
          return res.json();
        })
        .then((res) => {
          setAlert({ msg: "Ingrese su nueva password", error: false });
        })
        .catch((error) => {
          setAlert({ msg: error.message, error: true });
        });
    };

    checkToken();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const url = `${
      import.meta.env.VITE_BACKEND_URL
    }/api/dentist/recover-password/${token}`;

    if (validation()) {

      const data = {
        pass: user.password,
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
            throw Error("Error al cambiar la pass");
          }
          setValidate(false);
          setLogin(true);
          return res.json();
        })
        .then((res) => {
          setAlert({ msg: res.msg, error: false });
        })
        .catch((error) => {
          setAlert({ msg: error.message, error: true });
        });
    }
  };

  return (
    <>
      <div className="shadow-lg p-3 rounded-xl bg-white h-min ">
        <Alert alert={alert} />

        {validate && (
          <form action="" onSubmit={handleSubmit}>
            <div className="my-3">
              <input
                type="password"
                placeholder="New Password"
                className="border w-full p-1 mt-1 rounded-xl"
                onChange={(e) => setUser({ ...user, password: e.target.value })}
              />
            </div>

            <div className="my-3">
              <input
                type="password"
                placeholder="Repeat Password"
                className="border w-full p-1 mt-1 rounded-xl"
                onChange={(e) =>
                  setUser({ ...user, repeatPass: e.target.value })
                }
              />
            </div>

            <input
              type="submit"
              value="Submit"
              className=" border rounded-xl 
                        w-full py-2 px-12 mt-5 
                      bg-blue-600 hover:bg-blue-700 hover:cursor-pointer
                      text-white text-xl 
                        md:w-auto"
            />
          </form>
        )}

        {login && (
          <nav className="mt-5 lg:flex lg:justify-center gap-4">
            <Link className="block text-center my-3" to="/">
              <button className="border rounded-xl 
                        w-full py-2 px-12 mt-5 
                      bg-blue-600 hover:bg-blue-700 hover:cursor-pointer
                      text-white text-xl 
                        md:w-auto">
                Login
              </button>
            </Link>
          </nav>
        )}
      </div>
    </>
  );
};

export default NewPass;
