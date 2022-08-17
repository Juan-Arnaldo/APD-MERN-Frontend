import {BrowserRouter, Routes, Route} from 'react-router-dom';
import AuthLayout from './layout/AuthLayout';
import Login from './views/Login';
import Register from './views/Register';
import RecoverPass from './views/RecoverPass';
import ConfirmAccount from './views/ConfirmAccount';
import NewPass from './views/NewPass';
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
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App
