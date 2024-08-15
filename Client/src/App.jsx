
import './App.css'
import { Outlet } from "react-router-dom";
import Header from './Component/Header/Header';
import Footer from './Component/Footer/Footer';

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
