import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import morgan from 'morgan';
import userRouter from './routes/user.route.js';
import authRouter from './routes/auth.route.js';
import cookieParser from 'cookie-parser';
import listingRouter from './routes/listing.route.js';
import adminRouter from './routes/admin.route.js';
import groupRouter from './routes/group.route.js';
import addMembersRouter from './routes/addMembers.route.js';
import addCustomersRouter from './routes/addCustomers.route.js';
import addAgentRouter from './routes/addagent.route.js';
import projectRoutes from "./routes/project.route.js";
import groupRoutes from "./routes/group.route.js";

import bookingRoutes from "./routes/booking.route.js";
import plotRoutes from "./routes/plot.route.js";
import associateRoutes from "./routes/associate.route.js";


import stateRoutes from "./routes/stateRoutes.js";

import paymentRoute from "./routes/payment.route.js";

import CompanyDetailsRouter from './routes/CompanyDetails.route.js';
import HeadMastersRouter from './routes/HeadMaster.route.js';
import officeExpensesRouter from './routes/officeExpenses.route.js';
import miscExpensesRouter from './routes/miscExpenses.route.js'; 
import MachineryExpensesRouter from './routes/MachineryExpenses.route.js'; 
import SiteFeesExpensesRouter from './routes/SiteFeesExpenses.route.js'; 



dotenv.config();
mongoose.connect(process.env.MONGO).then(() => {
    console.log('Connected to MongoDB');
}).catch((error) => {
    console.log(error);
})

const app = express();


// Use morgan middleware (in 'dev' format)
app.use(morgan('dev'));

app.use(express.json());
app.use(cookieParser());


app.use(cors({
  origin: ['http://localhost:5173', 'http://localhost:5174'], // ✅ allow your frontend
  credentials: true                // if using cookies or tokens
}));

app.listen(3000, () => {
    console.log('API started on port 3000');
});

app.use('/api/user', userRouter);
app.use('/api/auth', authRouter);
app.use('/api/listing', listingRouter);
app.use('/api/admin', adminRouter);
app.use('/api/group', groupRouter);
app.use('/api/addMembers', addMembersRouter);
app.use('/api/AddCustomer', addCustomersRouter);
app.use('/api/AddAgent', addAgentRouter);
app.use("/api/project", projectRoutes);
app.use("/api/group", groupRoutes);
app.use("/api/projects", projectRoutes);

app.use("/api/bookings", bookingRoutes);
app.use("/api/plots", plotRoutes); // ✅ This enables the endpoint!
app.use("/api/associates", associateRoutes); // ✅ Plug in the route


app.use('/api/states', stateRoutes);
app.use("/api/payments", paymentRoute);

app.use('/api/company', CompanyDetailsRouter);
app.use('/api/HeadMasters', HeadMastersRouter);
app.use('/api/officeExpenses', officeExpensesRouter);
app.use('/api/miscExpenses', miscExpensesRouter);
app.use('/api/MachineryExpenses', MachineryExpensesRouter);
app.use('/api/SiteFeesExpenses', SiteFeesExpensesRouter);


app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal server error';
    return res.status(statusCode).json({ 
        success: false,
        statusCode,
        message,
     });
});