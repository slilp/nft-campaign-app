import { ToastContainer } from "react-toastify";
import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import useAuth from "../src/hooks/useAuth";

function App() {
  const { wallet } = useAuth();

  return (
    <div>
      <Routes>
        {wallet && <Route path="*" element={<Home />}></Route>}
        {!wallet && (
          <>
            <Route path="*" element={<Login />}></Route>
            <Route path="/register" element={<Register />}></Route>
          </>
        )}
      </Routes>

      <ToastContainer></ToastContainer>
    </div>
  );
}

export default App;
