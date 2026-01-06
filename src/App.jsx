import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Products from "./pages/Products";
import AdminRoute from "./pages/AdminRoute";
import RootLayout from "./components/root/RootLayout";
import Home from "./pages/Home";
import ProductCreateForm from "./pages/ProductCreateForm";
import ProductUpdateForm from "./pages/ProductUpdateForm";
import { Toaster } from "react-hot-toast";
import Users from "./pages/Users";
import Login from "./pages/Login";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import Orders from "./pages/Orders";
import Settings from "./pages/Settings";
import axios from "axios";
import AdminBanner from "./components/AdminBanner";

const routing = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/login" element={<Login />} />
      <Route path="/login/forgotpassword" element={<ForgotPassword />} />
      <Route path="/reset-password/:token" element={<ResetPassword />} />
      <Route path="/" element={<AdminRoute><RootLayout /></AdminRoute>}>
        <Route path="/" element={<Home/>}>
          <Route index element={<Dashboard />} />
          <Route path="products" element={<Products />} />
          <Route path="/createproduct" element={<ProductCreateForm />} />
          <Route path="/createBanner" element={<AdminBanner />} />
          <Route path="/updateproduct/:slug" element={<ProductUpdateForm />} />
          <Route path="/users" element={<Users />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/settings" element={<Settings />} />
        </Route>
      </Route>
    </>
  )
);

axios.defaults.withCredentials = true;

function App() { 
  return (
    <div>
      <RouterProvider router={routing} />
      <Toaster position="top-center" reverseOrder={false} />
    </div>
  ); 
    
}
export default App;
