import { useState } from "react";
import Navbar from "../../components/Layout/Navbar";
import useAuth from "../../hooks/useAuth";

function Home() {
  const { logout } = useAuth();

  return (
    <div>
      <Navbar></Navbar>
      <button onClick={logout}>Logout</button>
      Home
    </div>
  );
}

export default Home;
