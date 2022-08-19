import { Link } from 'react-router-dom'
import useAuth from '../hooks/useAuth'

const Header = () => {

    const { logOut } = useAuth()

  return (
    <header className=" py-8 bg-sky-600">
        <div className=" container mx-auto flex flex-col lg:flex-row justify-between items-center">
            <h1 className=" text-2xl font-bold ">Dentist Patient Manager</h1>

            <nav className='flex flex-col items-center lg:flex-row gap-4 mt-5 lg:mt-0'>
                <Link to='/admin' className=' text-m font-bold'>Patients</Link>
                <Link to='/admin' className=' text-m font-bold'>Appoiments</Link>
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