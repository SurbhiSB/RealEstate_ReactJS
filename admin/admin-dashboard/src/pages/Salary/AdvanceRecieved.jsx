
import React from 'react';
import Header from "../../components/Header";
import Sidebar from "../../components/Sidebar";

export default function AdvanceRecieved() {
  return <div> <div className="flex h-screen bg-gray-100">
          <Sidebar />
          <div className="flex-1 flex flex-col">
            <Header />Advance Recieved</div></div></div>
}
