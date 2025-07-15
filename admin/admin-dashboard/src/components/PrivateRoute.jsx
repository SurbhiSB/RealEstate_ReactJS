import { useSelector } from 'react-redux';
import { Outlet, Navigate } from 'react-router-dom';

export default function PrivateRoute() {
  const { currentAdmin } = useSelector((state) => state.user);
  return currentAdmin && currentAdmin.isAdmin ? <Outlet /> : <Navigate to='/login' />;
}
