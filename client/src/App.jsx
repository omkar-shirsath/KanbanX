
import 'bootstrap/dist/css/bootstrap.min.css';
import { Routes, Route, BrowserRouter, Outlet } from 'react-router-dom';
import DashBoard from './pages/DashBoard';
import NavbarD from './components/NavbarD';
import Sidebar from './components/Sidebar';
import HeaderBar from './components/HeaderBar';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Boards from './pages/Boards';


function App() {


  const DashBoardLayout = () => {
    return (
      <>
        <NavbarD />
        <Sidebar />
        <div className="w-screen h-screen relative">
          <div className="md:pl-[250px] pl-[60px] pr-[20px] pt-[70px] w-full h-full overflow-y-auto">

            <Outlet />
          </div>
        </div>
      </>
    )
  }

  const Layout = () => {
    return (
      <>
        <HeaderBar />
        <Outlet />
      </>
    )
  }

  return (

    <>
      <BrowserRouter>

        <ToastContainer />

        <Routes>
          <Route path="/" element={<Layout />} >

            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
          </Route>
          <Route path="/" element={<DashBoardLayout />}>
            <Route path='/dashboard' element={<DashBoard />} />
            <Route path='/board' element={<Boards />} />
            <Route path='/board/:id' element={<Boards />} />
          </Route>
        </Routes>
      </BrowserRouter>

    </>
  );
}

export default App;
