import Header from "../../components/Header";
import Sidebar from "../../components/Sidebar";
import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";

export default function PaymentHistory() {
   const navigate = useNavigate();


     const token = localStorage.getItem("adminToken");
if (token) {
  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
}
useEffect(() => {
  if (!token) navigate("/AdminLogin");
}, [token, navigate]);
  return <div> <div className="flex h-screen bg-gray-100">
          <Sidebar />
          <div className="flex-1 flex flex-col">
            <Header />Payment History Page</div></div></div>
};
