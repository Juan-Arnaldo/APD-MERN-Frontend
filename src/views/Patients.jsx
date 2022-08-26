import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import NewPatientForm from "../components/NewPatientForm";

const Patients = () => {
  const token = localStorage.getItem("token");
  const [patients, setPatients] = useState([]);

  useEffect(() => {
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
        })
        .catch((err) => {
          console.log(err.message);
        });
    };
    getPatients();
  }, []);

  return (
    <>
      <div className="flex flex-row w-full gap-5 items-center">
        <div className="w-1/2">
          <NewPatientForm setPatients={setPatients} patients={patients} />
        </div>
        <div className="w-1/2 ">
          <div className="border-solid border-separate border-gray-400 border-2 rounded-lg ">
            <table className=" w-full ">
              <thead className="text-lg">
                <tr>
                  <th className="p-3"></th>
                  <th className="p-3"></th>
                  <th className="p-3">Name</th>
                  <th className="p-3">Last Name</th>
                  <th className="p-3">Email</th>
                  <th className="p-3">Phone</th>
                </tr>
              </thead>
              <tbody className="text-center text-lg">
                {patients.map((patient) => (
                  <tr key={patient.email}>
                    <td>
                      <Link to="/admin">
                        <i className="fa-solid fa-user cursor-pointer"></i>
                      </Link>
                    </td>
                    <td>
                        <i className="fa-solid fa-pen hover:cursor-pointer "></i>
                    </td>
                    <td className="p-3">{patient.name}</td>
                    <td className="p-3">{patient.lastName}</td>
                    <td className="p-3">{patient.email}</td>
                    <td className="p-3">{patient.phone}</td>
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

export default Patients;
