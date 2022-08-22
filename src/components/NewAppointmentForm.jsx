import { useState } from "react";
import Alert from "../components/Alert";

const NewAppointmentForm = () => {
  const [alert, setAlert] = useState({});
  const [user, setUser] = useState({
    date: "",
    schedule: "",
    patient: "",
    comment: "",
  });

  return (
    <>
      <div className="shadow-lg p-5 rounded-xl bg-white h-4/5 w-2/6 ">
        <h1 className="font-black text-3xl">New appointment</h1>
        <div className=" my-3">

          <Alert alert={alert} />

          <form>
            <div className="flex flex-row justify-around text-center gap-3 py-3">
              <div className="p-3 shadow-lg bg-gray-500 rounded-xl w-1/2">
                <label htmlFor="" className=" block text-xl font-bold">
                  Date
                </label>
                <input
                  type="date"
                  className="border h-9 w-full p-1 mt-3 rounded-xl"
                  onChange={(e) => setUser({ ...user, date: e.target.value })}
                />
              </div>

              <div className="p-3 shadow-lg bg-gray-500 rounded-xl w-1/2">
                <label htmlFor="" className=" block text-xl font-bold">
                  Schedule
                </label>
                <input
                  type="time"
                  className="border w-full h-9 p-1 mt-3 rounded-xl text-center "
                  onChange={(e) =>
                    setUser({ ...user, schedule: e.target.value })
                  }
                />
              </div>
            </div>

            <div className="p-3 shadow-lg bg-gray-500 rounded-xl">
              <label htmlFor="" className="block text-xl font-bold">
                Patient
              </label>
              <input
                type="text"
                placeholder="Patient"
                className="border w-full p-1 mt-3 rounded-xl h-9"
                onChange={(e) => setUser({ ...user, patient: e.target.value })}
              />
            </div>

            <div className="p-3 my-3 shadow-lg bg-gray-500 rounded-xl">
              <label htmlFor="" className="block text-xl font-bold">
                Comment
              </label>
              <input
                type="text"
                placeholder="Comment"
                className="border w-full p-1 mt-3 rounded-xl h-9"
                onChange={(e) => setUser({ ...user, comment: e.target.value })}
              />
            </div>

            <input
              type="submit"
              value="Save appointment"
              className="border w-1/2 p-1 mt-3 rounded-xl bg-gray-500 font-bold text-xl cursor-pointer"
            />
          </form>
        </div>

        <p className="mt-5">View all the Appointment</p>
      </div>
    </>
  );
};

export default NewAppointmentForm;
