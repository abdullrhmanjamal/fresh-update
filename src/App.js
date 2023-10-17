// import logo from './logo.svg';
// import Navbar from './Components/Navbar/Navbar';
// import Footer from './Components/Footer/Footer';
import './App.css';
import Brands from  './Components/Brands/Brands'
import Cart from  './Components/Cart/Cart'
import Categories from  './Components/Categories/Categories'
import Home from  './Components/Home/Home'
import Layout from  './Components/Layout/Layout'
import NotFound from  './Components/NotFound/NotFound'
import Products from  './Components/Products/Products'
import Regter from  './Components/Regster/Regster'
import Login from  './Components/Login/Login'
import { Navigate, RouterProvider, createBrowserRouter } from 'react-router-dom';
import { AuthProvider } from './Context/AuthContext';
import ProductDetalis from './Components/ProductDetalis/ProductDetalis';
import CategoriesDetalis from './Components/CategoriesDetalis/CategoriesDetalis';
import CheckOut from './Components/CheckOut/CheckOut';



function App() {
let routers= createBrowserRouter([
  {path:'', element:<Layout/>, children:[
    {path:'', element: <Navigate to={'home'}/>},
    {path:'home',element:<Home/>},
    {path:'login',element:<Login/>},
    {path:'regster',element:<Regter/>},
    {path:'products',element:<Products/>},
    {path:'cart',element:<Cart/>},
    {path:'productDetalis/:id',element:<ProductDetalis/>},
    {path:'categories',element:<Categories/>},
    {path:'brands',element:<Brands/>},
    {path:'checkout/:id',element:<CheckOut/>},
    {path:'categoriesDetalis/:id',element:<CategoriesDetalis/>},
    {path:'*',element:<NotFound/>}
    
  ]}])
  return (
    <>
    <AuthProvider>

    <RouterProvider router={routers}/>
    </AuthProvider>
    

    </>
    
  )
}

export default App;
