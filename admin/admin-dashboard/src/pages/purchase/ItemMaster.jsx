import React from 'react';
import ItemMaster from '../../components/purchase/ItemMaster';
import Header from "../../components/Header";
import Sidebar from "../../components/Sidebar";

export default function ItemMasterPage() {
  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-y-auto">
        <Header />
        
        {/* Replace "ItemMaster Page" with actual component */}
        <div className="p-4">
          <ItemMaster />
        </div>
      </div>
    </div>
  );
}
