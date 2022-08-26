import moment from "moment";
import { useState } from "react";
import Alert from "../components/Alert";

const NewAppointmentForm = ({setAppointments, appointments}) => {
  const [alert, setAlert] = useState({});
  const [user, setUser] = useState({
    date: "",
    schedule: "",
    patient: "",
    comment: "",
  });

  const validation = () => {

    if([user.date, user.schedule, user.patient, user.comment].includes('')){
      setAlert({msg: 'Todos los campos deben estar completos', error: true});
      return false;
    }


    setAlert({});
    return true
  }

  const handleSubmit = async e => {
    e.preventDefault()

    if(validation()){

      const token = localStorage.getItem('token');
      const url = `${import.meta.env.VITE_BACKEND_URL}/api/appointment`;
      const data = {
        date: moment(user.date).add(user.schedule, 'h').parseZone(),
        id: user.patient,
        comment: user.comment,
      }

      setUser({
        date: "",
        schedule: "",
        patient: "",
        comment: "",
      })

      await fetch(url, {
        method: 'post',
        body: JSON.stringify(data),
        headers: {
          'Content-Type': 'application/json',
          authorization: `Bearer ${token}`
        },
      })
      .then(res => {
        return res.json()
      })
      .then(res => {
        setAppointments([...appointments, res]);
      })
      .catch(err => {
        console.log(err);
      })
    }
  }

  return (
    <>
      <div className="shadow-lg 2xl:p-5 mt-2 p-3 rounded-xl bg-white h-full w-3/4 ">
        <h1 className="font-black text-3xl">New Appointment</h1>
        <div className=" my-3">

          <Alert alert={alert} />

          <form onSubmit={handleSubmit}>
              <div className="input-wrapper">
                <label htmlFor="" className=" block text-xl font-bold">
                  Date
                </label>
                <input
                  type="date"
                  className="border h-9 w-full p-1 mt-3 rounded-xl text-center"
                  value={user.date}
                  onChange={(e) => setUser({ ...user, date: e.target.value })}
                />
              </div>

              <div className="input-wrapper">
                <label htmlFor="" className=" block text-xl font-bold">
                  Schedule
                </label>
                <input
                  type="time"
                  className="border w-full h-9 p-1 mt-3 rounded-xl text-center "
                  value={user.schedule}
                  onChange={(e) =>
                    setUser({ ...user, schedule: e.target.value })
                  }
                />
              </div>

            <div className="input-wrapper">
              <label htmlFor="" className="block text-xl font-bold">
                Patient
              </label>
              <input
                type="text"
                placeholder="Patient"
                className="border w-full p-1 mt-3 rounded-xl h-9"
                value={user.patient}
                onChange={(e) => setUser({ ...user, patient: e.target.value })}
              />
            </div>

            <div className="input-wrapper">
              <label htmlFor="" className="block text-xl font-bold">
                Comment
              </label>
              <input
                type="text"
                placeholder="Comment"
                className="border w-full p-1 mt-3 rounded-xl h-9"
                value={user.comment}
                onChange={(e) => setUser({ ...user, comment: e.target.value })}
              />
            </div>

            <input
              type="submit"
              value="Save appointment"
              className="border w-1/2 p-1 mt-3 rounded-xl bg-blue-400 hover:bg-blue-600 font-bold text-xl cursor-pointer"
            />
          </form>
        </div>
      </div>
    </>
  );
};

export default NewAppointmentForm;
