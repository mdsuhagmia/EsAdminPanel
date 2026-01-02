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

const routing = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/login" element={<Login />} />
      <Route path="/" element={<AdminRoute><RootLayout /></AdminRoute>}>
        <Route path="/" element={<Home/>}>
          <Route index element={<Dashboard />} />
          <Route path="products" element={<Products />} />
          <Route path="/createproduct" element={<ProductCreateForm />} />
          <Route path="/updateproduct/:slug" element={<ProductUpdateForm />} />
          <Route path="/users" element={<Users />} />
        </Route>
      </Route>
    </>
  )
);

function App() { 
  return (
    <div>
      <RouterProvider router={routing} />
      <Toaster position="top-center" reverseOrder={false} />
    </div>
  ); 
    
}
export default App;
