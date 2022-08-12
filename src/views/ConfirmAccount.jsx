import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import Alert from "../components/Alert";

const ConfirmAccount = () => {
  const params = useParams();
  const { id } = params;

  const [alert, setAlert] = useState({});
  const [loading, setLoading] = useState(true);
  const [confirm, setConfirm] = useState(false);


  useEffect(() => {
    const confirmAccount = async () => {
      const url = `${import.meta.env.VITE_BACKEND_URL}/api/dentist/confirm/${id}`;
      
      await fetch(url)
      .then(res => res.json())
      .then(res => {
      setLoading(false);
      if(res.msg.toString() === 'Usuario confirmado'){

        setConfirm(true);
        
        setAlert({
          msg: res.msg,
          error: false
        })
      }else{
        setAlert({
          msg: res.msg,
          error: true
        })
      }
      })
      .catch(err => {
        console.log(err);
      })
    };

    confirmAccount();
  }, []);

  return (
    <>
      <div className="shadow-lg shadow-gray-400 p-3 rounded-xl bg-white">
        {!loading && <Alert alert={alert} />}

        {confirm && 
            <Link className="block text-center my-3" to="/">
              Login
            </Link>}
      </div>
    </>
  );
};

export default ConfirmAccount;
