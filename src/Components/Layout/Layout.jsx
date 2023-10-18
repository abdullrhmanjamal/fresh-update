import { Outlet } from 'react-router'
import Navbar from '../Navbar/Navbar'
import Footer from '../Footer/Footer'
import { Offline, Online } from "react-detect-offline";
import { Toaster } from 'react-hot-toast';
import { CartCountContextProvider } from '../../Context/CartContext';
import ScrollTop from '../ScrollTop';



export default function Layout() {
  
  return (
    <>

    <CartCountContextProvider>
    <Navbar/>
    <div className='container my-5 py-5 text-dark'>
    <Outlet/>
    <Toaster/>
    </div>
    <Footer/>
    
    <Offline>Your Offline (surprise!)</Offline>
    <ScrollTop/>

    </CartCountContextProvider>
    
    </>
  )
}
