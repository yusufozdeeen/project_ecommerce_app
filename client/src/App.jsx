import "./App.css"
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";

import Navbar from "./components/Navbar";
import Signin from "./pages/Auth/Signin";
import Signup from "./pages/Auth/Signup";
import Products from "./pages/Products";
import ProductDetail from "./pages/ProductDetail";
import Profile from "./pages/Profile";
import Basket from "./pages/Basket";
import ProtectedRoute from "./pages/ProtectedRoute";
import Admin from "./pages/Admin";
import Error404 from "./pages/Error404";
import Home from "./pages/Admin/Home";
import ProductsA from "./pages/Admin/ProductsA";
import NewProduct from "./pages/Admin/ProductsA/new";
import Orders from "./pages/Admin/Orders";
import ProductADetail from "./pages/Admin/ProductADetail";

function App() {
  return (
    <Router>
    <div>
    <Navbar/>
    <div id="content">
      <Routes>
        <Route  path="/" element={<Products/>}/>
        <Route  path="/product/:product_id" element={<ProductDetail/>}/>
        <Route path="/signin" element={<Signin/>}/>
        <Route path="/signup" element={<Signup/>}/>
        <Route path="/basket" element={<Basket/>}/>

        <Route exact path="/profile" element={<ProtectedRoute/>}>
          <Route exact path="/profile" element={<Profile/>}/>
        </Route>

        <Route exact path="/admin" element={<Admin/>} admin={true}>
          <Route path="" element={<Home/>}/>
          <Route path="orders" element={<Orders/>} />
          <Route exact path="products" element={<ProductsA/>} />
          <Route exact path="products/new" element={<NewProduct/>} />
          <Route path="products/:product_id" element={<ProductADetail/>} />
          </Route>

        <Route path="*" element={<Error404/>}/>

      </Routes>
      </div>
    </div>
  </Router>
  );
}

export default App;

