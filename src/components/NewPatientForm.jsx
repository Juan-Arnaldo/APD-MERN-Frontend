import { useState } from "react";
import Alert from "../components/Alert";

const NewPatientForm = () => {

  const [alert, setAlert] = useState({});
  const [user, setUser] = useState({
    name: '',
    lastName: '',
    email: '',
    phone: '',
  })

//validar email y cel con la BD

  const validation = () => {
    const regex = /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i;

    if([user.name, user.lastName, user.email].includes('')){
      setAlert({msg: 'Todos los campos deben estar completos', error: true});
      return false;
    }

    if(!regex.test(user.email)){
      setAlert({msg: 'Ingrese un correo correctamente', error:true});
      return false;
    }

    setAlert({})
    return true
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if(validation()){

      const token = localStorage.getItem('token')
      const url = `${import.meta.env.VITE_BACKEND_URL}/api/patient`;
      const data = {
        name: user.name,
        lastName: user.lastName,
        email: user.email,
        phone: user.phone
      }

      await fetch(url, {
        method: 'post',
        body: JSON.stringify(data),
        headers: {
          'Content-Type': 'application/json',
          authorization: `Bearer ${token}`
        },
      })
      .then((res) => {
        if(!res.ok){
          throw Error('El paciente ya existe');
        }

        return res.json()
      })
      .then((res) => {
        console.log(res)
        setAlert({msg: 'El paciente se cargo exitosamente', error: false});
      })
      .catch(err => {
        setAlert({msg: err.message, error:true});
      })


      
    }
  }

  return (
    <>
      <div className="shadow-lg 2xl:p-5 mt-2 p-3 rounded-xl bg-white h-4/5 w-2/6">
        <h1 className="font-black text-3xl">New Patient</h1>
        <div className="my-3">
          <form onSubmit={handleSubmit}>

            <Alert alert={alert} />

            <div className="input-wrapper">
              <label htmlFor="" className=" block text-xl font-bold">
                Name
              </label>
              <input
                type="text"
                placeholder="Name"
                className="border w-full p-1 mt-3 rounded-xl h-9"
                onChange={(e) => setUser({ ...user, name: e.target.value })}
              />
            </div>
            <div className="input-wrapper">
              <label htmlFor="" className="block text-xl font-bold">
                Last Name
              </label>
              <input
                type="text"
                placeholder="Last Name"
                className="border w-full p-1 mt-3 rounded-xl h-9"
                onChange={(e) => setUser({ ...user, lastName: e.target.value })}
              />
            </div>

            <div className="input-wrapper">
              <label htmlFor="" className="block text-xl font-bold">
                Email
              </label>
              <input
                type="text"
                placeholder="Email"
                className="border w-full p-1 mt-3 rounded-xl h-9"
                onChange={(e) => setUser({ ...user, email: e.target.value })}
              />
            </div>

            <div className="input-wrapper">
              <label htmlFor="" className="block text-xl font-bold">
                Phone
              </label>
              <input
                type="text"
                placeholder="Phone"
                className="border w-full p-1 mt-3 rounded-xl h-9"
                onChange={(e) => setUser({ ...user, phone: e.target.value })}
              />
            </div>

            <input
              type="submit"
              value="Save Patient"
              className="border w-1/2 p-1 mt-3 rounded-xl bg-blue-400 hover:bg-blue-600 font-bold text-xl cursor-pointer"
            />
          </form>
        </div>

        <p className="2xl:mt-5 mt-3">View all the Patients</p>
      </div>
    </>
  );
};

export default NewPatientForm;
