import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AdminLogin from './pages/AdminLogin';
import Dashboard from './pages/Dashboard';
import UserManagement from './pages/UserManagement';
import ListingManagement from './pages/ListingManagement';
import CreateListing from './pages/CreateListing';
import Group from './pages/projects/Group';
import GroupList from './pages/projects/GroupList';
import Project from './pages/projects/Project';
import ProjectList from './pages/projects/ProjectList';
import Plots from './pages/projects/Plots';
import Booking from './pages/projects/Booking';
import BookingHistory from './pages/projects/BookingHistory';
import PaymentReceived from './pages/projects/PaymentReceived';
import PaymentHistory from './pages/projects/PaymentHistory';
import CompanyDetailsPage from './pages/CompanyDetails';

import AddMembers from './pages/members/addMembers';
import AddCustomers from './pages/members/AddCustomer';

import ItemMasterPage from './pages/purchase/ItemMaster';
import PurchaseOrderPage from './pages/purchase/PurchaseOrder';
import PoList from './components/purchase/PoList';
import CompanyPaymentPage from './pages/purchase/CompanyPayment';
import PaymentHistoryPage from './pages/purchase/PaymentHistory';
import PurchaseBillPage from './pages/purchase/PurchaseBill';
import PurchaseBillHistoryPage from './pages/purchase/PurchaseBillHistory';
import InStockPage from './pages/purchase/InStock';
import InStockReportPage from './pages/purchase/InStockReport';
import OutStockPage from './pages/purchase/OutStock';
import OutStockReportPage from './pages/purchase/OutStockReport';
import StockReportPage from './pages/purchase/StockReport';
import ProjectPlots from './pages/projects/ProjectPlots';
  

import AddAgent from './pages/members/AddAgent';

import MemberList from './pages/members/MemberList';
import CustomerList from './pages/members/CustomerList';
import AgentList from './pages/members/AgentList';
import HeadMaster from './pages/Expenses/HeadMaster';
import OfficeExpenses from './pages/Expenses/officeExpenses';
import OfficeExpensesReport from './pages/Expenses/OfficeExpensesReport';
import MiscExpenses from './pages/Expenses/miscExpenses';
import MiscExpensesReport from './pages/Expenses/MiscExpensesReport';
import MachineryExpenses from './pages/Expenses/MachineryExpenses'; 
import MachineryExpensesReport from './pages/Expenses/MachineryExpensesReport';
import SiteFeesExpenses from './pages/Expenses/SiteFeesExpenses'; 
import SiteFeesReport from './pages/Expenses/SiteFeesReport'; 
import FdSdExpenses from './pages/Expenses/FdSdExpenses'; 
import FdSdExpReport from './pages/Expenses/FdSdExpReport';
import LandPurchase from './pages/Expenses/LandPurchase';
import LandPurchaseList from './pages/Expenses/LandPurchaseList';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<AdminLogin />} />
        <Route path="/" element={<Dashboard />} />
        <Route path="/users" element={<UserManagement />} />
        <Route path="/listings" element={<ListingManagement />} />
        <Route path="/create-listing" element={<CreateListing />} />
        <Route path="/CompanyDetails" element={<CompanyDetailsPage />} />
        <Route path="/projects/group" element={<Group />} />
        <Route path="/projects/group-list" element={<GroupList />} />
        <Route path="/projects/project" element={<Project />} />
        <Route path="/projects/project-list" element={<ProjectList />} />
        <Route path="/projects/plots" element={<Plots />} />
        <Route path="/projects/booking" element={<Booking />} />
        <Route path="/projects/booking-history" element={<BookingHistory />} />
        <Route path="/projects/payment-recieved" element={<PaymentReceived />} />
        <Route path="/projects/payment-history" element={<PaymentHistory />} />

        <Route path="/members/addmembers" element={<AddMembers />} />
        <Route path="/members/addCustomer" element={<AddCustomers />} />
        <Route path="/members/AddAgent" element={<AddAgent />} />
        <Route path="/members/MemberList" element={<MemberList />} />
        <Route path="/members/CustomerList" element={<CustomerList />} />
        <Route path="/members/AgentList" element={<AgentList />} />
         <Route path="/members/addmembers/:id" element={<AddMembers />} />
         <Route path="/Expenses/HeadMaster" element={<HeadMaster />} />
         <Route path="/Expenses/OfficeExpenses" element={<OfficeExpenses />} />
         <Route path="/Expenses/OfficeExpensesReport" element={<OfficeExpensesReport />} />
         <Route path="/Expenses/miscExpenses" element={<MiscExpenses />} />
         <Route path="/Expenses/MiscExpensesReport" element={<MiscExpensesReport />} />
         <Route path="/Expenses/MachineryExpenses" element={<MachineryExpenses />} />   
         <Route path="/Expenses/MachineryExpensesReport" element={<MachineryExpensesReport />} />
         <Route path="/Expenses/SiteFeesExpenses" element={<SiteFeesExpenses />} /> 
         <Route path="/Expenses/SiteFeesReport" element={<SiteFeesReport />} />
          <Route path="/Expenses/FdSdExpenses" element={<FdSdExpenses />} />   
          <Route path="/Expenses/FdSdExpReport" element={<FdSdExpReport />} />
          <Route path="/Expenses/LandPurchase" element={<LandPurchase />} /> 
          <Route path="/Expenses/LandPurchaseList" element={<LandPurchaseList />} /> 
        


        <Route path="/projects/create" element={<Project />} />
        <Route path="/projects/edit/:id" element={<Project />} /> // ✅ reuse same Project component
        <Route path="/purchase/item-master" element={<ItemMasterPage />} />
        <Route path="/purchase/purchase-order" element={<PurchaseOrderPage />} />
        <Route path="/purchase/po-list" element={<PoList />} />
        <Route path="/purchase/company-payment" element={<CompanyPaymentPage />} />
        <Route path="/purchase/payment-history" element={<PaymentHistoryPage />} />
        <Route path="/purchase/purchase-bill" element={<PurchaseBillPage />} />
        <Route path="/purchase/purchase-bill-history" element={<PurchaseBillHistoryPage />} />
        <Route path="/purchase/in-stock" element={<InStockPage />} />
        <Route path="/purchase/in-stock-report" element={<InStockReportPage />} />
        <Route path="/purchase/out-stock" element={<OutStockPage />} />
        <Route path="/purchase/out-stock-report" element={<OutStockReportPage />} />
        <Route path="/purchase/stock-report" element={<StockReportPage />} />
        <Route path="/projects/:projectId/plots" element={<ProjectPlots />} />
        


      </Routes>
    </BrowserRouter>
  );
}