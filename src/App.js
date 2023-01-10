import { Route, Routes, useNavigate } from 'react-router-dom';
import './App.css';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import Home from './pages/Home/Home';
import Login from './pages/Login/Login';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { authMe } from './redux/slices/auth';
import Registrate from './pages/Registrate/Registrate';
import Admin from './pages/Admin/Admin';
import FullDevice from './pages/FullDevice/FullDevice';

function App() {

  const dispatch = useDispatch()
  // const navigate = useNavigate()
  // const [isAuth, setIsAuth] = useState(false)

  useEffect(() => {
    dispatch(authMe())
    // .then((data) => {
    //   // setIsAuth(Boolean(data.payload.token))
    //   if (!Boolean(data.payload.token)) {
    //     navigate('/login')
    //   }
    // })
  }, [])


  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path='/' element={<Home />}/>
        {/* {isAuth
          ?  */}
          <Route path='/' element={<Home />} />
          {/* // : <> */}
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Registrate />} />
            <Route path='/admin' element={<Admin />} />
            <Route path='/device/:id' element={<FullDevice />} />
          {/* </>
        } */}
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
