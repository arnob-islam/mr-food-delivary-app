import React from "react";
import Navbar from "./components/Navbar";
import { Route, Routes, Outlet } from "react-router-dom";

import AdminPrivateRoute from "./components/privateRoute/AdminPrivateRoute";
import AdminPublicRoute from "./components/privateRoute/AdminPublicRoute";
import Login from "./components/Auth/Login";
import Register from "./components/Auth/Register";
import ResetPassword from "./components/Auth/ResetPassword";
import ForgetPassword from "./components/Auth/ForgetPassword";
import AdminLogin from "./Admin/Auth/AdminLogin";
import AdminForgetPassword from "./Admin/Auth/AdminForgetPassword";
import AdminResetPassword from "./Admin/Auth/AdminResetPassword";

import PublicRoute from "./components/privateRoute/AuthPublicRoute";
import OrderPrivateRoute from "./components/privateRoute/OrderPrivateRoute";
import PrivateRoute from "./components/privateRoute/PrivateRoute";

import Homepage from "./Page/Landing/Homepage";
import LearnMoreCarrer from "./Page/Career/LearnMoreCarrer";
import SearchResult from "./Page/DisplayFood";
import OrderSummery from "./Page/Checkout/OrderSummery";
import UserSingleActiveOrder from "./Page/UserPersonal/UserSingleOrder";
import UserAllActiveOrder from "./Page/UserPersonal/UserAllActiveOrder";

import AdminDashbord from "./Admin/Dashbord/Dashbord";
import CreateFood from "./Admin/Dashbord/Dashbord/CreateFood";
import AllFoods from "./Admin/Dashbord/Dashbord/Food/AllFoods";
import EditFood from "./Admin/Dashbord/Dashbord/EditFood";
import UserProfile from "./Page/UserPersonal/UserProfile";

const App = () => {
  return (
    <React.Fragment>
      <Routes>
        <Route
          path="/user/login"
          element={
            <PublicRoute>
              <Login />
            </PublicRoute>
          }
        />

        <Route
          path="/user/signup"
          element={
            <PublicRoute>
              <Register />
            </PublicRoute>
          }
        />
        <Route
          path="/user/reset-password/:resetToken"
          element={
            <PublicRoute>
              <ResetPassword />
            </PublicRoute>
          }
        />

        <Route
          path="/user/forget-password"
          element={
            <PublicRoute>
              <ForgetPassword />
            </PublicRoute>
          }
        />

        {/* ******************** Admin *******************  */}

        <Route
          path="/admin/login"
          element={
            <AdminPrivateRoute>
              <AdminLogin />
            </AdminPrivateRoute>
          }
        />

        <Route
          path="/admin/forget-password"
          element={
            <AdminPrivateRoute>
              <AdminForgetPassword />
            </AdminPrivateRoute>
          }
        />
        <Route
          path="/admin/reset-password/:resetToken"
          element={
            <AdminPrivateRoute>
              <AdminResetPassword />
            </AdminPrivateRoute>
          }
        />

        <Route
          path="/admin/dashbord"
          element={
            <AdminPublicRoute>
              <AdminDashbord />
            </AdminPublicRoute>
          }
        >
          <Route path="/admin/dashbord/create/food" element={<CreateFood />} />
          <Route path="/admin/dashbord/all/foods" element={<AllFoods />} />
          <Route path="/admin/dashbord/edit/:id" element={<EditFood />} />
        </Route>

        {/* **********  publics *********** */}
        <Route path="/" element={<Layout />}>
          <Route path="/" element={<Homepage />} />
          <Route path="/search" element={<SearchResult />} />
          <Route path="/careers" element={<LearnMoreCarrer />} />

          <Route
            path="/checkout/summery"
            element={
              <OrderPrivateRoute>
                <OrderSummery />
              </OrderPrivateRoute>
            }
          />
          <Route
            path="/order/status/:id"
            element={
              <PrivateRoute>
                <UserSingleActiveOrder />
              </PrivateRoute>
            }
          />
          <Route
            path="/active/orders"
            element={
              <PrivateRoute>
                <UserAllActiveOrder />
              </PrivateRoute>
            }
          />
          <Route
            path="/user/profile"
            element={
              <PrivateRoute>
                <UserProfile />
              </PrivateRoute>
            }
          />
        </Route>
      </Routes>
    </React.Fragment>
  );
};

function Layout() {
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
}

export default App;
