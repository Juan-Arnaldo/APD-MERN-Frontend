import { Link } from "react-router-dom";
const RecoverPass = () => {
  return (
    <>
      <div className="shadow-lg p-3 rounded-xl bg-white h-min ">
        <div className="font-black text-5xl">
          <h1> Recover Password</h1>
        </div>

        <form action="">
          <div className="my-3">
            <label htmlFor="" className="block text-xl">
              Email
            </label>
            <input
              type="text"
              placeholder="Email"
              className="border w-full p-1 mt-1 rounded-xl"
            />
          </div>

          <input
            type="submit"
            value="Send Instructions"
            className=" border rounded-xl 
                        w-full py-2 px-12 mt-5 
                      bg-blue-600 hover:bg-blue-700 hover:cursor-pointer
                      text-white text-xl 
                        md:w-auto"
          />
        </form>

        <nav className="mt-5 lg:flex lg:justify-start gap-4">
          <Link className="block text-center my-3" to="/register">
            Register
          </Link>
          <Link className="block text-center my-3" to="/">
            Do you have an account?
          </Link>
        </nav>
      </div>
    </>
  );
};

export default RecoverPass;