import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  LayoutDashboard,
  Users,
  List,
  PlusSquare,
  FolderKanban,
  ChevronDown,
  ChevronUp,
  Circle,
  Building,
  ShoppingCart, // Import the ShoppingCart icon from lucide-react
} from 'lucide-react';

export default function Sidebar() {
  const [isProjectsOpen, setIsProjectsOpen] = useState(false);
  const [isMembersOpen, setIsMembersOpen] = useState(false);
  const [isPurchaseOpen, setIsPurchaseOpen] = useState(false);
  const [isExpensesOpen, setIsExpensesOpen] = useState(false);
  const [isManagementOpen, setIsManagementOpen] = useState(false);
  const [isLabourOpen, setIsLabourOpen] = useState(false);
  const [isHrPayrollOpen, setIsHrPayrollOpen] = useState(false);
  const [isHrOpen, setIsHrOpen] = useState(false);
  const [isLeaveManagementOpen, setIsLeaveManagementOpen] = useState(false);
  const [isSalaryOpen, setIsSalaryOpen] = useState(false);
   const [isLeadOpen, setIsLeadOpen] = useState(false);
      const [isNotificationOpen, setIsNotificationOpen] = useState(false);
      const [isDemoOpen, setIsDemoOpen] = useState(false);


  return (
    <aside className="w-64 bg-gray-900 text-white p-4 flex flex-col">
      <nav className="flex-1 overflow-y-auto">
        <ul>
          <li>
            <Link to="/" className="flex items-center gap-2 py-2 px-4 rounded hover:bg-gray-700">
              <LayoutDashboard size={18} /> Dashboard
            </Link>
          </li>
          <li>
            <Link to="/CompanyDetails" className="flex items-center gap-2 py-2 px-4 rounded hover:bg-gray-700">
              <Building size={18} /> Company Details
            </Link>
          </li>
          {/* Projects with submenu */}
          <li>
            <button
              onClick={() => setIsProjectsOpen(!isProjectsOpen)}
              className="flex items-center w-full gap-2 py-2 px-4 rounded hover:bg-gray-700 focus:outline-none"
            >
              <FolderKanban size={18} /> Projects
              {isProjectsOpen ? <ChevronUp size={16} className="ml-auto" /> : <ChevronDown size={16} className="ml-auto" />}
            </button>
            {isProjectsOpen && (
              <ul className="ml-6 mt-1 space-y-1">
                <li>
                  <Link to="/projects/group" className="flex items-center gap-2 py-1 px-4 rounded hover:bg-gray-700">
                    <Circle size={10} /> Group
                  </Link>
                </li>
                <li>
                  <Link to="/projects/group-list" className="flex items-center gap-2 py-1 px-4 rounded hover:bg-gray-700">
                    <Circle size={10} /> Group List
                  </Link>
                </li>
                <li>
                  <Link to="/projects/project" className="flex items-center gap-2 py-1 px-4 rounded hover:bg-gray-700">
                    <Circle size={10} /> Project
                  </Link>
                </li>
                <li>
                  <Link to="/projects/project-list" className="flex items-center gap-2 py-1 px-4 rounded hover:bg-gray-700">
                    <Circle size={10} /> Project List
                  </Link>
                </li>
                <li>
                  <Link to="/projects/plots" className="flex items-center gap-2 py-1 px-4 rounded hover:bg-gray-700">
                    <Circle size={10} /> Plots
                  </Link>
                </li>
                <li>
                  <Link to="/projects/booking" className="flex items-center gap-2 py-1 px-4 rounded hover:bg-gray-700">
                    <Circle size={10} /> Booking
                  </Link>
                </li>
                <li>
                  <Link to="/projects/booking-history" className="flex items-center gap-2 py-1 px-4 rounded hover:bg-gray-700">
                    <Circle size={10} /> Booking History
                  </Link>
                </li>
                <li>
                  <Link to="/projects/payment-recieved" className="flex items-center gap-2 py-1 px-4 rounded hover:bg-gray-700">
                    <Circle size={10} /> Payment Received
                  </Link>
                </li>
                <li>
                  <Link to="/projects/payment-history" className="flex items-center gap-2 py-1 px-4 rounded hover:bg-gray-700">
                    <Circle size={10} /> Payment History
                  </Link>
                </li>
              </ul>
            )}
          </li>
          {/* Members with submenu */}
          <li>
            <button
              onClick={() => setIsMembersOpen(!isMembersOpen)}
              className="flex items-center w-full gap-2 py-2 px-4 rounded hover:bg-gray-700 focus:outline-none"
            >
              <Users size={18} /> Members
              {isMembersOpen ? <ChevronUp size={16} className="ml-auto" /> : <ChevronDown size={16} className="ml-auto" />}
            </button>
            {isMembersOpen && (
              <ul className="ml-6 mt-1 space-y-1">
                <li>
                  <Link to="/members/addMembers" className="flex items-center gap-2 py-1 px-4 rounded hover:bg-gray-700">
                    <Circle size={10} /> Add Vendor/Contractor
                  </Link>
                </li>
                <li>
                  <Link to="/members/MemberList" className="flex items-center gap-2 py-1 px-4 rounded hover:bg-gray-700">
                    <Circle size={10} /> Vendor/Contractor List
                  </Link>
                </li>
                <li>
                  <Link to="/members/AddCustomer" className="flex items-center gap-2 py-1 px-4 rounded hover:bg-gray-700">
                    <Circle size={10} /> Add Customer
                  </Link>
                </li>
                <li>
                  <Link to="/members/CustomerList" className="flex items-center gap-2 py-1 px-4 rounded hover:bg-gray-700">
                    <Circle size={10} /> Customer List
                  </Link>
                </li>
                <li>
                  <Link to="/members/AddAgent" className="flex items-center gap-2 py-1 px-4 rounded hover:bg-gray-700">
                    <Circle size={10} /> Add Agent
                  </Link>
                </li>
                <li>
                  <Link to="/members/AgentList" className="flex items-center gap-2 py-1 px-4 rounded hover:bg-gray-700">
                    <Circle size={10} />  Agent List
                  </Link>
                </li>
                {/* <li>
                  <Link to="/admin/members/add" className="flex items-center gap-2 py-1 px-4 rounded hover:bg-gray-700">
                    <Circle size={10} /> Add New
                  </Link>
                </li> */}
              </ul>
            )}
          </li>
          <li>
            <Link to="/listings" className="flex items-center gap-2 py-2 px-4 rounded hover:bg-gray-700">
              <List size={18} /> Listings
            </Link>
          </li>
          <li>
            <Link to="/create-listing" className="flex items-center gap-2 py-2 px-4 rounded hover:bg-gray-700">
              <PlusSquare size={18} /> Create Listing
            </Link>
          </li>


          <li>
            <button
              onClick={() => setIsPurchaseOpen(!isPurchaseOpen)}
              className="flex items-center w-full gap-2 py-2 px-4 rounded hover:bg-gray-700 focus:outline-none"
            >
              <ShoppingCart size={18} /> Purchase/Bill/Stock
              {isPurchaseOpen ? <ChevronUp size={16} className="ml-auto" /> : <ChevronDown size={16} className="ml-auto" />}
            </button>
            {isPurchaseOpen && (
              <ul className="ml-6 mt-1 space-y-1">
                <li>
                  <Link to="/purchase/item-master" className="flex items-center gap-2 py-1 px-4 rounded hover:bg-gray-700">
                    <Circle size={10} /> Item Master
                  </Link>
                </li>
                <li>
                  <Link to="/purchase/purchase-order" className="flex items-center gap-2 py-1 px-4 rounded hover:bg-gray-700">
                    <Circle size={10} /> Purchase Order
                  </Link>
                </li>
                <li>
                  <Link to="/purchase/po-list" className="flex items-center gap-2 py-1 px-4 rounded hover:bg-gray-700">
                    <Circle size={10} /> PO List
                  </Link>
                </li>
                <li>
                  <Link to="/purchase/company-payment" className="flex items-center gap-2 py-1 px-4 rounded hover:bg-gray-700">
                    <Circle size={10} /> Company Payment
                  </Link>
                </li>
                <li>
                  <Link to="/purchase/payment-history" className="flex items-center gap-2 py-1 px-4 rounded hover:bg-gray-700">
                    <Circle size={10} /> Payment History
                  </Link>
                </li>
                <li>
                  <Link to="/purchase/purchase-bill" className="flex items-center gap-2 py-1 px-4 rounded hover:bg-gray-700">
                    <Circle size={10} /> Purchase Bill
                  </Link>
                </li>
                <li>
                  <Link to="/purchase/purchase-bill-history" className="flex items-center gap-2 py-1 px-4 rounded hover:bg-gray-700">
                    <Circle size={10} /> Purchase Bill History
                  </Link>
                </li>
                <li>
                  <Link to="/purchase/in-stock" className="flex items-center gap-2 py-1 px-4 rounded hover:bg-gray-700">
                    <Circle size={10} /> In Stock
                  </Link>
                </li>
                <li>
                  <Link to="/purchase/in-stock-report" className="flex items-center gap-2 py-1 px-4 rounded hover:bg-gray-700">
                    <Circle size={10} /> In Stock Report
                  </Link>
                </li>
                <li>
                  <Link to="/purchase/out-stock" className="flex items-center gap-2 py-1 px-4 rounded hover:bg-gray-700">
                    <Circle size={10} /> Out Stock
                  </Link>
                </li>
                <li>
                  <Link to="/purchase/out-stock-report" className="flex items-center gap-2 py-1 px-4 rounded hover:bg-gray-700">
                    <Circle size={10} /> Out Stock Report
                  </Link>
                </li>
                <li>
                  <Link to="/purchase/stock-report" className="flex items-center gap-2 py-1 px-4 rounded hover:bg-gray-700">
                    <Circle size={10} /> Stock Report
                  </Link>
                </li>

              </ul>
            )}

          </li>

          {/* Expenses with submenu */}
          <li>
            <button
              onClick={() => setIsExpensesOpen(!isExpensesOpen)}
              className="flex items-center w-full gap-2 py-2 px-4 rounded hover:bg-gray-700 focus:outline-none"
            >
              <Users size={18} /> Expenses
              {isExpensesOpen ? <ChevronUp size={16} className="ml-auto" /> : <ChevronDown size={16} className="ml-auto" />}
            </button>
            {isExpensesOpen && (
              <ul className="ml-6 mt-1 space-y-1">
                <li>
                  <Link to="/Expenses/HeadMaster" className="flex items-center gap-2 py-1 px-4 rounded hover:bg-gray-700">
                    <Circle size={10} /> Head Master
                  </Link>
                </li>
                <li>
                  <Link to="/Expenses/officeExpenses" className="flex items-center gap-2 py-1 px-4 rounded hover:bg-gray-700">
                    <Circle size={10} /> Office Expenses
                  </Link>
                </li>
                <li>
                  <Link to="/Expenses/OfficeExpensesReport" className="flex items-center gap-2 py-1 px-4 rounded hover:bg-gray-700">
                    <Circle size={10} /> Office Expenses Report
                  </Link>
                </li>
                <li>
                  <Link to="/Expenses/miscExpenses" className="flex items-center gap-2 py-1 px-4 rounded hover:bg-gray-700">
                    <Circle size={10} /> Misce. Expenses
                  </Link>
                </li>
                <li>
                  <Link to="/Expenses/MiscExpensesReport" className="flex items-center gap-2 py-1 px-4 rounded hover:bg-gray-700">
                    <Circle size={10} />Misce. Expenses Report
                  </Link>
                </li>
                <li>
                  <Link to="/Expenses/MachineryExpenses" className="flex items-center gap-2 py-1 px-4 rounded hover:bg-gray-700">
                    <Circle size={10} />  Machine Expenses
                  </Link>
                </li>
                <li>
                  <Link to="/Expenses/MachineryExpensesReport" className="flex items-center gap-2 py-1 px-4 rounded hover:bg-gray-700">
                    <Circle size={10} />  Machine Expenses Report
                  </Link>
                </li>
                <li>
                  <Link to="/Expenses/SiteFeesExpenses" className="flex items-center gap-2 py-1 px-4 rounded hover:bg-gray-700">
                    <Circle size={10} />  Site Fees/Other Expenses
                  </Link>
                </li>
                <li>
                  <Link to="/Expenses/SiteFeesReport" className="flex items-center gap-2 py-1 px-4 rounded hover:bg-gray-700">
                    <Circle size={10} />  Site Fees/Other Expenses Report
                  </Link>
                </li>
                <li>
                  <Link to="/Expenses/FdSdExpenses" className="flex items-center gap-2 py-1 px-4 rounded hover:bg-gray-700">
                    <Circle size={10} />  FD/SD Expenses
                  </Link>
                </li>
                
                <li>
                  <Link to="/Expenses/FdSdExpReport" className="flex items-center gap-2 py-1 px-4 rounded hover:bg-gray-700">
                    <Circle size={10} />  FD/SD Report
                  </Link>
                </li>
                <li>
                  <Link to="/Expenses/LandPurchase" className="flex items-center gap-2 py-1 px-4 rounded hover:bg-gray-700">
                    <Circle size={10} />  Land Purchase
                  </Link>
                </li>
                <li>
                  <Link to="/Expenses/LandPurchaseList" className="flex items-center gap-2 py-1 px-4 rounded hover:bg-gray-700">
                    <Circle size={10} />  Land Purchase List
                  </Link>
                </li>
                {/* <li>
                  <Link to="/admin/members/add" className="flex items-center gap-2 py-1 px-4 rounded hover:bg-gray-700">
                    <Circle size={10} /> Add New
                  </Link>
                </li> */}
              </ul>
            )}
          </li>

          {/* Management with submenu */}
          <li>
            <button
              onClick={() => setIsManagementOpen(!isManagementOpen)}
              className="flex items-center w-full gap-2 py-2 px-4 rounded hover:bg-gray-700 focus:outline-none"
            >
              <Users size={18} /> Management
              {isManagementOpen ? <ChevronUp size={16} className="ml-auto" /> : <ChevronDown size={16} className="ml-auto" />}
            </button>
            {isManagementOpen && (
              <ul className="ml-6 mt-1 space-y-1">
                <li>
                  <Link to="/BankMaster" className="flex items-center gap-2 py-1 px-4 rounded hover:bg-gray-700">
                    <Circle size={10} /> Bank Master
                  </Link>
                </li>
                
              </ul>
            )}
          </li>

          {/* Labour with submenu */}
          <li>
            <button
              onClick={() => setIsLabourOpen(!isLabourOpen)}
              className="flex items-center w-full gap-2 py-2 px-4 rounded hover:bg-gray-700 focus:outline-none"
            >
              <Users size={18} /> Labour
              {isLabourOpen ? <ChevronUp size={16} className="ml-auto" /> : <ChevronDown size={16} className="ml-auto" />}
            </button>
            {isLabourOpen && (
              <ul className="ml-6 mt-1 space-y-1">
                <li>
                  <Link to="/Labour/Addsite" className="flex items-center gap-2 py-1 px-4 rounded hover:bg-gray-700">
                    <Circle size={10} /> Add Site
                  </Link>
                </li>
                <li>
                  <Link to="/Labour/LbDesignation" className="flex items-center gap-2 py-1 px-4 rounded hover:bg-gray-700">
                    <Circle size={10} /> Designation
                  </Link>
                </li>
                <li>
                  <Link to="/Labour/AddLabour" className="flex items-center gap-2 py-1 px-4 rounded hover:bg-gray-700">
                    <Circle size={10} /> Labour
                  </Link>
                </li>
                <li>
                  <Link to="/Labour/LabourList" className="flex items-center gap-2 py-1 px-4 rounded hover:bg-gray-700">
                    <Circle size={10} /> Labour List
                  </Link>
                </li>
                <li>
                  <Link to="/Labour/WorkStatus" className="flex items-center gap-2 py-1 px-4 rounded hover:bg-gray-700">
                    <Circle size={10} />Work Status
                  </Link>
                </li>
                <li>
                  <Link to="/Labour/AdvancePayment" className="flex items-center gap-2 py-1 px-4 rounded hover:bg-gray-700">
                    <Circle size={10} />  Labour Payment
                  </Link>
                </li>
                <li>
                  <Link to="/Labour/AdvanceReport" className="flex items-center gap-2 py-1 px-4 rounded hover:bg-gray-700">
                    <Circle size={10} />  Payment Report
                  </Link>
                </li>
                <li>
                  <Link to="/Labour/SiteAttendance" className="flex items-center gap-2 py-1 px-4 rounded hover:bg-gray-700">
                    <Circle size={10} />  Site Attendance
                  </Link>
                </li>
                <li>
                  <Link to="/Labour/AttendanceByMonth" className="flex items-center gap-2 py-1 px-4 rounded hover:bg-gray-700">
                    <Circle size={10} />  Attendance By Month
                  </Link>
                </li>
                <li>
                  <Link to="/Labour/AttendanceByDay" className="flex items-center gap-2 py-1 px-4 rounded hover:bg-gray-700">
                    <Circle size={10} />  Attendance By Day
                  </Link>
                </li>
                
                <li>
                  <Link to="/Labour/WorkTypeList" className="flex items-center gap-2 py-1 px-4 rounded hover:bg-gray-700">
                    <Circle size={10} />  Work Type
                  </Link>
                </li>
                <li>
                  <Link to="/Labour/WorkAllotment" className="flex items-center gap-2 py-1 px-4 rounded hover:bg-gray-700">
                    <Circle size={10} />  Work Allotment
                  </Link>
                </li>
                <li>
                  <Link to="/Labour/WorkAllotmentHistory" className="flex items-center gap-2 py-1 px-4 rounded hover:bg-gray-700">
                    <Circle size={10} />  Work Allotment History
                  </Link>
                </li>
                {/* <li>
                  <Link to="/admin/members/add" className="flex items-center gap-2 py-1 px-4 rounded hover:bg-gray-700">
                    <Circle size={10} /> Add New
                  </Link>
                </li> */}
              </ul>
            )}
          </li>

          {/* HR/Payroll with submenu */}
          <li>
            <button
              onClick={() => setIsHrPayrollOpen(!isHrPayrollOpen)}
              className="flex items-center w-full gap-2 py-2 px-4 rounded hover:bg-gray-700 focus:outline-none"
            >
              <Users size={18} /> HR/Payroll
              {isHrPayrollOpen ? <ChevronUp size={16} className="ml-auto" /> : <ChevronDown size={16} className="ml-auto" />}
            </button>
            {isHrPayrollOpen && (
              <ul className="ml-6 mt-1 space-y-1">
                <li>
                  <button
                    onClick={() => setIsHrOpen(!isHrOpen)}
                    className="flex items-center w-full gap-2 py-1 px-4 rounded hover:bg-gray-700 focus:outline-none"
                  >
                    <Circle size={10} /> HR
                    {isHrOpen ? <ChevronUp size={16} className="ml-auto" /> : <ChevronDown size={16} className="ml-auto" />}
                  </button>
                  {isHrOpen && (
                    <ul className="ml-6 mt-1 space-y-1">
                      <li>
                        <Link to="/hr/department" className="flex items-center gap-2 py-1 px-4 rounded hover:bg-gray-700">
                          <Circle size={10} /> Department
                        </Link>
                      </li>
                      <li>
                        <Link to="/hr/designation" className="flex items-center gap-2 py-1 px-4 rounded hover:bg-gray-700">
                          <Circle size={10} /> Designation
                        </Link>
                      </li>
                      <li>
                        <Link to="/hr/bank-list" className="flex items-center gap-2 py-1 px-4 rounded hover:bg-gray-700">
                          <Circle size={10} /> Bank List
                        </Link>
                      </li>
                      <li>
                        <Link to="/hr/employee" className="flex items-center gap-2 py-1 px-4 rounded hover:bg-gray-700">
                          <Circle size={10} /> Employee
                        </Link>
                      </li>
                      <li>
                        <Link to="/hr/employee-list" className="flex items-center gap-2 py-1 px-4 rounded hover:bg-gray-700">
                          <Circle size={10} /> Employee List
                        </Link>
                      </li>
                      <li>
                        <Link to="/hr/employee-attendance" className="flex items-center gap-2 py-1 px-4 rounded hover:bg-gray-700">
                          <Circle size={10} /> Employee Attendance
                        </Link>
                      </li>
                      <li>
                        <Link to="/hr/attendance-by-month" className="flex items-center gap-2 py-1 px-4 rounded hover:bg-gray-700">
                          <Circle size={10} /> Attendance By Month
                        </Link>
                      </li>
                      <li>
                        <Link to="/hr/attendance-summary" className="flex items-center gap-2 py-1 px-4 rounded hover:bg-gray-700">
                          <Circle size={10} /> Attendance Summary
                        </Link>
                      </li>
                      <li>
                        <Link to="/hr/document-format" className="flex items-center gap-2 py-1 px-4 rounded hover:bg-gray-700">
                          <Circle size={10} /> Document Format
                        </Link>
                      </li>
                      <li>
                        <Link to="/hr/document-format-list" className="flex items-center gap-2 py-1 px-4 rounded hover:bg-gray-700">
                          <Circle size={10} /> Document Format List
                        </Link>
                      </li>
                    </ul>
                  )}
                </li>
                <li>
                  <button
                    onClick={() => setIsLeaveManagementOpen(!isLeaveManagementOpen)}
                    className="flex items-center w-full gap-2 py-1 px-4 rounded hover:bg-gray-700 focus:outline-none"
                  >
                    <Circle size={10} /> Leave Management
                    {isLeaveManagementOpen ? <ChevronUp size={16} className="ml-auto" /> : <ChevronDown size={16} className="ml-auto" />}
                  </button>
                  {isLeaveManagementOpen && (
                    <ul className="ml-6 mt-1 space-y-1">
                      <li>
                        <Link to="/leave/category" className="flex items-center gap-2 py-1 px-4 rounded hover:bg-gray-700">
                          <Circle size={10} /> Leave Category
                        </Link>
                      </li>
                      <li>
                        <Link to="/leave/detail" className="flex items-center gap-2 py-1 px-4 rounded hover:bg-gray-700">
                          <Circle size={10} /> Leave Detail
                        </Link>
                      </li>
                      <li>
                        <Link to="/leave/application" className="flex items-center gap-2 py-1 px-4 rounded hover:bg-gray-700">
                          <Circle size={10} /> Leave Application
                        </Link>
                      </li>
                      <li>
                        <Link to="/leave/status" className="flex items-center gap-2 py-1 px-4 rounded hover:bg-gray-700">
                          <Circle size={10} /> Leave Status
                        </Link>
                      </li>
                    </ul>
                  )}
                </li>
                <li>
                  <button
                    onClick={() => setIsSalaryOpen(!isSalaryOpen)}
                    className="flex items-center w-full gap-2 py-1 px-4 rounded hover:bg-gray-700 focus:outline-none"
                  >
                    <Circle size={10} /> Salary
                    {isSalaryOpen ? <ChevronUp size={16} className="ml-auto" /> : <ChevronDown size={16} className="ml-auto" />}
                  </button>
                  {isSalaryOpen && (
                    <ul className="ml-6 mt-1 space-y-1">
                      <li>
                        <Link to="/hr/salary/pay-salary" className="flex items-center gap-2 py-1 px-4 rounded hover:bg-gray-700">
                          <Circle size={10} /> Pay Salary
                        </Link>
                      </li>
                      <li>
                        <Link to="/hr/salary/salary-report" className="flex items-center gap-2 py-1 px-4 rounded hover:bg-gray-700">
                          <Circle size={10} /> Salary Report
                        </Link>
                      </li>
                      <li>
                        <Link to="/hr/salary/advance-payment" className="flex items-center gap-2 py-1 px-4 rounded hover:bg-gray-700">
                          <Circle size={10} /> Advance Payment
                        </Link>
                      </li>
                      <li>
                        <Link to="/hr/salary/advance-report" className="flex items-center gap-2 py-1 px-4 rounded hover:bg-gray-700">
                          <Circle size={10} /> Advance Report
                        </Link>
                      </li>
                      <li>
                        <Link to="/hr/salary/advance-recieved" className="flex items-center gap-2 py-1 px-4 rounded hover:bg-gray-700">
                          <Circle size={10} /> Advance Recieved
                        </Link>
                      </li>
                      <li>
                        <Link to="/hr/salary/recieved-report" className="flex items-center gap-2 py-1 px-4 rounded hover:bg-gray-700">
                          <Circle size={10} /> Recieved Report
                        </Link>
                      </li>
                      <li>
                        <Link to="/hr/salary/advance-status" className="flex items-center gap-2 py-1 px-4 rounded hover:bg-gray-700">
                          <Circle size={10} /> Advance Status
                        </Link>
                      </li>
                      <li>
                        <Link to="/hr/salary/advance-summary" className="flex items-center gap-2 py-1 px-4 rounded hover:bg-gray-700">
                          <Circle size={10} /> Advance Summary
                        </Link>
                      </li>
                    </ul>
                  )}
                </li>
              </ul>
            )}
          </li>

          {/* Lead with submenu */}
          <li>
            <button
              onClick={() => setIsLeadOpen(!isLeadOpen)}
              className="flex items-center w-full gap-2 py-2 px-4 rounded hover:bg-gray-700 focus:outline-none"
            >
              <Users size={18} /> Lead
              {isLeadOpen ? <ChevronUp size={16} className="ml-auto" /> : <ChevronDown size={16} className="ml-auto" />}
            </button>
            {isLeadOpen && (
              <ul className="ml-6 mt-1 space-y-1">
                <li>
                  <Link to="/Lead/LeadCreation" className="flex items-center gap-2 py-1 px-4 rounded hover:bg-gray-700">
                    <Circle size={10} />Create Lead
                  </Link>
                </li>
                <li>
                  <Link to="/Lead/LeadReport" className="flex items-center gap-2 py-1 px-4 rounded hover:bg-gray-700">
                    <Circle size={10} /> Lead Report
                  </Link>
                </li>
               
              
             
               
              </ul>
            )}
          </li>

           {/* Notification with submenu */}
          <li>
            <button
              onClick={() => setIsNotificationOpen(!isNotificationOpen)}
              className="flex items-center w-full gap-2 py-2 px-4 rounded hover:bg-gray-700 focus:outline-none"
            >
              <Users size={18} /> Notification
              {isNotificationOpen ? <ChevronUp size={16} className="ml-auto" /> : <ChevronDown size={16} className="ml-auto" />}
            </button>
            {isNotificationOpen && (
              <ul className="ml-6 mt-1 space-y-1">
                <li>
                  <Link to="/Notification/SendMessage" className="flex items-center gap-2 py-1 px-4 rounded hover:bg-gray-700">
                    <Circle size={10} />Send Message
                  </Link>
                </li>
                <li>
                  <Link to="/Notification/sendMessageReport" className="flex items-center gap-2 py-1 px-4 rounded hover:bg-gray-700">
                    <Circle size={10} /> Send Report
                  </Link>
                </li>
               
              
             
               
              </ul>
            )}
          </li>

           {/* Demo Pages with submenu */}
          <li>
            <button
              onClick={() => setIsDemoOpen(!isDemoOpen)}
              className="flex items-center w-full gap-2 py-2 px-4 rounded hover:bg-gray-700 focus:outline-none"
            >
              <Users size={18} /> Demo Pages
              {isDemoOpen ? <ChevronUp size={16} className="ml-auto" /> : <ChevronDown size={16} className="ml-auto" />}
            </button>
            {isDemoOpen && (
              <ul className="ml-6 mt-1 space-y-1">
                <li>
                  <Link to="/Demo/AddEdit" className="flex items-center gap-2 py-1 px-4 rounded hover:bg-gray-700">
                    <Circle size={10} />Send Message
                  </Link>
                </li>
                <li>
                  <Link to="/Demo/FullPage" className="flex items-center gap-2 py-1 px-4 rounded hover:bg-gray-700">
                    <Circle size={10} /> Send Report
                  </Link>
                </li>
                <li>
                  <Link to="/Demo/Report" className="flex items-center gap-2 py-1 px-4 rounded hover:bg-gray-700">
                    <Circle size={10} /> Report
                  </Link>
                </li>
               
              
             
               
              </ul>
            )}
          </li>
          <li>
            
              <Link to="/AdminLogin" className="flex items-center gap-2 py-1 px-4 rounded hover:bg-gray-700">
                    <Circle size={10} />Log Out
              </Link>
          </li>
        
        </ul>
      </nav>
    </aside>
  );
}
