import {BrowserRouter, Routes, Route} from 'react-router-dom';
import AuthLayout from './layout/AuthLayout';
import Login from './views/Login';
import Register from './views/Register';
import RecoverPass from './views/RecoverPass';
import ConfirmAccount from './views/ConfirmAccount';

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element= {<AuthLayout />}>
          <Route index element= {<Login />} />
          <Route path='register' element= {<Register />} />
          <Route path='recover-pass' element= {<RecoverPass />} />
          <Route path='confirm/:id' element= {<ConfirmAccount />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
