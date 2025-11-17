import { createBrowserRouter, RouterProvider } from "react-router-dom"
import Applayout from "./components/appLayout"
import ErrorPage from "./pages/ErrorPage"
import { MyState } from "./features/context/mystate"
import Home from "./pages/homepage/homepage"
import Contact from "./pages/homepage/view/contact"
import { Pglist } from "./features/pglist/pglist"
import { BookingPage } from "./features/bookingPage/bookingpage"
import { Login } from "./features/auth/login/login"
import  SignUp  from "./features/auth/signup/signup"
import PgForm from "./features/PropertyForm/postPropertyForm"
import { AboutUs } from "./pages/aboutUs/aboutus"
import { AdminDashboard } from "./features/dashboard/admin/adminDashboard"
import { UserDashBoard } from "./features/dashboard/user/userDashboard"
import { IndividualPg } from "./features/individualPg/individual-pg"
import { OwnerRoute } from "./features/protected-Routes/owner"
import { UserRoute } from "./features/protected-Routes/user"


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
        element : <OwnerRoute>
            <PgForm/>
          </OwnerRoute>
      },
      {
        path : "/profile/owner",
        element : <AdminDashboard/>
      },
      {
        path : "/profile/buyer",
        element :<UserRoute> <UserDashBoard/> </UserRoute>
      },
     
    ]
  }
])
function App() {
  return <MyState><RouterProvider router={router}></RouterProvider></MyState>
}

export default App
