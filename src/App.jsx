import {BrowserRouter, Routes, Route} from 'react-router-dom';
import AuthLayout from './layout/AuthLayout';
import AuthLayoutPrivate from './layout/AuthLayoutPrivate';

import Login from './views/Login';
import Register from './views/Register';
import RecoverPass from './views/RecoverPass';
import ConfirmAccount from './views/ConfirmAccount';
import NewPass from './views/NewPass';
import ManagePatients from './views/ManagePatients';

import {AuthProvider} from './context/AuthProvider'


function App() {

  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path='/' element= {<AuthLayout />}>
            <Route index element= {<Login />} />
            <Route path='register' element= {<Register />} />
            <Route path='recover-pass' element= {<RecoverPass />} />
            <Route path='recover-pass/:token' element= {<NewPass />} />
            <Route path='confirm/:id' element= {<ConfirmAccount />} />
          </Route>

          <Route path='/admin' element={<AuthLayoutPrivate />}>
            <Route index element={<ManagePatients />} />
            

          </Route>
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App
