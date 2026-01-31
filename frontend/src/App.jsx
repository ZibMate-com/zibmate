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
import { OwnerProfile } from "./features/dashboards/owner/owner-profile"
import { UserDashBoard } from "./features/dashboards/user/userDashboard"
import { IndividualPg } from "./features/properties/details/individual-pg"
import { OwnerRoute } from "./features/protected-Routes/owner"
import { UserRoute } from "./features/protected-Routes/user"
import { PgDashboard } from "./features/dashboards/tenant/pg-dasboard"
import OwnerDashboard from "./features/dashboards/owner/pg-owner-dashboard"
import AdminDashboard from "./features/dashboards/admin/admin-dashboard"
import { AdminRoute } from "./features/protected-Routes/admin"



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
          <AdminRoute>
            <PgForm />
          </AdminRoute>
      },
      {
        path: "/profile/owner",
        element: <OwnerProfile />
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
      {
        path: "/admin-dashboard",
        element:<AdminDashboard/>
         
      },

    ]
  }
])
function App() {
  return <MyState><RouterProvider router={router}></RouterProvider></MyState>
}

export default App
