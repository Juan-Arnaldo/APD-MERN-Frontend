import NewAppointmentForm from "../components/NewAppointmentForm";
import NewPatientForm from "../components/NewPatientForm";

const ManagePatients = () => {
  return (
    <>

      <div className="flex flex-row justify-around text-center mb-10 h-full">

      <NewAppointmentForm />
        
      <NewPatientForm />

      </div>
    </>
  );
};

export default ManagePatients;
