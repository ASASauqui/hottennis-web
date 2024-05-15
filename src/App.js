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
import Profile from "./pages/Profile";

import { ProtectedRoute } from "./components/ProtectedRoute";
import { AlreadyAuthenticatedRoute } from "./components/AlreadyAuthenticatedRoute";
import { AuthProvider } from "./hooks/useAuth";
import { ShoppingCartProvider } from "./hooks/useShoppingCart";

function App() {
  return (
    <div className="min-w-[350px]">
      {/* Toast Container */}
      <ToastContainer />

      <BrowserRouter>
        <ShoppingCartProvider>
          <AuthProvider>
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
                <AlreadyAuthenticatedRoute>
                  <Navbar />
                  <Login />
                  <Footer />
                </AlreadyAuthenticatedRoute>} />
              <Route path="/signup" element={
                <AlreadyAuthenticatedRoute>
                  <Navbar />
                  <Signup />
                  <Footer />
                </AlreadyAuthenticatedRoute>} />
              <Route path="/profile" element={
                <ProtectedRoute>
                  <Navbar />
                  <Profile />
                  <Footer />
                </ProtectedRoute>} />
            </Routes>
          </AuthProvider>
        </ShoppingCartProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
