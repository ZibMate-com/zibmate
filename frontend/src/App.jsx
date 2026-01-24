import { createBrowserRouter, RouterProvider } from "react-router-dom"
import Applayout from "./components/appLayout"
import ErrorPage from "./pages/ErrorPage"
import { MyState } from "./context/mystate"
import Home from "./pages/homepage/homepage"
import Contact from "./pages/homepage/view/contact"
import { Pglist } from "./features/properties/list/pglist"
import { BookingPage } from "./features/bookings/bookingpage"
import { Login } from "./features/auth/login/login"
import SignUp from "./features/auth/signup/signup"
import PgForm from "./features/properties/create/postPropertyForm"
import { AboutUs } from "./pages/aboutUs/aboutus"
import { AdminDashboard } from "./features/dashboards/admin/adminDashboard"
import { UserDashBoard } from "./features/dashboards/user/userDashboard"
import { IndividualPg } from "./features/properties/details/individual-pg"
import { OwnerRoute } from "./features/protected-Routes/owner"
import { UserRoute } from "./features/protected-Routes/user"
import { PgDashboard } from "./features/dashboards/tenant/pg-dasboard"
import OwnerDashboard from "./features/dashboards/owner/pg-owner-dashboard"



const router = createBrowserRouter([
  {
    path: "/",
    element: <Applayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: '/',
        element: <Home />
      },
      {
        path: '/help',
        element: <Contact />
      },
      {
        path: "/about",
        element: <AboutUs />
      },
      {
        path: "/findpg",
        element: <Pglist />
      },
      {
        path: "/findpg/:id",
        element: <IndividualPg />
      },
      {
        path: "/booking",
        element: <BookingPage />
      },
      {
        path: "/login",
        element: <Login />
      },
      {
        path: "/signup",
        element: <SignUp />
      },
      {
        path: "/postproperty",
        element:
          <OwnerRoute>
            <PgForm />
          </OwnerRoute>
      },
      {
        path: "/profile/owner",
        element: <AdminDashboard />
      },
      {
        path: "/profile/user",
        element:
          <UserRoute>
            <UserDashBoard />
          </UserRoute>
      },

      {
        path: "/tenent-dashboard",
        element: <PgDashboard />
      },
      {
        path: "/owner-dashboard",
        element:
          <OwnerRoute>
            <OwnerDashboard />
          </OwnerRoute>
      },

    ]
  }
])
function App() {
  return <MyState><RouterProvider router={router}></RouterProvider></MyState>
}

export default App
