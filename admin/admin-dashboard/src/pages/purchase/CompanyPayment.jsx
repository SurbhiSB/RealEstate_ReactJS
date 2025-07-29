
import React from 'react';
import CompanyPayment from '../../components/purchase/CompanyPayment';
import Header from "../../components/Header";
import Sidebar from "../../components/Sidebar";

export default function CompanyPaymentPage() {
  return <div> <div className="flex h-screen bg-gray-100">
          <Sidebar />
          <div className="flex-1 flex flex-col">
            <Header />ItemMaster Page</div></div></div>
}

