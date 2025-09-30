import { createBrowserRouter, RouterProvider } from "react-router-dom"
import Applayout from "./components/appLayout"
import ErrorPage from "./pages/ErrorPage"
import { MyState } from "./features/context/mystate"
import Home from "./pages/homepage/homepage"
import Contact from "./pages/homepage/view/contact"
import { About } from "./pages/homepage/view/AboutPage"
import { Pglist } from "./pages/pglist/pglist"
import { PgDetails } from "./pages/pglist/pgDetails"
import { BookingPage } from "./features/bookingPage/bookingpage"
import { Login } from "./features/auth/login/login"
import  SignUp  from "./features/auth/signup/signup"
import { useEffect, useState } from "react"
import { onAuthStateChanged } from "firebase/auth"
import { Auth } from "./features/firebase/firebaseconfig"
import PgForm from "./features/PropertyForm/postPropertyForm"
import { AboutUs } from "./pages/aboutUs/aboutus"

const router = createBrowserRouter([
  {
    path:"/",
    element : <Applayout/>,
    errorElement : <ErrorPage/>,
    children : [
      {
        path :'/',
        element : <Home/>
      },
      {
        path : '/contact',
        element : <Contact/>
      },
      {
        path : "/aboutus",
        element : <AboutUs/>
      },
      {
        path : "/pglist",
        element : <Pglist/>
      },
      {
        path : "/pgdetails/:id",
        element : <PgDetails/>
      },
      {
        path : "/booking",
        element : <BookingPage/>
      },
      {
        path : "/login",
        element : <Login/>
      },
      {
        path : "/signup",
        element : <SignUp/>
      },
      {
        path : "/postproperty",
        element : <PgForm/>
      }
     
    ]
  }
])
function App() {
  return <MyState><RouterProvider router={router}></RouterProvider></MyState>
}

export default App
