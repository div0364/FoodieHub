import "./App.css";
import Home from "./screens/Home";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./screens/Login";
import Signup from "./screens/Signup";
import { CartProvider } from "./components/ContextReducer";
import MyOrders from "./screens/MyOrders";
import Cart from "./screens/Cart";


function App() {
  return (
    <CartProvider>
    <Router>
      <div>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/createuser" element={<Signup/>} />
          <Route exact path="/myOrder" element={<MyOrders/>} />
          <Route exact path="/cart" element={<Cart/>} />
         
        </Routes>
      </div>
    </Router>
    </CartProvider>
  );
}

export default App;
