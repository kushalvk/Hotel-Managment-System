
import './App.css'
import { Outlet } from "react-router-dom";
import Header from './Components/Pages/Header/Header.jsx';
import Footer from './Components/Pages/Footer/Footer';

function App() {

  return (
    <div className='min-h-screen flex flex-wrap content-between bg-black'>
      <div className='w-full block'>
        <Header />
        <main>
          <Outlet />
        </main>
        <Footer />
      </div>
    </div>
  )
}

export default App
