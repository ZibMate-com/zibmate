import { createBrowserRouter, RouterProvider } from "react-router-dom"
import Applayout from "./components/appLayout"
import ErrorPage from "./pages/ErrorPage"
import { MyState } from "./features/context/mystate"
import Home from "./pages/homepage/homepage"
import Contact from "./pages/homepage/view/contact"
import { About } from "./pages/homepage/view/AboutPage"
import { Pglist } from "./features/pglist/pglist"
import { PgDetails } from "./features/pglist/pgDetails"
import { BookingPage } from "./features/bookingPage/bookingpage"
import { Login } from "./features/auth/login/login"
import  SignUp  from "./features/auth/signup/signup"
import { useEffect, useState } from "react"
import { onAuthStateChanged } from "firebase/auth"
import { Auth } from "./features/firebase/firebaseconfig"
import PgForm from "./features/PropertyForm/postPropertyForm"
import { AboutUs } from "./pages/aboutUs/aboutus"
import { AdminDashboard } from "./features/dashboard/admin/adminDashboard"
import { UserDashBoard } from "./features/dashboard/user/userDashboard"
import { IndividualPg } from "./features/individualPg/individual-pg"

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
        path : "/findpg",
        element : <Pglist/>
      },
      {
        path : "/findpg/:id",
        element : <IndividualPg/>
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
      },
      {
        path : "/profile/owner",
        element : <AdminDashboard/>
      },
      {
        path : "/profile/user",
        element : <UserDashBoard/>
      },
     
    ]
  }
])
function App() {
  return <MyState><RouterProvider router={router}></RouterProvider></MyState>
}

export default App
