import { createBrowserRouter, RouterProvider } from "react-router-dom"
import Applayout from "./components/appLayout"
import ErrorPage from "./pages/ErrorPage"
import { MyState } from "./context/mystate"
import Home from "./pages/homepage/homepage"
import Contact from "./pages/homepage/view/contact"
import { About } from "./pages/homepage/view/AboutPage"
import { Pglist } from "./pages/pglist/pglist"
import { PgDetails } from "./pages/pglist/pgDetails"
import { BookingPage } from "./booking page/bookingpage"
import { Login } from "./auth/login/login"
import { SignUp } from "./auth/signup/signup"


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
        element : <About/>
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
     
    ]
  }
])
function App() {

  return <MyState><RouterProvider router={router}></RouterProvider></MyState>
}

export default App
