
import { useEffect, useState } from 'react';
import StatCard from './StatCard';

export default function TotalUsersStatCard() {
  const [totalUsers, setTotalUsers] = useState(0);

  useEffect(() => {
    const fetchTotalUsers = async () => {
      try {
        const res = await fetch('/api/user/getusers');
        const data = await res.json();
        if (data.success) {
          setTotalUsers(data.totalUsers);
        }
      } catch (error) {
        console.error('Error fetching total users:', error);
      }
    };

    fetchTotalUsers();
  }, []);

  return <StatCard title="Total Users" value={totalUsers} />;
}
