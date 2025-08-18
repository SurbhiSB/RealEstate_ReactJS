
import React from 'react';
import Header from "../../components/Header";
import Sidebar from "../../components/Sidebar";

export default function RecievedReport() {
  return <div> <div className="flex h-screen bg-gray-100">
          <Sidebar />
          <div className="flex-1 flex flex-col">
            <Header />Recieved Report</div></div></div>
}