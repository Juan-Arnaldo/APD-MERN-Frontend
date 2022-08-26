import { Link } from 'react-router-dom'
import useAuth from '../hooks/useAuth'

const Header = () => {

const { logOut } = useAuth()

  return (
    <header className=" py-8 from-blue-400 to-blue-600 bg-gradient-to-r">
        <div className=" container mx-auto flex flex-col lg:flex-row justify-between items-center">
            <Link to='/admin' className=" text-2xl font-bold ">Dentist Patient Manager</Link>

            <nav className='flex flex-col items-center lg:flex-row gap-4 mt-5 lg:mt-0'>
                <Link to='/admin/patients' className=' text-m font-bold'>Patients</Link>
                <Link to='/admin/appointments' className=' text-m font-bold'>Appointments</Link>
                <Link to='/admin' className=' text-m font-bold'>Profile</Link>

                <button
                    type='button'
                    className=' text-m font-bold'
                    onClick={logOut}
                >Log Out</button>
            </nav>
        </div>


    </header>

  )
}

export default Header