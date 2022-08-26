import { useEffect, useState } from "react";
import { Link } from 'react-router-dom'
import moment from "moment";
import NewAppointmentForm from "../components/NewAppointmentForm";

const Appointments = () => {
  const token = localStorage.getItem("token");
  const [appointments, setAppointments] = useState([]);
  const [patients, setPatients] = useState([]);

  useEffect(() => {
    const getAppointments = async () => {
      const url = `${import.meta.env.VITE_BACKEND_URL}/api/appointment`;

      await fetch(url, {
        method: "get",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${token}`,
        },
      })
        .then((res) => res.json())
        .then((res) => {
          setAppointments(res);
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
    };

    const getPatients = async () => {
        const url = `${import.meta.env.VITE_BACKEND_URL}/api/patient`;
  
        await fetch(url, {
          method: "get",
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${token}`,
          },
        })
          .then((res) => {
            if (!res.ok) {
              throw Error("Error");
            }
            return res.json();
          })
          .then((res) => {
            setPatients(res);
            console.log(res)
          })
          .catch((err) => {
            console.log(err.message);
          });
      };

    getAppointments();
    getPatients()
  }, []);

  return (
    <>
      <div className="flex flex-row w-full gap-5 items-center">
        <div className="w-1/2">
          <NewAppointmentForm
            setAppointments={setAppointments}
            appointments={appointments}
          />
        </div>
        <div className="w-1/2">
          <div className="border-solid border-separate border-gray-400 border-2 rounded-lg ">
            <table className=" w-full ">
              <thead className="text-lg">
                <tr>
                  <th className="p-3"></th>
                  <th className="p-3"></th>
                  <th className="p-3">Patient</th>
                  <th className="p-3">Patient Phone</th>
                  <th className="p-3">Date</th>
                  <th className="p-3">Comment</th>
                  <th className="p-3"></th>
                </tr>
              </thead>
              <tbody className="text-center text-lg">
                {patients.length > 0 && appointments.map((appointment) => (
                    
                  <tr key={appointment.date}>
                    <td>
                      <Link to="/admin">
                        <i className="fa-solid fa-user cursor-pointer mx-2"></i>
                      </Link>
                    </td>
                    <td>
                        <i className="fa-solid fa-pen hover:cursor-pointer "></i>
                    </td>
                    <td className="p-3">{patients.find(e => e._id === appointment.patient).name}</td>
                    <td className="p-3">{patients.find(e => e._id === appointment.patient).phone}</td>
                    <td className="p-3">{moment(appointment.date).format('MMM D, h:mm a')}</td>
                    <td className="p-3">{appointment.comment}</td>
                    <td>
                    <i className="fa-solid fa-trash hover:cursor-pointer mr-2"></i>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default Appointments;
