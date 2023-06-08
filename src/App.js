import { Route, Routes } from "react-router-dom";
import "./App.css";
import Login from "./Authpage/Login";
import SignUp from "./Authpage/SignUp";
import ForgotPassword from "./Authpage/ForgotPassword";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { authActions } from "./Store/Auth-Slice";

import Home from "./Header/Home";
import Compose from "./pages/Compose";

import InboxPage from "./pages/InboxPage";
import Sentboxpage from "./pages/Sentboxpage";
import MailDetails from "./pages/Maildetails";
import Sentmaildetails from "./pages/sentMaildetails";

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    const storedUserId = localStorage.getItem("userId");

    if (storedToken && storedUserId) {
      dispatch(authActions.login({ token: storedToken, userId: storedUserId }));
    }
  }, [dispatch]);
  return (
    <>
      <Home />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/inbox/:id" element={<MailDetails />} />
        <Route path="/inbox" element={<InboxPage />} />
        <Route path="/sent" element={<Sentboxpage />} />
        <Route path="/sent/:id" element={<Sentmaildetails />} />
        <Route path="/compose/:mailId" element={<Compose />} />
        <Route path="/compose" element={<Compose />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="forgotPassword" element={<ForgotPassword />} />
      </Routes>
    </>
  );
}

export default App;
