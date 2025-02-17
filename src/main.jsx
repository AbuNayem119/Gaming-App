import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import ErrorPage from './pages/ErrorPage.jsx'
import './index.css'
import AllReview from './pages/AllReview.jsx'
import AddReview from './pages/AddReview.jsx'
import GameWatchList from './pages/GameWatchList.jsx'
import App from './App.jsx'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Home from './pages/Home.jsx';
import Routes from './pages/Routes.jsx'
import AuthProvider from './auth/AuthProvider.jsx'
import Login from './auth/Login.jsx'
import Register from './auth/Register.jsx'
import ReviewDetails from './pages/ReviewDetails.jsx'
import MyReview from './pages/MyReview.jsx'
import UpdateReview from './pages/UpdateReview.jsx'
import PrivateRoute from './auth/PrivateRouter.jsx'
import { ToastContainer } from 'react-toastify'
import "react-toastify/dist/ReactToastify.css";
import { HelmetProvider } from 'react-helmet-async'
import UserPrivateRouter from './auth/UserPrivateRouter.jsx'


const router = createBrowserRouter([
  {
    path: "/",
    element: <Routes></Routes>,
    errorElement: <ErrorPage></ErrorPage>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
        loader: () => fetch('http://localhost:5000/reviews')
      },
      {
        path: "/allReview",
        element: <AllReview></AllReview>,
        loader: () => fetch('http://localhost:5000/reviews')
      },
      {
        path: "/addReview",
        element: <PrivateRoute><AddReview></AddReview></PrivateRoute>,
        loader: () => fetch('http://localhost:5000/users')
      },
      {
        path: "/reviews/:id",
        element: <ReviewDetails></ReviewDetails>,
        loader: ({ params }) => fetch(`http://localhost:5000/reviews/${params.id}`)
      },
      {
        path: "/gameWatchList",
        element: <PrivateRoute><GameWatchList></GameWatchList></PrivateRoute>,
        loader: () => fetch('http://localhost:5000/reviews')
      },
      {
        path: "/myReview",
        element: <PrivateRoute><MyReview></MyReview></PrivateRoute>,
        loader: () => fetch('http://localhost:5000/reviews')
      },
      {
        path: "/updateReview/:id",
        element: <UpdateReview></UpdateReview>,
        loader: ({ params }) => fetch(`http://localhost:5000/reviews/${params.id}`)
      },
      {
        path: "/login",
        element: <UserPrivateRouter><Login></Login></UserPrivateRouter>
      },
      {
        path: "/register",
        element: <UserPrivateRouter><Register></Register></UserPrivateRouter>
      }
    ]
  },
]);



createRoot(document.getElementById('root')).render(
  <StrictMode>
    <HelmetProvider>
      <AuthProvider>
        <ToastContainer />
        <RouterProvider router={router} />
      </AuthProvider>
    </HelmetProvider>
  </StrictMode>,
)


