import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Products from "./pages/Products";
import Product from "./pages/Product";
import Checkout from "./pages/Checkout";
import Login from "./pages/Login";
import Signup from "./pages/Signup";

function App() {
  return (
    <div className="min-w-[350px]">
      {/* Toast Container */}
      <ToastContainer />

      <BrowserRouter>
        <Routes>
          <Route path="/" element={
            <>
              <Navbar />
              <Home />
              <Footer />
            </>
          } />
          <Route path="/products" element={
            <>
              <Navbar />
              <Products />
              <Footer />
            </>} />
          <Route path="/products/:id" element={
            <>
              <Navbar />
              <Product />
              <Footer />
            </>} />
          <Route path="/checkout" element={
            <>
              <Navbar />
              <Checkout />
              <Footer />
            </>} />
          <Route path="/login" element={
            <>
              <Login />
              <Footer />
            </>} />
          <Route path="/signup" element={
            <>
              <Signup />
              <Footer />
            </>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
