import { useEffect, useState } from "react"

const Patients = () => {

    const token = localStorage.getItem('token');
    const [patients, setPatients] = useState([]);

    useEffect( () => {
        const getPatients = async () => {

            const url = `${import.meta.env.VITE_BACKEND_URL}/api/patient`


            await fetch(url, {
                method: 'get',
                headers: {
                    'Content-Type': 'application/json',
                    authorization: `Bearer ${token}`,
                }
            })
            .then(res => {
                if(!res.ok){
                    throw Error('Error');
                }

                return res.json()
            })
            .then(res => {
                console.log(res);
            })
            .catch(err => {
                console.log(err.message);
            })
        }

        getPatients()

    }, [])



  return (
    <>
        <div className="border-solid border-2 border-gray-400 ">
            <div className="grid grid-cols-5 justify-items-center">
                <p>1</p>
                <p>2</p>
                <p>3</p>
                <p>4</p>
                <p>5</p>
            </div>
            <div className="grid grid-cols-5 justify-items-center">
                <p>1</p>
                <p>2</p>
                <p>3</p>
                <p>4</p>
                <p>5</p>
            </div>
        </div>
    </>
  )
}

export default Patients