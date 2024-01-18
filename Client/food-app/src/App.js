import "./App.css";
import Home from "./screens/Home";
import Login from "./screens/Login";
import Signup from "./screens/Signup.js";
import Cart from "./screens/Cart.js";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "../node_modules/bootstrap-dark-5/dist/css/bootstrap-dark.min.css";
import "../node_modules/bootstrap/dist/js/bootstrap.bundle";
import "../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js";
import { CartProvider } from "./components/ContextReducer.js";
import MyOrder from "./screens/MyOrder.js";


function App() {
  return (
    <CartProvider>
      <Router>
        <div>
          <Routes>
            <Route exac path="/" element={<Home />} />
            <Route exac path="/login" element={<Login />} />
            <Route exac path="/signup" element={<Signup />} />
            <Route exac path="/cart" element={<Cart />} />
            <Route exac path="/myorder" element={<MyOrder />} />
          </Routes>
        </div>
      </Router>
    </CartProvider>
  );
}

export default App;
